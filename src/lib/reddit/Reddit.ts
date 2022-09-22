import Snoowrap, { Submission } from "snoowrap";
import { RedditConfig } from "./types";

async function promisify<T>(callback: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    callback.then((a) => resolve(a)).catch((b) => reject(b));
  });
}

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
  }

  async getCuratedPost({ subreddit }: { subreddit: string }) {
    //get top posts
    const topPosts = await this.redditClient.getSubreddit(subreddit).getTop();

    //get comments
    // const comments = await  Promise.all(topPosts.map((post)=> ))

    return topPosts.sort((a, b) => b.num_comments - a.num_comments);
  }

  async makeCarouselData({ postId }: { postId: string }) {
    const post = await this.redditClient
      .getSubmission("xl1ot8")
      .expandReplies({ limit: 1, depth: 1 });
    return post.author;
    //get comments
    // const comments = await  Promise.all(topPosts.map((post)=> ))
  }

  async generateCarouselImages() {
    //get post with title and body and create image
    //create comments images
  }
}

export default Reddit;
