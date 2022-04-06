import { ElementType, FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighted from 'src/Hook/SyntaxHighlighted';

import PostHeader from '../PostHeader/index';
import { Container, Content, Picture, Spacer } from './style';
import { Post } from '../../type';

const PostContent: FunctionComponent<Post> = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers: { [nodeType: string]: ElementType } = {
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        const imageFormat = image.properties.src.split('-')[0];

        return (
          <>
            <Picture
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={imageFormat === 'banner' ? 650 : 600}
              height={imageFormat === 'banner' ? 70 : 300}
            />
          </>
        );
      }
      return <Content>{paragraph.children}</Content>;
    },

    code(code) {
      return <SyntaxHighlighted code={code} />;
    },
  };

  return (
    <>
      <Spacer />
      <Container>
        <PostHeader {...post} image={imagePath} />
        <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
      </Container>
    </>
  );
};

export default PostContent;
