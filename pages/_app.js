import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import GlobalStyle from '/src/components/GlobalStyle/index';
import Layout from '/src/components/layout/Layout';
import { useApollo } from '/src/lib/apolloClient';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { session } = pageProps;

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <Head>
          <meta name="viewport" content={'width=device-width, initial-scale=1'} />
        </Head>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
