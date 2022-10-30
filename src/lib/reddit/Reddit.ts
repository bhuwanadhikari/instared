import Snoowrap, { Submission } from "snoowrap";
// import { localPost } from "./post.comments";
import { RComment, RedditConfig, RPost } from "./types";
import nodeHtmlToImage from "node-html-to-image";
import { getCommentsHtml } from "../../utils/commentsHtml";
import { redditConfig } from "../../constants";
import { getPostHtml } from "../../utils/postHtml";
import axios from "axios";

export const MAX_REPLIES_LIMIT = 2;
export const MAX_CHARACTER_LENGTH = 620;
export const MAX_LENGTH_OF_POST_TITLE = 300;
export const MAX_LENGTH_OF_POST_SELFTEXT = 350;

//TODO : ERROR HANDLING IS FULLY REMAINING

const unpromise = async <T>(promise: Promise<T>) => {
  const result = await promise;
  return result as Omit<T, "then" | "catch" | "finally">;
};

const treeMaker = (comment: any) => {
  // assign depth to be zero for every comment
  let depth = 0;
  // recursion on every comment's reply
  return makeTree(comment, depth);
};

//makes trimmed tree
const makeTree: any = (bush: any, depth: number) => {
  //take only required fields
  const obj: any = {
    author: bush.author.name,
    thumbnail: redditConfig.redditLogoUrl,
    body: bush.body,
    ups: bush.ups,
    num_replies: bush.replies.length,
    depth: bush.depth,
    score: bush.score,
    postId: bush.parent_id, //used for just folder
    downs: bush.downs,
    replies: [],
  };

  if (bush.depth >= 1) return obj;

  // sort children of a parent by upvotes
  const sortedReplies = bush.replies.sort((a: any, b: any) => b.ups - a.ups);

  // loop to trim
  for (let [index, reply] of sortedReplies.entries()) {
    const rrs: any = makeTree(reply, depth);
    obj.replies.push(rrs);
    if (index >= MAX_REPLIES_LIMIT - 1) break;
  }
  return obj;
};

class Reddit {
  readonly redditClient;

  constructor({ redditClientConfig }: RedditConfig) {
    this.redditClient = new Snoowrap({
      userAgent: redditClientConfig.userAgent,
      username: redditClientConfig.username,
      clientId: redditClientConfig.clientId,
      clientSecret: redditClientConfig.clientSecret,
      password: redditClientConfig.password,
    });
    this.redditClient.config({ requestDelay: 1000, debug: true });
  }

  private async getUserImage(username: string) {
    try {
      const response = await axios({
        method: "get",
        url: `https://www.reddit.com/user/${username}/about.json`,
      });
      return response.data.data.icon_img?.split("?")[0];
    } catch (e) {
      // console.log(e);
    }
  }

  async getCuratedPosts({ subreddit }: { subreddit: string }) {
    try {
      //get top posts
      console.log("getting top posts");
      const topPosts = await this.redditClient
        .getSubreddit(subreddit)
        .getTop({ time: "day", limit: 200, count: 200 });
      console.log(`got ${topPosts.length} top posts from ${subreddit}`);

      const filteredTopPosts: any = topPosts.reduce((prev: any[], post) => {
        const hasEnoughComments = post.num_comments >= 5;
        const isImageFree = !Boolean(post.preview?.images);
        const isVideoFree = !post.is_video;

        //filter by char length
        let acceptableByCharLength = false;
        let titleAndSelftextShowable = true;
        const titleLength = post.title.length;
        const selftextLength = post.selftext.length;
        const totalLength = titleLength + selftextLength;

        /**
         * accepted both if total length is less than max
         * accepted only selfttext if total exceeds max but selftext doesnt
         */
        if (totalLength <= MAX_CHARACTER_LENGTH) {
          acceptableByCharLength = true;
          titleAndSelftextShowable = true;
        } else if (
          selftextLength <= MAX_CHARACTER_LENGTH &&
          totalLength > MAX_CHARACTER_LENGTH
        ) {
          acceptableByCharLength = true;
          titleAndSelftextShowable = false;
        }

        if (
          hasEnoughComments &&
          isImageFree &&
          isVideoFree &&
          acceptableByCharLength
        ) {
          return [
            ...prev,
            {
              id: post.id,
              author: post.author.name,
              selftext: post.selftext,
              title: post.title,
              ups: post.ups,
              numComments: post.num_comments,
              titleAndSelftextShowable,
            },
          ];
        } else {
          return prev;
        }
      }, []);

      return filteredTopPosts.sort(
        (a: any, b: any) => b.numComments - a.numComments
      );
    } catch (e) {
      throw e;
    }
  }

