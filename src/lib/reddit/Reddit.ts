import Snoowrap, { Submission } from "snoowrap";
import { localPost } from "./post.comments";
import { RComment, RedditConfig } from "./types";
import nodeHtmlToImage from "node-html-to-image";
import { getCommentsHtml } from "../../utils/commentsHtml";

const MAX_LIMIT = 2;
const MAX_CHARACTER_LENGTH = 540;

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
    author: bush.author,
    thumbnail:
      "https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png",
    body: bush.body,
    ups: bush.ups,
    num_replies: bush.replies.length,
    depth: bush.depth,
    score: bush.score,
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
    if (index >= MAX_LIMIT - 1) break;
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
    this.redditClient.config({ requestDelay: 1000 });
  }

  async getCuratedPost({ subreddit }: { subreddit: string }) {
    //get top posts
    const topPosts = await this.redditClient.getSubreddit(subreddit).getTop();

    //get comments
    // const comments = await  Promise.all(topPosts.map((post)=> ))

    return topPosts.sort((a, b) => b.num_comments - a.num_comments);
  }

  async makeCarouselData({ postId }: { postId: string }) {
    // const post = await unpromise<Submission>(
    //   this.redditClient
    //     .getSubmission("xm0qsb")
    //     .expandReplies({ limit: Infinity, depth: 2 })
    // );

    //sort the comments by upvotes
    // localPost.comments.sort((a: any, b: any) => b.ups - a.ups);

    const trimmedTree = [];
    /**
     * trim the whole tree only with required fields and
     * dont take any except parent, child1 and child2
     */
    for (let c of localPost.comments) {
      trimmedTree.push(treeMaker(c));
    }

    //remove if any deleted or large text sizes
    const filtered = trimmedTree.filter((a) => {
      if (
        a.body === "[deleted]" ||
        a[0]?.body === "[deleted]" ||
        a[1]?.body === "[deleted]"
      ) {
        return false;
      }
      return true;
    });

    // final sorting based on the total points of self and child
    filtered.sort((a, b) => {
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
    const cleaned = filtered.reduce((prev, curr) => {
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

    // we only need 10 carousel items, 1 the original post and 9 comments
    return cleaned.slice(0, 9);
  }

  async generateCommentImage(comment: RComment, rank: number) {
    await nodeHtmlToImage({
      output: `./images/carousel_${rank}.png`,
      html: getCommentsHtml(comment),
    });
  }

  async generateCommentsCarouselImages(comments: RComment[]) {
    await Promise.all(
      comments.map((comment, i) => this.generateCommentImage(comment, i))
    );

    // for (let [i, comment] of comments.entries()) {
    //   await this.generateCommentImage(comment, i);
    // }
  }
}

export default Reddit;
