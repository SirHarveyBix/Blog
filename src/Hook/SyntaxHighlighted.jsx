import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import graphql from 'react-syntax-highlighter/dist/cjs/languages/prism/graphql';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import git from 'react-syntax-highlighter/dist/cjs/languages/prism/git';
import shell from 'react-syntax-highlighter/dist/cjs/languages/prism/powershell';
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/shell-session';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

export default function SyntaxHighlighted({ code: props }) {
  // makes build lighter
  const { className, children } = props;

  let language;

  if (!className) language = 'language-js';
  else language = className.split('-')[1];

  SyntaxHighlighter.registerLanguage('js', js);
  SyntaxHighlighter.registerLanguage('css', css);
  SyntaxHighlighter.registerLanguage('jsx', jsx);
  SyntaxHighlighter.registerLanguage('graphql', graphql);
  SyntaxHighlighter.registerLanguage('bash', bash);
  SyntaxHighlighter.registerLanguage('git', git);
  SyntaxHighlighter.registerLanguage('shell', shell);
  SyntaxHighlighter.registerLanguage('sh', sh);

  return (
    <SyntaxHighlighter style={atomDark} language={language} children={children} showLineNumbers />
  );
}
