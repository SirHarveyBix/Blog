import Image from 'next/image';
import { FunctionComponent, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import PostsGrid from '../PostsGrid/index';
import { OnClickRef, Post, Posts } from '../type';
import { Container, Control, Input, Lablel, Spacer, Title } from './style';

const AllPosts: FunctionComponent<Posts> = (props): JSX.Element => {
  let { posts } = props;
  const [inputQuery, setInputQuery] = useState('');
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [lensRef, setLensRef] = useState<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (inputQuery!.length > 1 || inputQuery !== '') {
    posts = posts.filter((post: Post) =>
      JSON.stringify(post).toLowerCase().includes(inputQuery.toLowerCase())
    );
  }

  useOnClickOutside(inputRef, (event) => {
    if (isInputOpen && lensRef !== event.target && !inputQuery) setIsInputOpen(false);
  });

  return (
    <>
      <Spacer />
      <Container>
        <Title>Tout les Posts</Title>
        <Control>
          <Lablel htmlFor="query" onClick={() => setIsInputOpen(!isInputOpen)}>
            <Image
              onClick={(event: OnClickRef) => setLensRef(event.target)}
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
};
export default AllPosts;
