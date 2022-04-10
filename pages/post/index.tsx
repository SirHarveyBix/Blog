import Head from 'next/head';

import client from 'pages/api/graphql';
import { FunctionComponent, Key, PropsWithChildren, ReactNode } from 'react';
import AllPosts from 'src/components/posts/AllPosts';
import { ALL_POSTS } from 'src/graphql/query';

interface PostProps {
  posts: {
    slug: Key | string;
    title: string;
    image: string;
    excerpt: string;
    date: string;
    __typename?: string;
    isFeatured?: boolean;
    filter: any;
    map(arg0: (post: any) => JSX.Element): ReactNode;
  };
}

const AllPostsPage: FunctionComponent<PropsWithChildren<PostProps>> = (props) => {
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
