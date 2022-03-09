import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import AuthCard from '/src/components/AuthCard/index';

function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.push('/');
      else setIsLoading(false);
    });
  }, [router]);

  if (isLoading) return <p>Loading ...</p>;

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
