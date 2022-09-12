export const getHtml = () => {
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
        width: 1620px;
        height: 1620px;
        background-color: antiquewhite;
        display: flex;
        align-items: center;
      }
  
      .main {
        zoom: 3;
        background-color: black;
        padding: 48px;
        width: 540px;
        height: 540px;
        display: flex;
        flex-direction: column;
        gap: 24px;
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
        width: calc( 540px - 96px );
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
      <div class="header">
  
        <div class="image-box">
          <img src="https://styles.redditmedia.com/t5_2qs6h/styles/communityIcon_znptuoshgmc61.png" alt="">
        </div>
        <div class="header-right">
          <div class="subreddit">
            r/Nepal
          </div>
          <div class="author">
            Posted by u/Sushilkdl
          </div>
        </div>
      </div>
      <div class="post-title">
        I am not against VIP Travel, but given the road condition and Traffic that thousands of people suffer, it isn't
        such a good idea. Maybe if some foreign diplomats are visiting Nepal, Sure why not? Let's give them respect.
      </div>
      <div class="footer">
        <div class="upvotes">
          <i class="material-icons upvote-icon">file_upload</i>
          <div>1.2k</div>
        </div>
        <div class="comments">
          <i class="material-icons comment-icon">mode_comment</i>
          <div>1.2k</div>
        </div>
      </div>
    </div>
  </body>
  
  </html>`;
};
