import http from "http";
require("dotenv").config();
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import postRoutes from "./routes/posts";
import redditRoutes from "./routes/reddit";
import instaRoutes from "./routes/insta";
import imgurRoutes from "./routes/imgur";
import Instared from "./lib/instared/Instared";
import { fbConfig, imgurConfig, redditConfig } from "./constants";
import { getAppRootDir } from "./utils/common";
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

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */

router.use("/instared/do-a-post", async (req: Request, res: Response) => {
  try {
    const payload = await instared.doAPost({
      subreddit: "nepal",
      numberOfPosts: 1,
    });

    console.log("THIS IS PAYLAOD", payload);

    return res.json({
      data: payload,
    });
  } catch (e) {
    return { data: "error" };
  }
});

router.use("/reddit/", redditRoutes);
router.use("/instagram/", instaRoutes);
router.use("/posts/", postRoutes);
router.use("/imgur/", imgurRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
