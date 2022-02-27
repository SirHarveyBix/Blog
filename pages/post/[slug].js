import PostContent from '/src/components/posts/postDetails/PostContent';
import Head from 'next/head';
import { client } from '../../src/lib/apolloClient';
import { POST_DETAILS, ALL_POSTS } from '../../src/graphql/query';
// import { getPostData } from '/src/lib/posts-utils';

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

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const { data } = client
    .query({
      query: POST_DETAILS,
      variables: {
        data: {
          slug,
        },
      },
    })
    .then((response) => {
      console.log(response.data.getPostDetails);
      return response.data.getPostDetails;
    });

  console.log(data);

  return {
    props: {
      post: data,
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
