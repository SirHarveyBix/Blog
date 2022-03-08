import Head from 'next/head';
import { getSession } from 'next-auth/react';

import AuthCard from '/src/components/hidden/AuthCard/index';

function Auth() {
  const findSession = getSession().then((session) => console.log(session));
  console.log(findSession);

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
