https://medium.com/@timanovsky/heroku-buildpack-to-support-deployment-from-subdirectory-e743c2c838dd

heroku buildpacks:clear if necessary
heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
heroku buildpacks:add heroku/nodejs or whatever buildpack you need for your application
heroku config:set PROJECT_PATH=projects/nodejs/frontend pointing to what you want to be a project root.
Deploy your project to Heroku.

settings/config vars :
APOLLO_GRAPH_REF:  
APOLLO_KEY:  
APOLLO_SCHEMA_REPORTING:
CLUSTER:  
DB_DEV:  
DB_PROD:  
PASSWORD:  
PROJECT_PATH: utils
USERNAME:
