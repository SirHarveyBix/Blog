## Getting Started

Go to [Railway](https://railway.app/project/0d092608-ec76-4853-824d-c30fd20ac0e4/service/2ea8ed0a-99bc-48ec-9219-13146d5862b8/settings), fill those config var :
settings/Variables :

```v
BUDGET_DB_PROD
AUTH_DB_PROD
DB_PROD:
MONGO_CONNECTION_STRING
```

# OUTDATED

___

## CLI Time 🥳

>first after creating your Heroku account, and installed [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), connect to it :
>`heroku login`
>
>- _a web page should be launched_
><br />
>- _if necessary_ :
>`heroku buildpacks:clear --app your-app`
>`heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app your-app`
>- _this buildpack must be before node_
>`heroku buildpacks:add heroku/nodejs --app your-app`
>- _or whatever buildpack you need for your application_
>`heroku config:set PROJECT_PATH=project/backend --app your-app`
>_pointing to what you want to be a project root here :_ utils
>_you also can set it directly to your Heroku setup_
>`heroku logs --app your-app`
>in case of depployement fails, you may wanna know why ?
>Deploy your project to Heroku, and give a thank to [timanovsky](https://github.com/timanovsky) for his [article](https://medium.com/@timanovsky/heroku-buildpack-to-support-deployment-from-subdirectory-e743c2c838dd)
