import styled from 'styled-components';

export const Spacer = styled.div`
  padding: 44px;
`;
export const Container = styled.section`
  width: 90%;
  max-width: 60rem;
  margin: var(--size-8) auto;
`;

export const Title = styled.h1`
  font-size: var(--size-8);
  color: var(--color-grey-800);
  text-align: center;
  margin-bottom: 0;
  padding-bottom: 0;
  @media (min-width: 768px) {
    font-size: var(--size-16);
  }
`;

export const Control = styled.div`
  min-width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  margin: var(--size-2) 0 var(--size-1) 0;
  cursor: pointer;
`;

export const Input = styled.input`
  font-family: 'Oswald', sans-serif;
  padding: var(--size-1);
  border-radius: 8px;
  width: 45%;
  border: 1px solid var(--color-grey-400);
  background-color: var(--color-grey-50);
  margin: 0 0 10px 0;
  &:placeholder {
    color: --color-grey-100;
  }
`;
