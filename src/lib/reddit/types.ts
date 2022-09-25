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
  thumbnail: string;
  author: any;
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
  body: string;
  ups: number;
  num_replies: number;
  depth: number;
  score: number;
  thumbnail: string;
  downs: number;
  replies: RComment[];
};

// export type RComments = {
//   [key: string]: RComment;
// };
