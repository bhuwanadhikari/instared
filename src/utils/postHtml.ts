import { RedditUser, Subreddit } from "snoowrap";
import { RComment, RPost } from "../lib/reddit/types";
import { numFormatter } from "./common";

export const getPostHtml = ({
  thumbnail,
  author,
  subreddit,
  title,
  numComments,
  selftext,
  ups,
  downs,
  flairColor,
  flairBackground,
  flair,
}: RPost) => {
  const hasSelftext = Boolean(selftext);
  /*html*/
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
        padding: 28px;
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
  
  
      .main>.main-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
      }
  
      .header {
        display: flex;
        gap: 8px;
        align-items: center;
      }
  
      .image-box>img {
        width: 32px;
        height: 32px;
        border-radius: 12px;
      }
  
      .header-right {
        display: flex;
        flex-direction: column;
        gap: 2px;
        /* gap: 4px; */
        /* line-height: 0.1rem; */
      }
  
  
  
      .author,
      .subreddit {
        color: #bbb;
        font-size: 0.7rem;
        line-height: 0.8rem;
      }
  
      .flair {
        vertical-align: middle;
        border-radius: 2px;
        background-color: ${flairBackground};
        color: ${flairColor === "dark" ? "#020202" : "#fff"};
        padding: 2px 4px;
        font-size: 0.6rem;
        font-weight: normal;
      }
  
      .main-text-title {
        font-size: 1.05rem;
        font-weight: bold;
        padding: 2px 0;
      }
  
      .main-text-selftext {
        padding-top: 6px;
        border-top: 1px solid silver;
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
              <img src=${thumbnail} alt="">
            </div>
            <div class="header-right">
              <div class="subreddit">
                r/${subreddit}
              </div>
              <div class="author">
                by u/${author}
              </div>
            </div>
          </div>
  
          <div class="main-text-title">
            ${
              flair
                ? `
            <span class="flair">${flair}</span>
            `
                : ""
            } ${title}
          </div>
          ${
            /*html*/
            hasSelftext
              ? `<div class="main-text-selftext">${selftext}</div>`
              : ``
          }
          <div class="footer">
            <div class="upvotes">
              <i class="material-icons upvote-icon">file_upload</i>
              <div>${numFormatter.format(ups)}</div>
            </div>
            <div class="comments">
              <i class="material-icons comment-icon">mode_comment</i>
              <div>${numFormatter.format(numComments)}</div>
            </div>
          </div>
        </div>
  
      </div>
  
    </div>
  </body>
  
  </html>`;
};
