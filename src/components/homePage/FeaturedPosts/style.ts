import styled from 'styled-components';

export const Container = styled.section`
  width: 90%;
  max-width: 80rem;
  margin: var(--size-8) auto;
`;
export const Title = styled.h2`
  font-size: var(--size-8);
  color: var(--color-grey-800);
  text-align: center;
  @media (min-width: 768px) {
    font-size: var(--size-16);
  }
`;
