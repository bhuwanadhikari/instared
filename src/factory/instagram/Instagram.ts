import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import {
  ContentPublishingLimitResponseFields,
  InstagramConfig,
  InstagramContainerId,
} from "./types";

// TODO: CONVERT EVERYTHING TO CAMEL CASE

class Instagram {
  readonly base_url: string;
  readonly api_version: string;
  readonly access_token: string;
  readonly instagram_business_id: string;

  constructor(config: InstagramConfig) {
    this.base_url = config.base_url;
    this.api_version = config.api_version;
    this.access_token = config.access_token;
    this.instagram_business_id = config.instagram_user_id;
  }

  private async invoke(axiosRequestConfig: AxiosRequestConfig) {
    axiosRequestConfig.params = {
      ...axiosRequestConfig.params,
      access_token: this.access_token,
    };
    axiosRequestConfig.url = `${this.base_url}/${this.api_version}/${this.instagram_business_id}${axiosRequestConfig.url}`;
    return axios(axiosRequestConfig);
  }

  async getContentPublishingLimit({
    fields,
  }: {
    fields: ("quota_usage" | "rate_limit_settings")[];
  }) {
    return await this.invoke({
      method: "GET",
      url: `/content_publishing_limit`,
      params: { fields: fields.join(",") },
    });
  }

  async createImageCarouselItem({ image_url }: { image_url: string }) {
    return await this.invoke({
      method: "POST",
      url: "/media",
      params: {
        image_url,
        is_carousel_item: true,
      },
    });
  }

  async createVideoCarouselItem({ video_url }: { video_url: string }) {
    return await this.invoke({
      method: "POST",
      url: "/media",
      params: {
        video_url,
        media_type: "VIDEO",
        is_carousel_item: true,
      },
    });
  }

  async createCarousel({
    caption,
    carousel_items,
  }: {
    caption: string;
    carousel_items: InstagramContainerId[];
  }) {
    return await this.invoke({
      method: "POST",
      url: "/media",
      params: {
        caption: caption,
        children: carousel_items.join(","),
        media_type: "CAROUSEL",
      },
    });
  }

  async publishCarousel({
    creation_id,
  }: {
    creation_id: InstagramContainerId;
  }) {
    return await this.invoke({
      method: "POST",
      url: "/media_publish",
      params: {
        creation_id,
      },
    });
  }

  async makeCarouselAndPost({
    resources,
    caption,
  }: {
    resources: { url: string; type: "VIDEO" | "IMAGE" }[];
    caption: string;
  }) {
    //create carouselItem
    const carousel_items: string[] = [];
    console.log("creating carousel item");
    try {
      // TODO: convert to promise.all
      for (let resource of resources) {
        const carouselItemRes =
          resource.type === "IMAGE"
            ? await this.createImageCarouselItem({
                image_url: resource.url,
              })
            : await this.createVideoCarouselItem({
                video_url: resource.url,
              });
        console.log("carousel item container id", carouselItemRes.data.id);

        carousel_items.push(carouselItemRes.data.id);
      }
      console.log("container-list", carousel_items);
      console.log(
        "container-list",
        encodeURIComponent(carousel_items.join(","))
      );
      //create carousel
      console.log("creating carousel container");
      const carouselRes = await this.createCarousel({
        caption: caption,
        carousel_items: carousel_items,
      });
      console.log("publishing the carousel", carouselRes.data.id);

      //publish carousel
      const publishRes = await this.publishCarousel({
        creation_id: carouselRes.data.id,
      });
      console.log("published carousel");
      return { data: publishRes.data };
    } catch (e: any) {
      console.log(e.type === AxiosError ? e.response : e);
      return e;
    }
  }
}

export default Instagram;
