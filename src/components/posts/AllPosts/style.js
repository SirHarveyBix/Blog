import styled from 'styled-components';

export const Container = styled.section`
  width: 90%;
  max-width: 60rem;
  margin: var(--size-8) auto;
`;

export const Title = styled.h1`
  font-size: var(--size-8);
  color: var(--color-grey-800);
  text-align: center;
  @media (min-width: 768px) {
    font-size: var(--size-16);
  }
`;

export const Spacer = styled.div`
  padding: 48px;
`;

export const Lablel = styled.label`
  display: block;
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  margin: var(--size-2) 0 var(--size-1) 0;
`;

export const Input = styled.input`
  font: inherit;
  padding: var(--size-1);
  border-radius: 4px;
  width: 100%;
  border: 1px solid var(--color-grey-400);
  background-color: var(--color-grey-50);
  resize: none;
`;

export const Control = styled.div`
  flex: 1;
  min-width: 10rem;
`;
