import AllPosts from '/src/components/posts/AllPosts';
import Head from 'next/head';
import { ALL_POSTS } from '../../src/graphql/query';
import { client } from '../../src/lib/apolloClient';

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
  const allPosts = data.getAllPosts;

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
