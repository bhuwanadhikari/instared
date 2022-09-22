import express, { Request, Response } from "express";
import { redditConfig } from "../constants";
import controller from "../controllers/reddit";
import Reddit from "../lib/reddit/Reddit";
const router = express.Router();

const reddit = new Reddit({
  redditClientConfig: {
    userAgent: "the user",
    username: redditConfig.username,
    clientId: redditConfig.clientId,
    clientSecret: redditConfig.clientSecret,
    password: redditConfig.password,
  },
});

router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPost);
router.get("/moderators/", controller.getPostsBySubreddit);
router.get("/create-image", controller.createImage);
router.get("/post-image", controller.postImage);
router.get("/post-image", controller.postImage);

router.get("/make-data", async (req: Request, res: Response) => {
  // try {
  //   const data = await reddit.getCuratedPost({ subreddit: "nepal" });
  //   return res.json({
  //     data: data,
  //   });
  // } catch (e) {
  //   console.log(e);
  //   return res.json({
  //     data: "error",
  //   });
  // }
  const data = await reddit.makeCarouselData({ postId: "random" });
  return res.json({ data: data });
});

export = router;
