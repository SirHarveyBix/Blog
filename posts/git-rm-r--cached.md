---
title: Git Vs. Vercel
date: '2022-02-22'
image: git-find.webp
excerpt: 'When git chached data blow up vercel'
isFeatured: true
---

# Deploy

As you now know this website is deployed on vercel,
and for some reason, I F\*\*k'd up a single import :

```js
import Hero from '/components/HomePage/Hero';
```

This was working perfectly fine on Local, but not on deploy, because the right import must have been :

```js
import Hero from '/components/homePage/Hero';
```

Based on Linux, vercel is case sensitive, but first I ignored my mistake because the first code was perfectly working locaaly, then, when I realize my mistake, change the case, that was still not working :

```shell
Module not found: Can't resolve "/components/homePage/Hero" in
"/vercel/path0/blog/pages"
```

After Hours of reaserch and internet digging, i finnaly foud the glitch ..
git push cache too, as far as I understood.

you "just" need to put it away, like that :

```git
git rm -r --cached .
git add --all .
git commit -am "Fix casing discrepancies."
git push origin branch_name
```

This [page](https://github.com/vercel/next.js/discussions/18176#discussioncomment-145539)saved me hours of digging, and prevent my brain to blow up.
