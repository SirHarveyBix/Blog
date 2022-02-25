import { Container, Title } from './style';
import PostsGrid from '../../posts/PostsGrid';

function FeaturedPosts(props) {
  const { posts } = props;

  return (
    <Container>
      <Title>Featured Posts</Title>
      <PostsGrid posts={posts} />
    </Container>
  );
}
export default FeaturedPosts;
