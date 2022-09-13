import { RedditUser, Subreddit } from "snoowrap";

export type GetHtmlArgs = {
  subreddit: Subreddit;
  author: RedditUser;
  thumbnail: string;
  title: string;
  num_comments: number;
  upvotes: number;
};

export const getHtml = ({
  subreddit,
  author,
  title,
  num_comments,
  upvotes,
  thumbnail,
}: GetHtmlArgs) => {
  console.log(subreddit);
  return `<html>

  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <style>
      * {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        line-height: 1.2rem;
      }
  
      body {
        padding: 0;
        margin: 0;
        width: 540px;
        height: 540px;
        background-color: antiquewhite;
  
      }
  
      .main {
        // zoom: 3;
        background-color: grey;
        // padding: 48px;
        width: 540px;
        height: 540px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
  
      .main-container {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        gap: 24px;
        background-color: green;
        width: 100%;
      }
  
      .header {
        display: flex;
        gap: 12px;
        align-items: center;
      }
  
      .image-box>img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
  
      .header-right {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
  
      .author {
        color: #bbb;
      }
  
      .post-title {
        width: calc(540px - 48px);
        word-wrap: break-word;
      }
  
      .footer {
        display: flex;
        align-items: center;
        gap: 12px;
      }
  
      .upvotes {
        display: flex;
        gap: 4px;
        align-items: center;
      }
  
      .comments {
        display: flex;
        gap: 4px;
        align-items: center;
      }
  
      .upvote-icon {
        color: #ff8303;
      }
  
      .comment-icon {
        font-size: 1.2em;
        color: silver
      }
    </style>
  </head>
  
  <body>
    <div class="main">
      <div class="main-container">
        <div class="header">
  
          <div class="image-box">
            <img src=${thumbnail} alt="">
          </div>
          <div class="header-right">
            <div class="subreddit">
              r/${subreddit.display_name}
            </div>
            <div class="author">
              Posted by u/${author.name}
            </div>
          </div>
        </div>
        <div class="post-title">
          ${title}
        </div>
        <div class="footer">
          <div class="upvotes">
            <i class="material-icons upvote-icon">file_upload</i>
            <div>${upvotes}</div>
          </div>
          <div class="comments">
            <i class="material-icons comment-icon">mode_comment</i>
            <div>${num_comments}</div>
          </div>
        </div>
      </div>
    </div>
  </body>
  
  </html>`;
};
