import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 1.3rem;
  justify-content: center;
  width: 500px;
`;
export const Label = styled.label`
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  width: 120px;
`;

export const Input = styled.input`
  font: inherit;
  background-color: #f1e1fc;
  color: #38015c;
  border-radius: 6px;
  border: 1px solid white;
  width: 200px;
  text-align: left;
  padding: 0.25rem;
`;

export const ValidButton = styled(Image)`
  cursor: pointer;
  width: 17px;
  height: 37px;
`;

export const Button = styled.button`
  cursor: pointer;
  font: inherit;
  padding: 0.5rem 2.5rem;
  color: white;
  background-color: #9f5ccc;
  border: 1px solid #9f5ccc;
  border-radius: 6px;
  margin: 12px;
  &:hover {
    background-color: #873abb;
    border-color: #873abb;
  }
`;
