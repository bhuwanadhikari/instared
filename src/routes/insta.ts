import express from "express";
import { Request, Response, NextFunction } from "express";
import { fbConfig } from "../constants";

import controller from "../controllers/reddit";
import Instagram from "../factory/instagram/Instagram";
const router = express.Router();

const instagramClient = new Instagram({
  base_url: fbConfig.graphDomain,
  access_token: fbConfig.accessToken,
  instagram_user_id: fbConfig.instagramBusinessId,
  api_version: fbConfig.apiVersion,
});

router.get("/rate_limit", async (req: Request, res: Response) => {
  instagramClient
    .getContentPublishingLimit({ fields: ["quota_usage"] })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log('error')
      console.log(e.response.data);
    });

  return res.status(200).json({
    message: "response",
  });
});
router.get("/posts/:id", controller.getPost);
router.get("/moderators/", controller.getPostsBySubreddit);
router.get("/create-image", controller.createImage);
router.get("/post-image", controller.postImage);

export = router;
