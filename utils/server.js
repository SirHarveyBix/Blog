import 'dotenv/config';

import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { applyMiddleware } from 'graphql-middleware';

import executableSchema from './schema/loadSchema.js';

const schema = applyMiddleware(executableSchema);

const server = new ApolloServer({
  ssrMode: typeof window === 'undefined',
  schema,
  plugins: [
    ApolloServerPluginInlineTrace({
      rewriteError: (error) => console.error(error.message.match(SENSITIVE_REGEX) ? null : error),
    }),
    ApolloServerPluginLandingPageProductionDefault({ footer: false }),
  ],
});

const port = process.env.PORT || 4000;
server.listen({ port: port }).then((port) => {
  console.info(`
    🚀  Server is ready at port ${JSON.stringify(port.port)}
    📭  Query at https://studio.apollographql.com/graph/${process.env.APOLLO_GRAPH_REF}
    🎬  Ready for ${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'} 
  `);
});
