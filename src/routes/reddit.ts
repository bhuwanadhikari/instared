import express from "express";
import controller from "../controllers/reddit";
const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPost);
router.get("/posts/:id", controller.getPostsBySubreddit);

export = router;
