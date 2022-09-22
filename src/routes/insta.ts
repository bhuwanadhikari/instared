import express from "express";
import { Request, Response, NextFunction } from "express";
import { fbConfig } from "../constants";

import controller from "../controllers/reddit";
import Instagram from "../lib/instagram/Instagram";
const router = express.Router();

const instagramClient = new Instagram({
  base_url: fbConfig.graphDomain,
  access_token: fbConfig.accessToken,
  instagram_user_id: fbConfig.instagramBusinessId,
  api_version: fbConfig.apiVersion,
});

router.get("/rate-limit", async (req: Request, res: Response) => {
  instagramClient
    .getContentPublishingLimit({ fields: ["quota_usage"] })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log("error");
      console.log(e.response.data);
    });

  return res.status(200).json({
    message: "response",
  });
});
router.get("/make-post", async (req: Request, res: Response) => {
  try {
    const result = await instagramClient.makeCarouselAndPost({
      resources: [
        { url: "https://i.imgur.com/XitZ1XW.png", type: "IMAGE" },
        { url: "https://i.imgur.com/XitZ1XW.png", type: "IMAGE" },
      ],
      caption: "This is the caption #reddit #nepal",
    });
    return res.json({ result });
  } catch (e) {
    return res.json({ error: e });
  }

  return res.status(200).json({
    message: "response",
  });
});
router.get("/posts/:id", controller.getPost);
router.get("/moderators/", controller.getPostsBySubreddit);
router.get("/create-image", controller.createImage);
router.get("/post-image", controller.postImage);

export = router;
