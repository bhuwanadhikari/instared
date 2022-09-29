import express from "express";
import { Request, Response, NextFunction } from "express";
import { fbConfig, imgurConfig } from "../constants";
import FormData from "form-data";

import fs from "fs";

import controller from "../controllers/reddit";
import Imgur from "../lib/imgur/Imgur";
import Instagram from "../lib/instagram/Instagram";
import { AxiosResponse } from "axios";
const router = express.Router();

const imgurClient = new Imgur({
  clientId: imgurConfig.clientId,
  clientSecret: imgurConfig.clientSecret,
  baseUrl: imgurConfig.baseUrl,
  apiVersion: imgurConfig.apiVersion,
});

router.get("/upload", async (req: Request, res: Response) => {
  try {
    const result = await imgurClient.uploadImages({
      imagePaths: [
        "/Users/bhuwanadhikari/Documents/learns/instareddit/images/dynamic.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
        // "/Users/bhuwanadhikari/Documents/learns/instareddit/images/image.png",
      ],
    });
    return res.status(200).json({
      message: result,
    });
  } catch (e: any) {
    console.log(e);
    return res.json({ error: e.data });
  }
});
router.get("/posts/:id", controller.getPost);
router.get("/moderators/", controller.getPostsBySubreddit);
router.get("/create-image", controller.createImage);
router.get("/post-image", controller.postImage);

export = router;