  async makeCarouselData({ postId }: { postId: string }): Promise<RPost> {
    try {
      console.log("getting comments of curated post, can take some time");
      const post = await unpromise<Submission>(
        this.redditClient
          .getSubmission(postId)
          .expandReplies({ limit: Infinity, depth: 2 })
      );
      // const post = localPost;

      // remove configs and etc from the response
      //@ts-ignore
      post._r = undefined;

      //sort the comments by upvotes
      // post.comments.sort((a: any, b: any) => b.ups - a.ups);
      console.log("filtering of comments started");
      const trimmedTree = [];
      /**
       * trim the whole tree only with required fields and
       * dont take any except parent, child1 and child2
       */
      for (let c of post.comments) {
        trimmedTree.push(treeMaker(c));
      }

      //remove if any deleted or large text sizes
      const filteredByDeleted = trimmedTree.filter((a) => {
        if (
          a.body === "[deleted]" ||
          a[0]?.body === "[deleted]" ||
          a[1]?.body === "[deleted]"
        ) {
          return false;
        }
        return true;
      });

      // remove if comment has gifs or links
      const filteredByGifs = trimmedTree.filter((a) => {
        if (a.body.includes("![gif]") || a.body.includes("https://www.")) {
          return false;
        }
        return true;
      });

      // final sorting based on the total points of self and child
      filteredByGifs.sort((a, b) => {
        const sumRightPoints =
          b.ups +
          Number(b.replies?.length) +
          Number(b[0]?.ups) +
          Number(b[1]?.ups);
        const sumLeftPoints =
          a.ups +
          Number(a.replies?.length) +
          Number(a[0]?.ups) +
          Number(a[1]?.ups);

        return sumRightPoints - sumLeftPoints;
      });

      // remake data based on length of characters of replies
      const dataBasedOnCharLength = filteredByGifs.reduce((prev, curr) => {
        // make array of length of characters in the body [parent, child1, child2]
        const lengthArr = [
          Number(curr.body?.length || 0),
          Number(curr.replies[0]?.body?.length || 0),
          Number(curr.replies[1]?.body?.length || 0),
        ];

        // calculate sum length each combined
        const axy = lengthArr[0] + lengthArr[1] + lengthArr[2]; // of all three
        const ax = lengthArr[0] + lengthArr[1]; // of parent and child 1
        const ay = lengthArr[0] + lengthArr[1] + lengthArr[2]; // of parent and child 2
        const a = lengthArr[0]; // of just parent

        // total length is less than max character limit
        if (axy < MAX_CHARACTER_LENGTH) {
          return [...prev, curr];
        } else {
          // if total length exceeds, choose only of children
          // take first child if sum length of parent and child1 is less than max
          if (ax < MAX_CHARACTER_LENGTH) {
            return [...prev, { ...curr, replies: curr.replies.slice(0, 1) }];
          }
          // take second child sum length of parent and child2 is less than max
          if (ay < MAX_CHARACTER_LENGTH) {
            return [...prev, { ...curr, replies: curr.replies.slice(1, 1) }];
          }
          // take only parent if parent alone's length is less than max length
          if (a < MAX_CHARACTER_LENGTH) {
            return [...prev, { ...curr, replies: undefined }];
          }
        }
        /**
         * rejected in given condition
         * - if parent's length exceeds max limit
         * - if parent's + (child1's or child2's ) exceeds max limit
         */
        return prev;
      }, []);

      // TODO: DON'T POST IF THE NUMBER OF COMMENTS IS LESS THAN 5

      const usablePost = {
        thumbnail: redditConfig.redditLogoUrl,
        id: post.id,
        author: post.author.name,
        title: post.title,
        selftext: post.selftext,
        subreddit: post.subreddit?.display_name,
        ups: post.ups,
        name: post.name,
        downs: post.downs,
        numComments: post.num_comments,
      };

      console.log("filtering of comments finished");

      console.log("getting thumbnail of users");
      const usableComments = dataBasedOnCharLength.slice(0, 9);

      for (let [index, comment] of usableComments.entries()) {
        const userImage = await this.getUserImage(comment.author);
        usableComments[index].thumbnail = userImage
          ? userImage
          : comment.thumbnail;
      }
      console.log("finished getting user thumbnails")
      // we only need 10 carousel items, 1 the original post and 9 comments
      return {
        ...usablePost,
        comments: usableComments,
      };
    } catch (e) {
      throw e;
    }
  }

  private async generatePostImage(post: RPost): Promise<{ imagePath: string }> {
    try {
      const imagePath = `./images/${post.name}__carousel_0.png`;

      await nodeHtmlToImage({
        output: imagePath,
        html: getPostHtml(post),
      });
      console.log(`generated post image for ${post.name}`);
      return { imagePath };
    } catch (e) {
      throw e;
    }
  }

  // single reusable image generator
  private async generateCommentImage(
    comment: RComment,
    rank: number
  ): Promise<{ imagePath: string }> {
    try {
      const imagePath = `./images/${comment.postId}__carousel_${rank + 1}.png`;
      await nodeHtmlToImage({
        output: imagePath,
        html: getCommentsHtml(comment),
      });
      console.log(`generated comment image for ${rank + 1}`);
      return {
        imagePath,
      };
    } catch (e) {
      throw e;
    }
  }

  // 9 images of comments
  private async generateCommentsCarouselImages(comments: RComment[]) {
    try {
      const commentsImages = [];
      for (let [i, comment] of comments.entries()) {
        commentsImages.push(await this.generateCommentImage(comment, i));
      }

      return commentsImages;
    } catch (e) {
      throw e;
    }
  }

  // all the images
  async generateCarouselImages({ postId }: { postId: string }) {
    try {
      const post = await this.makeCarouselData({ postId });
      const postImage = await this.generatePostImage(post);
      const otherImages = await this.generateCommentsCarouselImages(
        post.comments
      );
      return [postImage, ...otherImages];
    } catch (e) {
      throw e;
    }
  }
}

export default Reddit;
