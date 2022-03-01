import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './schema/resolvers.js';
import typeDefs from './schema/typeDefs.js';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

const server = new ApolloServer({
  ssrMode: typeof window === 'undefined',
  schema,
  plugins: [ApolloServerPluginInlineTrace()],
});

server.listen().then(({ url }) => {
  console.info(`
    🚀  Server is ready at ${url}
    📭  Query at https://studio.apollographql.com/dev
  `);
});
