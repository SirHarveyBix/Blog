import { Posts, Post } from '../type';
import PostItem from '../PostItem/index';
import { Container } from './style';
import { FunctionComponent } from 'react';

const PostsGrid: FunctionComponent<Posts> = (props): JSX.Element => {
  const { posts }: Posts = props;

  return (
    <Container>
      {posts.map((post: Post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </Container>
  );
};
export default PostsGrid;
