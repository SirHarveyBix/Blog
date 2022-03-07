import styled from 'styled-components';

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

export const AuthContainer = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: var(--color-grey-800);
  text-align: center;
  border-radius: 6px;
`;

export const ContentFrom = styled.form`
  padding: var(--size-4);
`;

export const Title = styled.h3`
  color: white;
  margin: var(--size-2) 0;
  font-size: var(--size-6);
`;

export const Control = styled.div`
  margin-bottom: 0.5rem;
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
`;

export const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  cursor: pointer;
  font: inherit;
  color: white;
  background-color: #9f5ccc;
  border: 1px solid #9f5ccc;
  border-radius: 4px;
  padding: 0.5rem 2.5rem;
  &:hover {
    background-color: #873abb;
    border-color: #873abb;
  }
`;

export const Toogle = styled.button`
  margin-top: 1rem;
  background-color: transparent;
  color: #9f5ccc;
  border: none;
  padding: 0.15rem 1.5rem;
  &:hover {
    background-color: transparent;
    color: #ae82cc;
  }
`;
