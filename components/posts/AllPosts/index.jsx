import { Container, Title, Spacer } from './style';
import PostsGrid from '../PostsGrid/index';

function AllPosts(props) {
  return (
    <>
      <Spacer />
      <Container>
        <Title>All Posts</Title>
        <PostsGrid posts={props.posts} />
      </Container>
    </>
  );
}
export default AllPosts;
