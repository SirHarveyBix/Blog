import FeaturedPosts from '/src/components/homePage/FeaturedPosts/index';
import Hero from '/src/components/homePage/Hero/index';
import Head from 'next/head';

import { FEATURED_POSTS } from '../src/graphql/query';
import { client } from '../src/lib/apolloClient';

function HomePage(props) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Le Blog tech de Guillaume</title>
        <meta name="description" content="programation et developpement" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({ query: FEATURED_POSTS });
  const featuredPosts = data.getFeaturedPosts;

  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate : 1800 ? if not, next wil Never Re build after deployment
  };
}

export default HomePage;
