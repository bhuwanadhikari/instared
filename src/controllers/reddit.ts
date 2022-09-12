import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import Snoowrap from "snoowrap";
import { appConfig } from "../constants";
import nodeHtmlToImage from "node-html-to-image";
import { getHtml } from "../utils/common";

const r = new Snoowrap({
  userAgent: "whatever",
  username: appConfig.username,
  clientId: appConfig.clientId,
  clientSecret: appConfig.clientSecret,
  password: appConfig.password,
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
  nodeHtmlToImage({
    output: "./images/image.png",
    html: getHtml(),
  }).then(() => console.log("The imagesd was created successfully!"));

  return res.status(200).json({
    message: "created",
  });
};

const getPostsBySubreddit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await r
    .getSubreddit("nepal")
    .getTop()
    .then((res) => {
      const filtered = res
        .filter((item) => {
          return (
            item.title.length < 280 &&
            item.title[item.title.length - 1] === "?" &&
            item.num_comments > 25
          );
        })
        .map((item) => {
          return { title: item.title, id: item.id, comments: [] };
        });

      return filtered;
    });
  console.log(posts);

  const ccc: any =
    // for (let post of posts) {
    await r
      .getSubmission(posts[0].id)
      .expandReplies({ limit: Infinity, depth: 1 })
      .then(({ author, subreddit, title, ups, num_comments, comments }) => {
        return {
          author,
          subreddit,
          title,
          ups,
          num_comments,
          comments: comments
            .filter((c) => c.body.length < 280 && c.ups > 10)
            .map(({ author, ups, body }) => ({
              author,
              ups,
              body,
            })),
        };
      });
  // }

  console.log(ccc);
  // let result: AxiosResponse = await axios.post(``);
  // let posts: [Post] = result.data;
  return res.status(200).json({
    message: ccc,
  });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req
  let id: string = req.params.id;
  // get the post
  let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  let post: Post = result.data;
  return res.status(200).json({
    message: post,
  });
};

export default { getPosts, getPost, getPostsBySubreddit, createImage };
//
