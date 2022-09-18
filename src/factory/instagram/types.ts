export type InstagramConfig = {
  base_url: string;
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
