import Head from 'next/head';
import client from 'pages/api/graphql';
import { FunctionComponent } from 'react';
import AllPosts from 'src/components/posts/AllPosts';
import { Post } from 'src/components/posts/type';
import { ALL_POSTS } from 'src/graphql/query';

const AllPostsPage: FunctionComponent<{ posts: Post[] }> = (props) => {
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
};

export async function getStaticProps() {
  const { data } = await client.query({ query: ALL_POSTS });

  return {
    props: {
      posts: data.getAllPosts,
    },
  };
}

export default AllPostsPage;
