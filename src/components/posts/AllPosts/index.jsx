import { useState } from 'react';

import PostsGrid from '../PostsGrid/index';
import { Container, Control, Input, Lablel, Spacer, Title } from './style';

function AllPosts(props) {
  let { posts } = props;
  const [inputQuery, setInputQuery] = useState('');

  if (inputQuery.length > 1 || inputQuery !== '') {
    posts = posts.filter((post) => JSON.stringify(post).includes(inputQuery));
  }

  return (
    <>
      <Spacer />
      <Container>
        <Title>Tout les Posts</Title>
        <Control>
          <Lablel htmlFor="query">rechercher</Lablel>
          <Input
            type="text"
            id="inputQuery"
            required
            value={inputQuery}
            onChange={(event) => setInputQuery(event.target.value)}
          />
        </Control>
        <PostsGrid posts={posts} />
      </Container>
    </>
  );
}
export default AllPosts;
