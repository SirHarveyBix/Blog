import { Container, Picture, Content, Spacer } from './style';
import PostHeader from '../PostHeader/index';
import ReactMarkdown from 'react-markdown';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
// makes build lighter
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import graphql from 'react-syntax-highlighter/dist/cjs/languages/prism/graphql';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import git from 'react-syntax-highlighter/dist/cjs/languages/prism/git';
import shell from 'react-syntax-highlighter/dist/cjs/languages/prism/shell-session';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('graphql', graphql);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('git', git);
SyntaxHighlighter.registerLanguage('shell', shell);

function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    // img(image) {
    //   return (
    //     <Picture
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <>
            <Picture
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </>
        );
      }
      return <Content>{paragraph.children}</Content>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1];
      return <SyntaxHighlighter style={atomDark} language={language} children={children} />;
    },
  };

  return (
    <>
      <Spacer />
      <Container>
        <PostHeader title={post.title} image={imagePath} />
        <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
      </Container>
    </>
  );
}

export default PostContent;
