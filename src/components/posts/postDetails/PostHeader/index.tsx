import { FunctionComponent } from 'react';

import { Header, Picture, Title } from './style';

const PostHeader: FunctionComponent<{ title: string; image: string }> = (props) => {
  const { title, image } = props;

  return (
    <Header>
      <Title>{title} </Title>
      <Picture src={image} alt={title} width={250} height={150} />
    </Header>
  );
};
export default PostHeader;
