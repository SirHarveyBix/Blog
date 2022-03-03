import Image from 'next/image';
import { useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import PostsGrid from '../PostsGrid/index';
import { Container, Control, Input, Lablel, Spacer, Title } from './style';
function AllPosts(props) {
  let { posts } = props;
  const [inputQuery, setInputQuery] = useState('');
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [lensRef, setLensRef] = useState(null);
  const inputRef = useRef();

  if (inputQuery.length > 1 || inputQuery !== '') {
    posts = posts.filter((post) =>
      JSON.stringify(post).toLowerCase().includes(inputQuery.toLowerCase())
    );
  }

  useOnClickOutside(inputRef, (e) => {
    if (isInputOpen && lensRef !== e.target && !inputQuery) setIsInputOpen(false);
  });

  return (
    <>
      <Spacer />
      <Container>
        <Title>Tout les Posts</Title>
        <Control>
          <Lablel htmlFor="query" onClick={() => setIsInputOpen(!isInputOpen)}>
            <Image
              onClick={() => setLensRef(event.target)}
              src="/images/site/glass.png"
              alt="search"
              width={50}
              height={50}
            />
          </Lablel>
          {isInputOpen && (
            <Input
              ref={inputRef}
              type="text"
              id="inputQuery"
              required
              value={inputQuery}
              onChange={(event) => setInputQuery(event.target.value)}
              placeholder="exemple: git"
            />
          )}
        </Control>
        <PostsGrid posts={posts} />
      </Container>
    </>
  );
}
export default AllPosts;
