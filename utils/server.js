import { ApolloServer } from 'apollo-server';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
const server = new ApolloServer({
  ssrMode: typeof window === 'undefined',
  typeDefs,
  resolvers,
});

// // The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
// // const url = 'http://localhost:4000/api/graphql';

// import { useMemo } from 'react';
// import ApolloClient from '@apollo/client';
// import HttpLink from '@apollo/client';
// import InMemoryCache from '@apollo/client';
// // import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import getConfig from 'next/config.js';

// let apolloClient;
// function createApolloClient() {
//   const { publicRuntimeConfig } = getConfig();
//   const { BACKEND_URL } = publicRuntimeConfig;

//   return new ApolloClient({
//     ssrMode: typeof window === 'undefined',
//     link: new HttpLink({
//       uri: BACKEND_URL,
//       credentials: 'same-origin',
//     }),
//     cache: new InMemoryCache({}),
//   });
// }

// export function initializeApollo(initialState = null) {
//   const _apolloClient = apolloClient ?? createApolloClient();
//   // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract();
//     _apolloClient.cache.restore({ ...existingCache, ...initialState });
//   }
//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === 'undefined') return _apolloClient;
//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;
//   return _apolloClient;
// }
// export function useApollo(initialState) {
//   const store = useMemo(() => initializeApollo(initialState), [initialState]);
//   return store;
// }
