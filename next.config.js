const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
require('dotenv').config();

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      extends: ['plugin:@next/next/recommended'],
      env: {
        URI: process.env.DEVELOPMENT_URI,
      },
    };
  }
  return {
    reactStrictMode: true,
    extends: ['plugin:@next/next/recommended'],
    env: {
      URI: process.env.PRODUCTION_URI || secrets.PRODUCTION_URI,
    },
  };
};
