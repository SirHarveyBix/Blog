import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.URI}`,
    }),
    cache: new InMemoryCache({}),
    defaultOptions: {
      query: {
        // set to 'cache-only' to see if SSR works
        fetchPolicy: 'cache-first',
        // fetchPolicy: 'network-only',
      },
    },
  });
}

export function initializeApollo(
  initialState: Record<string, never> | null = null
): ApolloClient<Record<string, unknown>> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(
  initialState: Record<string, never>
): ApolloClient<Record<string, unknown>> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
