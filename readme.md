 ## Instared
 Instared is a script that automates to post curated posts from reddit to instagram. 

Top posts from the subreddit are retrieved, filtered if they are postable to instagram, comments are sorted and 10 carousel images are generated from the json we get.. The generated images are uploaded to imgur and the imgur links are used to post to the instagram. If the post has images, videos, too much of characters in the post, very less numbers of comments, then the post is rejected and another best is choosen for the instagram post. 

You can setup your own automation to make instagram post from any subreddits. For that, reddit app, imgur app and instagram(facebook) apps are to be set up to be able to use the apis. 

To make reddit and imgur apps ready to be able to use apis is fairly easy. To make instagram app, some steps are to be followed. You will need to have, facebook page and a professional/business instagram account connected each other.  I suggest some articles  [this](https://www.youtube.com/playlist?list=PL0glhsZ01I-BAFwPmQBWMNqUDnkSlOR6r), [this](https://www.youtube.com/watch?v=Q5kw7vGLqgs&t=1810s&ab_channel=SkoloOnline), and [official docs](https://developers.facebook.com/docs/instagram-api/guides/content-publishing/).

After all things are setup, create `.env` file on the root of the script project. And put the followings or see `.env.example` file.

```REDDIT_LOGO_URL=https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png
REDDIT_CLIENT_ID=<reddit-app-client-id>
REDDIT_CLIENT_SECRET=<reddit-app-client-secret>
REDDIT_USERNAME=<username-of-the-account-you-using>
REDDIT_PASSWORD=<password-of-the-account-you-using>

FB_ACCESS_TOKEN=<access-token-generated-in-the-app>
FB_LONG_LIVED_TOKEN=<long-lived-token-generated-using-access-token>
FB_CLIENT_ID=<facebook-app-client-id>
FB_CLIENT_SECRET=<facebook-app-client-secret>
FB_GRAPH_DOMAIN=https://graph.facebook.com
FB_API_VERSION=v14.0
FB_INSTAGRAM_ID=<instagram-account-id>
FB_INSTAGRAM_BUSINESS_ID=<instagram-business-id>
FB_PAGE_ID=<facebook-page-id>

IMGUR_BASE_URL=https://api.imgur.com
IMGUR_API_VERSION=3
IMGUR_CLIENT_ID=<imgur-app-client-id>
IMGUR_CLIENT_SECRET=<imgur-app-client-secret>

APP_SUBREDDITS_TO_CURATE_POSTS=<number-of-post-to-be-used-to-post-to-instagram>
APP_NUMBER_OF_POSTS_CURATED_FROM_A_SUBREDDIT=<number-of-post-to-be-used-to-post-to-instagram>
```
Limitations
- For now only top posts can be used to post to instagram but code can be tweaked to make images of hot or popular or recent posts
- Automation for refreshing the facebook app access token is not made so, the `FB_LONG_LIVED_TOKEN` in env vars should be updated every two months for now. 


