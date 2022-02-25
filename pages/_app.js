import Layout from '/components/layout/Layout';
import GlobalStyle from '/components/GlobalStyle/index';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Head>
          <meta name="viewport" content={'width=device-width, initial-scale=1'} />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
