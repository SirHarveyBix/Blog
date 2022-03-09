import Head from 'next/head';

import AuthCard from '/src/components/hidden/AuthCard/index';

function Auth() {
  return (
    <>
      <Head>
        <title>La connection</title>
        <meta name="description" content="login" />
      </Head>
      <AuthCard />
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       posts: data.getFeaturedPosts,
//     },
//   };
// }

export default Auth;
