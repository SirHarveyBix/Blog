---
title: 'DevOps : Vercel, Heroku, & integration continue'
date: '2022-03-04'
image: next_js_deploy_vercel.png
excerpt: Deployer le Front de ce projet sur Vercel, le back sur Heroku, et tests d'integrations sur github
isFeatured: true
---

## Principe de deploiement

Il existe plusieurs solutions gratuite pour l'hebergement de son site, [Netlify](https://www.netlify.com/), ou encore [GitHubPages](https://pages.github.com/), tous ont leurs avantages et, et inconveignants, j'ai choisi: [Vercel](https://vercel.com/home) pour le front. Etant donné que ce site est developpé en Next.js et que Vercel a aussi developper Next.js, j'ai choisi ce dernier

### Vercel

Contrairement a Heroku, je n'ai pas eprouver de grandes difficulté a comprendre les bases de l'hebergement sur Vercel.

Il m'a fallu choisir le type de language :

![framework : nextjs](banner-framework-next.png)

Et y inserer les varibales d'environement :

![framework : nextjs](banner-env.png)

j'ai ajouter le fichier **.vercelignore** qui content : `utils` dossier que je ne veux pas heberger sur la partie front.

et bien sur connecté la branche de github que se vera etre deployée

pas de grand difficultées donc.

### Heroku

c'est une autre paire de manche !

Meme chose, connecter la branche voulu, facile.

puis ça se complique dans les variables d'environement :

```
# MongoDB :
USERNAME: ***
PASSWORD: ***
CLUSTER: cluster
DB_DEV: ***
DB_PROD: ***

APOLLO_KEY: service:***
APOLLO_GRAPH_REF: ***@current
APOLLO_SCHEMA_REPORTING: true

PROJECT_PATH: utils
```

les informations renseignée concernant Apollo permetent de travailler sur une interface instanciée en ligne de Graphiql, c'est plutot pratique, les shcemas sont sauvegarés et exportable !

`PROJECT_PATH`.., c'est lui qui m'a causé le plus de difficulté.
Jai pris la decision de travailler sur un Mono-repo, peut etre m'y suis je mal pris, mais j'aime mon architecture simple: le back dans le dossier du front.

Il est dit, sur l'internet, que deployer un dossier dans un dossier c'etait facile, .. que nénie ! il m'a fallu, ajouer cette config : `PROJECT_PATH: utils`
et jouer avec les **BuildPacks**, il y a du bon sens la dedans, pour faire tourner un server node, il faut node, mais ce n'est pas tout. Pour acceder a un dossier dans un dossier racine, ile ne suffit malhereusement pas de "PROJECT_PATH", il faut lui forcer la main avec ce [Buildpack](https://github.com/SirHarveyBix/subdir-heroku-buildpack)

![node, et subdir builpaks](buildpack.png)

et bien sur il ne faut aucun fichier partagé entre les 2 projets.

### Tests et integrations

##### GitHub actions
