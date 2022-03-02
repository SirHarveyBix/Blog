const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      extends: ['plugin:@next/next/recommended'],
      env: {
        URI: 'http://localhost:4000/',
      },
    };
  }
  return {
    reactStrictMode: true,
    extends: ['plugin:@next/next/recommended'],
    env: {
      URI: 'https://bloggql.herokuapp.com/',
    },
  };
};
