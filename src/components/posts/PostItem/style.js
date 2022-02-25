import styled from 'styled-components';
import Image from 'next/image';

export const ListContainer = styled.li`
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: var(--color-grey-800);
  text-align: center;
  border-radius: 6px;
`;

export const Container = styled.a`
  color: var(--color-grey-100);
`;

export const PictureContainer = styled.div`
  width: 100%;
  max-height: 20rem;
  overflow: hidden;
`;

export const Picture = styled(Image)`
  border-radius: 6px 6px 0 0;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: var(--size-4);
`;

export const Title = styled.h3`
  margin: var(--size-2) 0;
  font-size: var(--size-6);
`;

export const DateContainer = styled.time`
  font-style: italic;
  color: var(--color-grey-300);
`;

export const Excerpt = styled.p`
  line-height: var(--size-6);
`;
