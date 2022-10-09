export const redditConfig = {
  redditLogoUrl:
    process.env.REDDIT_LOGO_URL ||
    "https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png",

  clientId: (process.env.REDDIT_CLIENT_ID as string) || "",
  clientSecret: (process.env.REDDIT_CLIENT_SECRET as string) || "",
  username: (process.env.REDDIT_USERNAME as string) || "",
  password: (process.env.REDDIT_PASSWORD as string) || "",
};

export const fbConfig = {
  accessToken: process.env.FB_ACCESS_TOKEN as string,
  longLivedToken: process.env.FB_LONG_LIVED_TOKEN as string,
  clientId: process.env.FB_CLIENT_ID as string,
  clientSecret: process.env.FB_CLIENT_SECRET as string,
  graphDomain: process.env.FB_GRAPH_DOMAIN || "https://graph.facebook.com",
  apiVersion: process.env.FB_API_VERSION || "v14.0",
  instagramId: process.env.FB_INSTAGRAM_ID as string,

  instagramBusinessId: process.env.FB_INSTAGRAM_BUSINESS_ID as string,
  pageId: process.env.FB_PAGE_ID as string,
};

export const imgurConfig = {
  baseUrl: process.env.IMGUR_BASE_URL || "https://api.imgur.com",
  apiVersion: process.env.IMGUR_API_VERSION || "3",
  clientId: process.env.IMGUR_CLIENT_ID as string,
  clientSecret: process.env.IMGUR_CLIENT_SECRET as string,
};

export const appConfig = {
  subredditsToCuratePosts: process.env.APP_SUBREDDITS_TO_CURATE_POSTS || [
    "nepal",
    "india",
  ],
  numberOfPostsCuratedfromASubreddit: parseInt(
    process.env.APP_NUMBER_OF_POSTS_CURATED_FROM_A_SUBREDDIT || "1"
  ),
};

export const instagramErrorCodes = {
  SESSION_EXPIRED: 190,
};
