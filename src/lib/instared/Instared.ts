import Imgur from "../imgur/Imgur";
import { ImgurConfig } from "../imgur/types";
import Instagram from "../instagram/Instagram";
import { InstagramConfig } from "../instagram/types";
import Reddit from "../reddit/Reddit";
import { RedditConfig } from "../reddit/types";

class Instared {
  private reddit;
  private instagram;
  private imgur;

  constructor({
    redditConfig,
    instagramConfig,
    imgurConfig,
  }: {
    redditConfig: RedditConfig;
    instagramConfig: InstagramConfig;
    imgurConfig: ImgurConfig;
  }) {
    this.reddit = new Reddit({ ...redditConfig });
    this.instagram = new Instagram({ ...instagramConfig });
    this.imgur = new Imgur({ ...imgurConfig });
  }

  async doAPost({ subreddit }: { subreddit: string }) {
    const curatedPosts = await this.reddit.getCuratedPosts({
      subreddit: subreddit,
    });

    for (let post of curatedPosts) {
      const res = await this.reddit.generateCarouselImages({ postId: post.id });
      console.log(res);
    }
  }
}

export default Instared;
