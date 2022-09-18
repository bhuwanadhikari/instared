import axios, { Axios, AxiosRequestConfig } from "axios";
import { ContentPublishingLimitResponseFields, InstagramConfig } from "./types";

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

  private invoke(axiosRequestConfig: AxiosRequestConfig) {
    axiosRequestConfig.params = {
      ...axiosRequestConfig.params,
      access_token: this.access_token,
    };
    axiosRequestConfig.url = `${this.base_url}/${this.api_version}/${this.instagram_business_id}${axiosRequestConfig.url}`;
    console.log(axiosRequestConfig);
    return axios(axiosRequestConfig);
  }

  getContentPublishingLimit(args: ContentPublishingLimitResponseFields) {
    return this.invoke({
      method: "GET",
      url: `/content_publishing_limit?`,
      params: { fields: args.fields.join(",") },
    });
  }
}

export default Instagram;
