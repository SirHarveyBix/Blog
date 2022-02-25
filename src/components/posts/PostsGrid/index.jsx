import { Container } from './style';
import PostItem from '../PostItem/index';

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
