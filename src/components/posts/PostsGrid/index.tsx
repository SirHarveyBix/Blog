import { FunctionComponent } from 'react';
import PostItem from '../PostItem/index';
import { Post } from '../type';
import { Container } from './style';

const PostsGrid: FunctionComponent<{ posts: Post[] }> = (props): JSX.Element => {
  const { posts } = props;
  return (
    <Container>
      {posts.map((post: Post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </Container>
  );
};
export default PostsGrid;
