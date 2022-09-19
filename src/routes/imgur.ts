import express from "express";
import { Request, Response, NextFunction } from "express";
import { fbConfig, imgurConfig } from "../constants";

import fs from 'fs';

import controller from "../controllers/reddit";
import Imgur from "../factory/imgur/Imgur";
import Instagram from "../factory/instagram/Instagram";
const router = express.Router();

const imgurClient = new Imgur({
  clientId: imgurConfig.clientId,
  clientSecret: imgurConfig.clientSecret,
  baseUrl: imgurConfig.baseUrl,
  apiVersion: imgurConfig.apiVersion,
});


router.get("/upload-image", async (req: Request, res: Response) => {

  const formData = new URLSearchParams();

  formData.append("images", fs.createReadStream("../../images/dynamic.png"))
  formData.append("images", fs.createReadStream("../../images/dynamic.png"))

  imgurClient.uploadImages({
    imageFormData: 
  })
  return res.status(200).json({
    message: "response",
  });
});
router.get("/posts/:id", controller.getPost);
router.get("/moderators/", controller.getPostsBySubreddit);
router.get("/create-image", controller.createImage);
router.get("/post-image", controller.postImage);

export = router;
