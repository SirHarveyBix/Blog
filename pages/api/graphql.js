import { ApolloClient, InMemoryCache } from '@apollo/client';

export const config = { api: { bodyParser: false } };

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  uri: `${process.env.URI}`,
  cache: new InMemoryCache(),
});

export default client;
