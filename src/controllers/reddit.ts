import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import Snoowrap from "snoowrap";
import { redditConfig, fbConfig } from "../constants";
import nodeHtmlToImage from "node-html-to-image";
import { getHtml } from "../utils/common";

const r = new Snoowrap({
  userAgent: "whatever",
  username: redditConfig.username,
  clientId: redditConfig.clientId,
  clientSecret: redditConfig.clientSecret,
  password: redditConfig.password,
});

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  // get some posts
  let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  let posts: [Post] = result.data;
  return res.status(200).json({
    message: posts,
  });
};

const createImage = async (req: Request, res: Response, next: NextFunction) => {
  // const posts = await r
  //   .getSubreddit("nepal")
  //   .getTop()
  //   .then((res) => {
  //     const filtered = res
  //       .filter((item) => {
  //         return (
  //           item.title.length < 280 &&
  //           item.title[item.title.length - 1] === "?" &&
  //           item.num_comments > 25
  //         );
  //       })
  //       .map((item) => {
  //         return { title: item.title, id: item.id, comments: [] };
  //       });

  //     return filtered;
  //   });
  // nodeHtmlToImage({
  //   output: "./images/image.png",
  //   html: getHtml(),
  // }).then(() => console.log("The imagesd was created successfully!"));

  return res.status(200).json({
    message: "created",
  });
};

const getPostsBySubreddit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await r.getSubreddit("nepal").getHot();

  // console.log(posts);

  const post = posts[0];

  return res.status(200).json({
    message: posts,
  });
};

// postImage
const postImage = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req
  let id: string = req.params.id;
  // get the post
  let result: AxiosResponse = await axios.get(
    `https://graph.facebook.com/v14.0/5955314741169402?fields=id,username&access_token=${fbConfig.accessToken}`
  );
  let post: Post = result.data;
  return res.status(200).json({
    message: post,
  });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req
  let id: string = req.params.id;
  // get the post
  try {
    let result: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    let post: Post = result.data;
  } catch (e: any) {
    console.log(e.response.data);
  }
  return res.status(200).json({
    message: "response",
  });
};

export default {
  getPosts,
  getPost,
  getPostsBySubreddit,
  createImage,
  postImage,
};
//
