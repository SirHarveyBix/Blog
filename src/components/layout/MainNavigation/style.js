import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 6rem;
  background-color: var(--color-grey-900);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
`;

export const Container = styled.ul`
  list-style: none;
  display: flex;
  align-items: baseline;
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    gap: 0.5rem;
  }
`;

export const List = styled.li`
  a {
    color: var(--color-grey-100);
  }
  font-size: var(--size-4);
  margin: 0 var(--size-4);
  &:hover,
  &:active {
    color: var(--color-grey-200);
  }
`;
