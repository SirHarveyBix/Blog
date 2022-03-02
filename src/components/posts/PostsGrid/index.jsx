import PostItem from '../PostItem/index';
import { Container } from './style';

function PostsGrid(props) {
  const { posts } = props;

  return (
    <Container>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </Container>
  );
}
export default PostsGrid;
