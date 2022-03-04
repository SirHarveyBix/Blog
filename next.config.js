const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
require('dotenv').config();

const commonnRules = {
  reactStrictMode: true,
  extends: ['plugin:@next/next/recommended'],
  eslint: { dirs: ['src'] },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...commonnRules,
      env: {
        URI: process.env.DEVELOPMENT_URI,
      },
    };
  }
  return {
    ...commonnRules,
    env: {
      URI: process.env.PRODUCTION_URI,
    },
  };
};
