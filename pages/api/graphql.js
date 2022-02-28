import { ApolloClient, InMemoryCache } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../../utils/schema/typeDefs';
import resolvers from '../../utils/schema/resolvers';
import { applyMiddleware } from 'graphql-middleware';

export const config = { api: { bodyParser: false } };

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  schema,
  uri: 'http://localhost:4000/api/graphql',
  cache: new InMemoryCache(),
});
