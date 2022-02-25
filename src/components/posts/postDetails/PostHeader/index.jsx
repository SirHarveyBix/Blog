import { Header, Picture, Title } from './style';

function PostHeader(props) {
  const { title, image } = props;

  return (
    <Header>
      <Title>{title} </Title>
      <Picture src={image} alt={title} width={200} height={150} />
    </Header>
  );
}
export default PostHeader;
