import Head from 'next/head';
import client from 'pages/api/graphql';
import { FunctionComponent } from 'react';
import FeaturedPosts from 'src/components/homePage/FeaturedPosts/index';
import Hero from 'src/components/homePage/Hero/index';
import { Post } from 'src/components/posts/type';
import { FEATURED_POSTS } from 'src/graphql/query';
import { initializeApollo } from 'src/lib/apolloClient';

const HomePage: FunctionComponent<{ posts: Post[] }> = (props) => {
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
};

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
