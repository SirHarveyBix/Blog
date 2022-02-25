const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
require('dotenv').config();

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      extends: ['plugin:@next/next/recommended'],
      env: {
        mongodb_username: process.env.USERNAME,
        mongodb_password: process.env.PASSWORD,
        mongodb_clustername: process.env.CLUSTER,
        mongodb_database: process.env.DB_DEV,
      },
    };
  }
  return {
    reactStrictMode: true,
    extends: ['plugin:@next/next/recommended'],
    env: {
      mongodb_username: process.env.USERNAME,
      mongodb_password: process.env.PASSWORD,
      mongodb_clustername: process.env.CLUSTER,
      mongodb_database: process.env.DB_PROD,
    },
  };
};
