import Head from 'next/head';

import client from '/pages/api/graphql';
import AllPosts from '/src/components/posts/AllPosts';
import { ALL_POSTS } from '/src/graphql/query';

function AllPostsPage(props) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>tout les articles</title>
        <meta name="description" content="liste d'article de developpemennt web, et tuto" />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({ query: ALL_POSTS });

  return {
    props: {
      posts: data.getAllPosts,
    },
  };
}

export default AllPostsPage;
