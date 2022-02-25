---
title: Let's enjoy Markdown
date: '2022-02-17'
image: working-cat.jpeg
excerpt: 'MarkDown, fs/node.js, react and Next.JS'
isFeatured: true
---

# Experiencing MarkDown

Well, this project has been featured, initily, it was only a Next project.

Impossible as well to be only a NextJS project without any front end frameword, here it's React.

During the developpement I enjoyed to play with Node, I never did before, I mean, I did, but i only thought it was a server, not a library funny to play with.

Like here :

```js
const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = (fileName) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, '');
  const postData = { slug: postSlug, ...data, content };
  return postData;
};
```

A 'Simple' function, to parse a file into an object that you can play with
