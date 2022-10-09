import { response } from "express";
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

      if (curatedPosts.length === 0) {
        console.log("Couldn't find postable posts")
        return {
          message: "No posts are postable",
        };
      }

      console.log(`shortlisted to ${curatedPosts.length} curated posts`);

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
        imgurImages.push(response);
        await this.instagram.makeCarouselAndPost({
          resources: response.map((image: any) => ({
            url: image.link,
            type: "IMAGE",
          })),
          caption: "#reddit #redditnepal #nepal #fyp #quotes #information",
        });
      }

      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default Instared;
