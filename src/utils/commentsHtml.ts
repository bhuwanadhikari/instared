import { RedditUser, Subreddit } from "snoowrap";

export type GetCommentsHtmlArgs = {
  author: RedditUser;
  thumbnail: string;
  body: string;
  num_replies: number;
  upvotes: number;
};

export const getCommentsHtml = ({
  author,
  body,
  num_replies,
  upvotes,
  thumbnail,
}: GetCommentsHtmlArgs) => {
  return `<html>

  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <style>
      * {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        line-height: 1.2rem;
        font-size: 1rem;
      }
  
      body {
        padding: 0;
        margin: 0;
        width: 1200px;
        height: 1500px;
        background-color: antiquewhite;
        /* display: table; */
      }
  
      .post-container {
        zoom: 3;
        background-color: #111;
        padding: 24px;
        width: 400px;
        height: 500px;
        box-sizing: border-box;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
      }
  
      .main {}
  
      .children {
        background-color: #121212;
        display: flex;
        flex-direction: row;
      }
  
      .main>.main-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
      }
  
  
  
      .children>.children-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px
      }
  
      .reply-bar-box {
        height: 100%;
        width: 24px;
        /* background-color: red; */
      }
  
      .reply-bar-box>.bar {
        height: 100%;
        width: 2px;
        margin: 0 11px;
        background-color: silver;
      }
  
      .table-row {
        display: table-row;
      }
  
      .header {
        display: flex;
        gap: 8px;
        align-items: center;
      }
  
      .image-box>img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
      }
  
      .header-right {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
  
      .author {
        color: #bbb;
      }
  
      .main-text-body {
        /* width: calc(540px - 24px); */
      }
  
      .children-text-body {
        /* width: calc(540px - 24px); */
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
    <div class="post-container">
      <div class="main">
        <div class="main-container">
          <div class="header">
            <div class="image-box">
              <img
                src=${thumbnail}
                alt="">
            </div>
            <div class="header-right">
              <div class="author">
                by u/${author.name}
              </div>
            </div>
          </div>
          <div class="main-text-body">
            ${body}
          </div>
          <div class="footer">
            <div class="upvotes">
              <i class="material-icons upvote-icon">file_upload</i>
              <div>${upvotes}</div>
            </div>
            <div class="comments">
              <i class="material-icons comment-icon">mode_comment</i>
              <div>${num_replies}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="children">
        <div class="reply-bar-box">
          <div class="bar"></div>
        </div>
  
        <div class="children-container">
          <div class="header">
            <div class="image-box">
              <img
                src=${thumbnail}
                alt="">
            </div>
            <div class="header-right">
              <div class="author">
                by u/${author.name}
              </div>
            </div>
          </div>
          <div class="children-text-body">
            Being charged a "convenience fee\" for the \"honor\" of being able to pay a bill by phone or online. Uhm -
            really? I have to PAY you to PAY you??
          </div>
          <div class="footer">
            <div class="upvotes">
              <i class="material-icons upvote-icon">file_upload</i>
              <div>${upvotes}</div>
            </div>
            <div class="comments">
              <i class="material-icons comment-icon">mode_comment</i>
              <div>${num_replies}</div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </body>
  
  </html>`;
};
