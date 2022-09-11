import express from "express";
import controller from "../controllers/reddit";
const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPost);
router.get("/moderators/", controller.getPostsBySubreddit);

export = router;
