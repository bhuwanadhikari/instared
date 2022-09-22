import Snoowrap, { Submission } from "snoowrap";
import { RedditConfig } from "./types";

const unpromise = async <T>(promise: Promise<T>) => {
  const result = await promise;
  return result as Omit<T, "then" | "catch" | "finally">;
};

const makeTree: any = (bush: never | any) => {
  const obj: any = {
    body: bush.body,
    ups: bush.ups,
    replies: [],
  };

  for (let reply of bush.replies) {
    if (reply.ups > 20) {
      const rrs: any = makeTree(reply);
      obj.replies.push(rrs);
    }
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
    const post = await unpromise<Submission>(
      this.redditClient
        .getSubmission("xkfie5")
        .expandReplies({ limit: Infinity, depth: 2 })
    );

    const commentsTree = [];
    console.log();
    const tree = [];
    for (let c of post.comments) {
      c.ups > 100 && tree.push(makeTree(c));
    }

    console.log(tree);

    return tree;
    //get comments
    // const comments = await  Promise.all(topPosts.map((post)=> ))
  }

  async generateCarouselImages() {
    //get post with title and body and create image
    //create comments images
  }
}

export default Reddit;
