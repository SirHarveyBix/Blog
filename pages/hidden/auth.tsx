import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import AuthCard from 'src/components/AuthCard/index';

import { NotificationContextProvider } from '../../src/components/context/NotificationContext';
import { GetServerSidePropsContext } from 'next';

function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.replace('/hidden/budget');
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
      <NotificationContextProvider>
        <AuthCard />
      </NotificationContextProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/hidden/budget',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Auth;
