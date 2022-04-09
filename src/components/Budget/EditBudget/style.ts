import Image from 'next/image';
import styled, { css } from 'styled-components';

interface NumberInput {
  isNumberInput?: boolean;
}
export const Control = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Label = styled.label`
  color: white;
`;
export const Input = styled.input<NumberInput>`
  font: inherit;
  background-color: #f1e1fc;
  color: #38015c;
  border-radius: 6px;
  border: 1px solid white;
  width: 170px;
  text-align: left;
  ${({ isNumberInput }) =>
    isNumberInput &&
    css`
      width: 100px;
    `};
`;

export const PlainTextRow = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const PlainText = styled.p`
  justify-content: flex-start;
  width: 120px;
  color: white;
`;

export const EditButton = styled(Image)`
  cursor: pointer;
`;
