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

export type RComment = {
  author: RedditUser;
  body: string;
  ups: number;
  num_replies: number;
  depth: number;
  score: number;
  downs: number;
  replies: RComment[];
};

// export type RComments = {
//   [key: string]: RComment;
// };
