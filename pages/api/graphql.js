import { ApolloClient, InMemoryCache } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';

import resolvers from '../../utils/schema/resolvers';
import typeDefs from '../../utils/schema/typeDefs';

export const config = { api: { bodyParser: false } };

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  schema,
  uri: `${process.env.URI}`,
  cache: new InMemoryCache(),
});
