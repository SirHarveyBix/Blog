import Link from 'next/link';

import {
  Container,
  Content,
  DateContainer,
  Excerpt,
  ListContainer,
  Picture,
  PictureContainer,
  Title,
} from './style';
import { Post } from '../type';

function PostItem(props: Post) {
  const { title, image, excerpt, date, slug } = props;

  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/post/${slug}`;

  return (
    <ListContainer>
      <Link href={linkPath} passHref>
        <Container>
          <PictureContainer>
            <Picture src={imagePath} alt={title} width={275} height={150} layout="responsive" />
          </PictureContainer>
          <Content>
            <Title>{title}</Title>
            <DateContainer>{formattedDate}</DateContainer>
            <Excerpt>{excerpt}</Excerpt>
          </Content>
        </Container>
      </Link>
    </ListContainer>
  );
}
export default PostItem;
