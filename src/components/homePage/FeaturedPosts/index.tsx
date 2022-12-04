import { FunctionComponent } from 'react';
import { Post } from 'src/components/posts/type';
import PostsGrid from '../../posts/PostsGrid';
import { Container, Title } from './style';

const FeaturedPosts: FunctionComponent<{ posts: Post[] }> = (props): JSX.Element => {
  const { posts } = props;
  return (
    <Container>
      <Title>Posts mis en avant</Title>
      <PostsGrid posts={posts} />
    </Container>
  );
};
export default FeaturedPosts;
