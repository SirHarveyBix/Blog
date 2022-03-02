import PostsGrid from '../PostsGrid/index';
import { Container, Spacer, Title } from './style';

function AllPosts(props) {
  return (
    <>
      <Spacer />
      <Container>
        <Title>Tout les Posts</Title>
        <PostsGrid posts={props.posts} />
      </Container>
    </>
  );
}
export default AllPosts;
