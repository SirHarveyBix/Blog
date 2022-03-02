on Heroku mind to fill thoses config var :
settings/config vars :

```
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

then :
first after creating your Heroku account, then connect yo it :

```
heroku login
```

_a web page should be launched_

```
heroku buildpacks:clear --app your-app
```

_if necessary_

```
heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app your-app
```

_this buildpack must be before node_

```
heroku buildpacks:add heroku/nodejs  --app your-app
```

_or whatever buildpack you need for your application_

```
heroku config:set PROJECT_PATH=projects/nodejs/frontend --app your-app
```

_pointing to what you want to be a project root here :_ utils
_set it directly to your Heroku setup_

```
heroku logs --app your-app
```

_in case any depployement fails, you may wanna know why ?_

Deploy your project to Heroku, and give a thank to [timanovsky](https://github.com/timanovsky) for his [article](https://medium.com/@timanovsky/heroku-buildpack-to-support-deployment-from-subdirectory-e743c2c838dd)
