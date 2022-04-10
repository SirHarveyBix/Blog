import Head from 'next/head';

import client from 'pages/api/graphql';
import PostContent from 'src/components/posts/postDetails/PostContent';
import { PostProps } from 'src/components/posts/type';
import { ALL_POSTS, POST_DETAILS } from 'src/graphql/query';

const PostDetailPage = (props: PostProps) => {
  const { post } = props;
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={`${post?.excerpt}`} />
      </Head>
      <PostContent {...post} />
    </>
  );
};

interface PostSlug {
  slug: string;
}

export async function getStaticProps(context: { params: PostSlug }) {
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
    paths: allPosts.map((post: PostSlug) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export default PostDetailPage;
