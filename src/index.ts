const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/../.env" });
import Instared from "./lib/instared/Instared";
import { appConfig, fbConfig, imgurConfig, redditConfig } from "./constants";
import { getAppRootDir } from "./utils/common";
import fs from "fs";
import cron from "node-cron";

//@ts-ignore
global.__basedir = __dirname;

const instared = new Instared({
  redditConfig: {
    redditClientConfig: {
      userAgent: "the user",
      username: redditConfig.username,
      clientId: redditConfig.clientId,
      clientSecret: redditConfig.clientSecret,
      password: redditConfig.password,
    },
  },
  imgurConfig: {
    clientId: imgurConfig.clientId,
    clientSecret: imgurConfig.clientSecret,
    baseUrl: imgurConfig.baseUrl,
    apiVersion: imgurConfig.apiVersion,
  },
  instagramConfig: {
    base_url: fbConfig.graphDomain,
    access_token: fbConfig.accessToken,
    instagram_user_id: fbConfig.instagramBusinessId,
    api_version: fbConfig.apiVersion,
    clientId: fbConfig.clientId,
    clientSecret: fbConfig.clientSecret,
    longLivedToken: fbConfig.longLivedToken,
  },
});

console.log("The app has started running...");

// cron.schedule("0 21 * * *", async () => {
//   try {
//     const payload = await instared.doAPost({
//       subreddit: "nepal",
//       numberOfPosts: appConfig.numberOfPostsCuratedfromASubreddit,
//     });
//   } catch (e) {
//     console.log("ERROR OCCURED");
//     console.log(e);
//   }
// });

try {
  const payload = instared.doAPost({
    subreddit: "nepal",
    numberOfPosts: appConfig.numberOfPostsCuratedfromASubreddit,
  });
} catch (e) {
  console.log("ERROR OCCURED");
  console.log(e);
}
