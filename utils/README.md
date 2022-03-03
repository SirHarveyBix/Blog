## Getting Started

go to [Heroku](https://dashboard.heroku.com/apps), fill thoses config var :
settings/config vars :

```v
APOLLO_GRAPH_REF:
APOLLO_KEY: service:
APOLLO_SCHEMA_REPORTING: true
CLUSTER:
DB_DEV:
DB_PROD:
PASSWORD:
PROJECT_PATH: utils
USERNAME:
```

### CLI Time 🥳

first after creating your Heroku account, and installed [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), connect to it :

`heroku login`

- _a web page should be launched_

  <br />

- _if necessary_ :
  `heroku buildpacks:clear --app your-app`

` heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app your-app`

- _this buildpack must be before node_

`heroku buildpacks:add heroku/nodejs --app your-app`

- _or whatever buildpack you need for your application_

`heroku config:set PROJECT_PATH=project/backend --app your-app`

_pointing to what you want to be a project root here :_ utils
_you also can set it directly to your Heroku setup_

`heroku logs --app your-app`
in case of depployement fails, you may wanna know why ?

Deploy your project to Heroku, and give a thank to [timanovsky](https://github.com/timanovsky) for his [article](https://medium.com/@timanovsky/heroku-buildpack-to-support-deployment-from-subdirectory-e743c2c838dd)

##### Procfile

you must add a file you'll name **Procfile** insert into : `web: node server.js`
it says : _"Hey ! launch server.js with node !"_

finally on Heroku : Settings / Deploy, you must choose a git branch to connect on,
