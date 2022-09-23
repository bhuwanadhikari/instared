import Snoowrap, { Submission } from "snoowrap";
import { localPost } from "./post.comments";
import { RedditConfig } from "./types";

const maxDepth = 2;
const maxLimit = 2;

const unpromise = async <T>(promise: Promise<T>) => {
  const result = await promise;
  return result as Omit<T, "then" | "catch" | "finally">;
};

const interactionScore = (instance:any)=> {
  if(instance.replies){
    instance.ups + instance.replies[0].ups+instance.replies[1].ups
  }
 return instance.ups
}

const treeMaker = (comment: any) => {
  // assign depth to be zero for every comment
  let depth = 0;
  // recursion on every comment's reply
  return makeTree(comment, depth);
};

const makeTree: any = (bush: any, depth: number) => {
  const obj: any = {
    author: bush.author,
    body: bush.body,
    ups: bush.ups,
    num_replies: bush.replies.length,
    depth: bush.depth,
    score: bush.score,
    downs: bush.downs,
  };

  if (bush.depth >= 1) return obj;

  const sortedReplies = bush.replies.sort(
    (a: any, b: any) => b.score - a.score
  );

  for (let [index, reply] of sortedReplies.entries()) {
    const rrs: any = makeTree(reply, depth);
    obj.replies = [...(obj.replies || []), rrs];
    if (index >= maxLimit - 1) break;
  }
  return obj;
};

const makeTree2: any = (bush: any, depth: number) => {
  const obj: any = {
    body: bush.body,
    ups: bush.ups,
    replies: [],
  };
  const sortedReplies = bush.replies.sort((a: any, b: any) => b.ups - a.ups);
  for (let reply of sortedReplies) {
    const rrs: any = makeTree(reply);
    obj.replies.push(rrs);
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
    //     .getSubmission("xkfie5")
    //     .expandReplies({ limit: Infinity, depth: 2 })
    // );

    const trimmedTree = [];

    //sort the comments by upvotes
    const sorted = localPost.comments.sort((a, b) => b.score - a.score);
    //loop on sorted comments
    for (let c of sorted) {
      // console.log(c);
      trimmedTree.push(treeMaker(c));
    }

    // console.log(trimmedTree);

    trimmedTree.sort((a, b)=> a.)

    return trimmedTree;
    //get comments
    // const comments = await  Promise.all(topPosts.map((post)=> ))
  }

  async generateCarouselImages() {
    //get post with title and body and create image
    //create comments images
  }
}

export default Reddit;
