import Link from 'next/link';
import { FunctionComponent } from 'react';

import { Post } from '../type';
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

const PostItem: FunctionComponent<{ post: Post }> = (props) => {
  const { title, image, excerpt, date, slug } = props.post;

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
            <Picture src={imagePath} alt={title} width={275} height={150} />
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
};
export default PostItem;
