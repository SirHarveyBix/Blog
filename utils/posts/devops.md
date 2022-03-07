---
title: 'DevOps : Vercel, Heroku, & integration continue'
date: '2022-03-06'
image: next_js_deploy_vercel.png
excerpt: Deployer le Front de ce projet sur Vercel, le back sur Heroku, et tests d'integrations sur github
isFeatured: true
---

## Principe de deploiement

Il existe plusieurs solutions gratuite pour l'hébergement de son site, [Netlify](https://www.netlify.com/), ou encore [GitHubPages](https://pages.github.com/), tous ont leurs avantages et, et inconveignants, j'ai choisi: [Vercel](https://vercel.com/home) pour le front. Etant donné que ce site est développé en Next.js et que Vercel a aussi développé Next.js, j'ai choisi ce dernier

### Vercel

Contrairement à Heroku, je n'ai pas éprouvé de grandes difficultés à comprendre les bases de l'hébergement sur Vercel.

Il m'a fallu choisir le type de langage :

![framework : nextjs](banner-framework-next.png)

Et y insérer les variables d'environnement :

![framework : nextjs](banner-env.png)

j'ai ajouter le fichier **.vercelignore** qui content : `utils` dossier que je ne veux pas héberger sur la partie front.

et bien sur connecté la branche de github que se verra être déployée

pas de grandes difficultées donc.

### Heroku

c'est une autre paire de manches !

Même chose, connecter la branche voulu, facile.

puis ça se complique dans les variables d'environnement :

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

Les informations renseignées concernant Apollo permettent de travailler sur une interface instanciée en ligne de Graphiql, c'est plutôt pratique, les schémas sont sauvegardés et exportables !

`PROJECT_PATH`.., c'est lui qui m'a causé le plus de difficultés.
J'ai pris la décision de travailler sur un Mono-repo, peut être m'y suis je mal pris, mais j'aime mon architecture simple: le back dans le dossier du front.

Il est dit, sur l'internet, que déployer un dossier dans un dossier c'était facile, .. que nenni ! il m'a fallu, ajouter cette config : `PROJECT_PATH: utils`
et jouer avec les **BuildPacks**, il y a du bon sens la dedans, pour faire tourner un server node, il faut node, mais ce n'est pas tout. Pour acceder a un dossier dans un dossier racine, ile ne suffit malhereusement pas de "PROJECT_PATH", il faut lui forcer la main avec ce [Buildpack](https://github.com/SirHarveyBix/subdir-heroku-buildpack)

![node, et subdir builpaks](buildpack.png)

Bien sur il ne faut aucun fichier partagé entre les 2 projets.

### Tests et integration continue (CI)

##### GitHub actions

Les tests d'intégration continue sont géniaux, ils permettent d'exécuter des tâches avant un déploiement, en fonction de sa configuration, en cas d'échecs, le déploiement peut ne pas se faire.

voici celui que j'utilise :

```yml
name: Build - yarn lint & build

on:
  pull_request: { branches: master }
  push: { branches: master }

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      PRODUCTION_URI: ${{ secrets.PRODUCTION_URI }}

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 16.13.0

      - run: npm install -g yarn
      - run: yarn install --frozen-lockfile

      - name: Test if yarn build succeeds
        run: yarn build && echo "👌 yarn build proceeds successfully"

      - name: Test if ESLint succeeds
        run: yarn lint && echo "🥳 ESLint proceeds successfully
```

On installe node sur unbuntu, on lance le server, on build le projet, et on vérifie si ESlint nous a trouvé des erreurs.

j'ai choisi l'url de la production pour récupérer les données, je n'ai pas réussi à lancer les 2 servers.

quoi qu'il en soit .. comme souvent, ici la difficulté a été de mettre en place la variable d'environnement, finalement après quelques recherches, et farfouillage, j'ai trouver a zone : Settings/Security/Secrets/Actions sur GitHub, vous devrez faire vos recherches pour GitLab.
