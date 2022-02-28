import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './schema/resolvers';
import typeDefs from './schema/typeDefs';

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

const server = new ApolloServer({
  ssrMode: typeof window === 'undefined',
  schema,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
