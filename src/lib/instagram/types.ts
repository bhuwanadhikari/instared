export type InstagramConfig = {
  base_url: string;
  longLivedToken: string;
  clientId: string;
  clientSecret: string;
  api_version: string;
  access_token: string;
  /**
   * Instagram business user id
   */
  instagram_user_id: string;
};

export type ContentPublishingLimitResponseFields = {
  fields: ("quota_usage" | "rate_limit_settings")[];
};

export type InstagramContainerId = string;

export type CarouselItem = {};
