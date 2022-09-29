import { getAppRootDir } from "../../utils/common";
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

  async doAPost({
    subreddit,
    numberOfPosts,
  }: {
    subreddit: string;
    numberOfPosts: number;
  }) {
    try {
      const curatedPosts = await this.reddit.getCuratedPosts({
        subreddit: subreddit,
      });

      const locallyGeneratedImages = [];

      // image generation
      for (let i = 0; i < numberOfPosts; i = i + 1) {
        if (curatedPosts.length === i) break;
        const aPostImages = await this.reddit.generateCarouselImages({
          postId: curatedPosts[i].id,
        });
        locallyGeneratedImages.push(aPostImages);
      }

      const imgurImages = [];
      for (let aPostImages of locallyGeneratedImages) {
        const response = await this.imgur.uploadImages({
          imagePaths: aPostImages.map(
            (image) => getAppRootDir() + image.imagePath.slice(1)
          ),
        });
        console.log(response);
      }

      return locallyGeneratedImages;
    } catch (e) {
      throw e;
    }
  }
}

export default Instared;
