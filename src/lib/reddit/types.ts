import { RedditUser } from "snoowrap";

export type RedditConfig = {
  redditClientConfig: {
    userAgent: string;
    username: string;
    clientId: string;
    clientSecret: string;
    password: string;
  };
};

export type RPost = {
  id: string;
  name: string;
  thumbnail: string;
  author: string;
  title: string;
  selftext: string;
  ups: number;
  downs: number;
  subreddit: string;
  numComments: number;
  comments: RComment[];
};

export type RComment = {
  author: string;
  isOP: boolean;
  body: string;
  ups: number;
  num_replies: number;
  postId: string;
  depth: number;
  score: number;
  thumbnail: string;
  downs: number;
  replies: RComment[];
};

// export type RComments = {
//   [key: string]: RComment;
// };
