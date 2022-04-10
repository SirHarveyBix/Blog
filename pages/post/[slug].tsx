import Head from 'next/head';

import client from 'pages/api/graphql';
import { FunctionComponent, Key, ReactNode } from 'react';
import PostContent from 'src/components/posts/postDetails/PostContent';
import { ALL_POSTS, POST_DETAILS } from 'src/graphql/query';

interface PostProps extends Posts {
  post: PostProps;
  slug: Key | string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  content: string;
  __typename?: string;
  isFeatured?: boolean;
}

export interface Posts {
  posts: {
    filter: any;
    map(arg0: (post: PostProps) => JSX.Element): ReactNode;
  };
}

const PostDetailPage: FunctionComponent<PostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.excerpt}`} />
      </Head>
      <PostContent {...post} />
    </>
  );
};

export async function getStaticProps(context: { params: { slug: string } }) {
  const { params } = context;
  const { slug } = params;

  const { data } = await client.query({
    query: POST_DETAILS,
    variables: {
      data: {
        slug,
      },
    },
  });

  return {
    props: {
      post: data.getPostDetails,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_POSTS });
  const allPosts = data.getAllPosts;

  return {
    paths: allPosts.map((post: PostProps) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export default PostDetailPage;
