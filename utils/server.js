import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './schema/resolvers.js';
import typeDefs from './schema/typeDefs.js';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import 'dotenv/config';

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

const server = new ApolloServer({
  ssrMode: typeof window === 'undefined',
  schema,
  plugins: [ApolloServerPluginInlineTrace()],
});

const port = process.env.PORT || 4000;
server.listen({ port: port }).then((port) => {
  console.info(`
    🚀  Server is ready at port ${JSON.stringify(port.port)}
    📭  Query at https://studio.apollographql.com/dev
    🎬  Ready for ${process.env.NODE_ENV} 
  `);
});
