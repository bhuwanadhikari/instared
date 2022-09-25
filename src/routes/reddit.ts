import express, { Request, Response } from "express";
import { redditConfig } from "../constants";
import controller from "../controllers/reddit";
import Reddit from "../lib/reddit/Reddit";
import { RComment, RPost } from "../lib/reddit/types";
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
  const data: any = await reddit.makeCarouselData({ postId: "xm0qsb" });
  return res.json({ data: data });
});

router.get("/make-images", async (req: Request, res: Response) => {
  const response = await reddit.generateCarouselImages({ postId: "xm0qsb" });
  return res.json({ message: "might have been successful" });
});

export = router;
