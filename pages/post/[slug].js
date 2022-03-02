import Head from 'next/head';

import PostContent from '/src/components/posts/postDetails/PostContent';
import { ALL_POSTS, POST_DETAILS } from '/src/graphql/query';

import { client } from '../api/graphql';

function PostDetailPage(props) {
  const { post } = props;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.excerpt}`} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export async function getStaticProps(context) {
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
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export default PostDetailPage;
