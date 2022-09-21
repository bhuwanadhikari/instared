import Snoowrap from "snoowrap";
import { RedditConfig } from "./types";

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

  async makeCarouselData({ subreddit }: { subreddit: string }) {
    //get top posts
    const topPosts = await this.redditClient.getSubreddit(subreddit).getTop();

    //get comments
    // const comments = await  Promise.all(topPosts.map((post)=> ))

    return topPosts
      ?.sort((a, b) => b.num_comments - a.num_comments)
      .slice(0, 9)
      .map((p) => p.num_comments);
  }

  async generateCarouselImages() {
    //get post with title and body and create image
    //create comments images
  }
}

export default Reddit;
