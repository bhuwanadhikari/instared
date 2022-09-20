import express from "express";
import { Request, Response, NextFunction } from "express";
import { fbConfig, imgurConfig } from "../constants";
import FormData from "form-data";

import fs from "fs";

import controller from "../controllers/reddit";
import Imgur from "../factory/imgur/Imgur";
import Instagram from "../factory/instagram/Instagram";
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
    const formData = new FormData();

    formData.append(
      "image",
      fs.createReadStream("/Users/bhuwanadhikari/Downloads/mountains.png")
    );
    formData.append(
      "image",
      fs.createReadStream("/Users/bhuwanadhikari/Downloads/infoicon.png")
    );
    const result = await imgurClient.uploadImages({
      imageFormData: formData,
    });
    return res.status(200).json({
      message: result.data,
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
