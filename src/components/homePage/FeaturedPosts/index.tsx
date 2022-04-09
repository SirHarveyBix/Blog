import { FunctionComponent, PropsWithChildren } from 'react';
import PostsGrid from '../../posts/PostsGrid';
import { Container, Title } from './style';
import { Post } from './type';

const FeaturedPosts: FunctionComponent<Post> = (props: PropsWithChildren<Post>): JSX.Element => {
  const { posts } = props;

  return (
    <Container>
      <Title>Posts mis en avant</Title>
      <PostsGrid posts={posts} />
    </Container>
  );
};
export default FeaturedPosts;
