[Teacher version](https://github.com/mschwarzmueller/nextjs-course-code/tree/10-prj-blog)
## Getting Started

First, edit [.env.sample](.env.sample) file, you might wanna use [Mongodb](https://www.mongodb.com) 
_(this is only for contact page)_

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/contact](http://localhost:3000/api/contact). This endpoint can be edited in `pages/api/contact.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

To add new article (it's not srored on DB) go to [./posts](./posts/about-article.md), article are written on MarkDown, as this readme, made possible with [react-markdown](https://www.npmjs.com/package/react-markdown).

To write a new post, make sure that you created your file.md on /posts folder, edit the header as it follows :

```js
---
title: "Let's enjoy Markdown"
date: '2022-02-17'
image: working-cat.jpeg
excerpt: 'MarkDown, React and Next.JS'
isFeatured: true
---
```

Images must be stored in [/public/images/posts/[ARTICLE-FILENAME]](/blog/public/images/posts/), and be well-named in the header of article, otherwise, images won't appear.

Before deploying your onwn app, edit meta tags on [pages](/blog/pages/)

## Deployed on Vercel

Over here : https://blog-sirharveybix.vercel.app/
