import styled, { css } from 'styled-components';

export const Spacer = styled.div`
  padding: 93px;
`;

export const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.5rem;
  align-content: center;
  justify-content: center;
`;

export const ContentFrom = styled.form`
  padding: var(--size-4);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: var(--color-grey-800);
  text-align: center;
  border-radius: 6px;
`;

export const Title = styled.h2`
  color: white;
  margin: 15px 0;
  font-size: var(--size-6);
`;

export const Control = styled.div`
  margin-bottom: 0.5rem;
`;

export const NewLabelControl = styled.div`
  display: flex;
  margin: 1.3rem;
  justify-content: center;
`;
export const Label = styled.label`
  color: white;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  font: inherit;
  background-color: #f1e1fc;
  color: #38015c;
  border-radius: 6px;
  border: 1px solid white;
  width: 100%;
  text-align: left;
  padding: 0.25rem;
  ${({ newInput }) =>
    newInput &&
    css`
      width: 40%;
      margin: auto;
    `};
`;

export const Button = styled.button`
  cursor: pointer;
  font: inherit;
  color: white;
  background-color: #9f5ccc;
  border: 1px solid #9f5ccc;
  border-radius: 4px;
  margin: 12px;
  &:hover {
    background-color: #873abb;
    border-color: #873abb;
  }
  ${({ newInput }) =>
    newInput
      ? css`
          padding: 0.3rem 0.5rem;
        `
      : css`
          padding: 0.5rem 2.5rem;
        `};
`;
