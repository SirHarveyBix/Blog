## Getting Started

First, edit [.env.sample](.env.sample) file, and create a [Mongodb](https://www.mongodb.com) database & cluster

Then, run the development server:

```bash
# front :
yarn dev
# back
yarn gql
```

### Initialize Servers

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

###### <u>Frontend : </u>

> The Frontend : [www.gui-dev.fr](https://www.gui-dev.fr/)
> Hosted by vercel : [admin panel](https://vercel.com/sirharveybix/blog-prod)

- - _consider to fill the information in > General, Git, & Environement Variables_

- - _you can add a **.vercelignore** file to force vercel not to deploys certains files / folder like "utils"_

###### <u>Backend :</u>

> the back end : [bloggql.herokuapp.com/](https://bloggql.herokuapp.com/)
> hosted by Heroku [admin panel](https://dashboard.heroku.com/apps/bloggql)

- - _consider to editing Config Vars as you did in **.env** file : [Details](./utils/README.md)_

### Write Articles

To add new article go to [utils/posts](./utils/posts/), write it on MarkDown, as a readme. I used [react-markdown](https://www.npmjs.com/package/react-markdown) to implement. just create a new file: [_FILENAME_].md

To write a new post, make sure that you created your _FILENAME_**.md** on [utils/posts](./utils/posts/) folder, edit the header as it follows :

```js
---
title: "Let's enjoy Markdown"
date: '2022-02-17'
image: working-cat.jpeg // including extension
excerpt: 'MarkDown, React and Next.JS'
isFeatured: true
---
```

Images must be stored in [/public/images/posts/[_ARTICLE-FILENAME_]](/blog/public/images/posts/), and be well-named in the header of article, otherwise, images won't be shown.

Before deploying your onwn app, edit meta tags on [pages](/blog/pages/)

### Deployed :

Frontend : [www.gui-dev.fr](https://www.gui-dev.fr/)
Backend : [bloggql.herokuapp.com/](https://bloggql.herokuapp.com/)
