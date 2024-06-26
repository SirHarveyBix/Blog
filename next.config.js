/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
require('dotenv').config();

const commonRules = {
  reactStrictMode: true,
  eslint: { dirs: ['src'] },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...commonRules,
      env: {
        URI: process.env.DEVELOPMENT_URI,
      },
    };
  }
  return {
    ...commonRules,
    env: {
      URI: process.env.PRODUCTION_URI,
    },
  };
};
