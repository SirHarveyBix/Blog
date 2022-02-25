import styled from 'styled-components';

export const Container = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'Oswald', sans-serif;
  color: var(--color-grey-100);
  font-size: var(--size-4);
  cursor: pointer;
  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-200);
  }
  @media (min-width: 768px) {
    font-size: var(--size-8);
  }
`;
