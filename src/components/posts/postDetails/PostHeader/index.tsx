import { Post } from '../../type';
import { Header, Picture, Title } from './style';

function PostHeader(props: Post) {
  const { title, image } = props;

  return (
    <Header>
      <Title>{title} </Title>
      <Picture src={image} alt={title} width={250} height={150} />
    </Header>
  );
}
export default PostHeader;
