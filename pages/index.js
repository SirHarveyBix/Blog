import FeaturedPosts from '/components/homePage/FeaturedPosts/index';
import Hero from '/components/homePage/Hero/index';
import { getFeaturedPosts } from '../lib/posts-utils';
import Head from 'next/head';

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

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate : 1800 ? if not, next wil Never Re build after deployment
  };
}

export default HomePage;
