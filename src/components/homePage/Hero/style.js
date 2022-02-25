import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.section`
  text-align: center;
  background-image: linear-gradient(to bottom, var(--color-grey-900), var(--color-grey-800));
  padding: var(--size-8) 0;
`;

export const Picture = styled(Image)`
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-grey-700);
  margin: auto;
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: var(--size-16);
  margin: var(--size-4) 0;
  color: var(--color-grey-300);
`;

export const Description = styled.p`
  font-size: var(--size-6);
  color: var(--color-grey-200);
  width: 90%;
  max-width: 40rem;
  margin: auto;
`;

export const Spacer = styled.div`
  padding: 50px;
`;
