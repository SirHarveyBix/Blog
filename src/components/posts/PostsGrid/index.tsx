import { FunctionComponent } from 'react';

import PostItem from '../PostItem/index';
import { Post, Posts } from '../type';
import { Container } from './style';

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
