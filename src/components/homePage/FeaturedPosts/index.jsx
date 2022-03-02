import PostsGrid from '../../posts/PostsGrid';
import { Container, Title } from './style';

function FeaturedPosts(props) {
  const { posts } = props;

  return (
    <Container>
      <Title>Posts mis en avant</Title>
      <PostsGrid posts={posts} />
    </Container>
  );
}
export default FeaturedPosts;
