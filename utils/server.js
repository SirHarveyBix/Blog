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
    🚀  Server is ready at ${port}
    📭  Query at https://studio.apollographql.com/dev
    🎬  Ready for mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.wyrhp.mongodb.net/${process.env.DB_DEV}?retryWrites=true&w=majority
    👑  process.env.PORT = ${process.env.PORT}
  `);
});
