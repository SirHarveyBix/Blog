import PostContent from '../../components/posts/postDetails/PostContent';
import { getPostData, getPostsFiles } from '../../lib/posts-utils';
import Head from 'next/head';

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
  const postDetail = getPostData(slug);

  return {
    props: {
      post: postDetail,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: 'blocking',
  };
}

export default PostDetailPage;
