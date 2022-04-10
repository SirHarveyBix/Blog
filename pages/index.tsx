import Head from 'next/head';

import client from 'pages/api/graphql';
import { Key, ReactNode } from 'react';
import FeaturedPosts from 'src/components/homePage/FeaturedPosts/index';
import Hero from 'src/components/homePage/Hero/index';
import { FEATURED_POSTS } from 'src/graphql/query';
import { initializeApollo } from 'src/lib/apolloClient';

export interface Posts extends Post {
  filter: () => unknown;
  map(arg0: (post: Post) => JSX.Element): ReactNode;
}
interface Post {
  slug: Key | string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  content: string;
  __typename: string;
  isFeatured: boolean;
  posts: Posts;
  post: Post;
}

function HomePage(posts: JSX.IntrinsicAttributes & Post & { children?: ReactNode }) {
  return (
    <>
      <Head>
        <title>Le Blog tech de Guillaume</title>
        <meta name="description" content="programation et developpement" />
      </Head>
      <Hero />
      <FeaturedPosts {...posts} />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await client.query({ query: FEATURED_POSTS });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      posts: data.getFeaturedPosts,
    },
    revalidate: 1,
    // revalidate : 1800 ? if not, next wil Never Re build after deployment
  };
}

export default HomePage;
