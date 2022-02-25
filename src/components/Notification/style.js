import styled from 'styled-components';

export const NotificationStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-grey-100);
  background-color: var(--color-grey-800);
  padding: 0 var(--size-8);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  height: 5rem;
  bottom: 0;
  width: 100%;
  left: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  ${({ status }) =>
    status === 'error'
      ? `
    background-color: var(--color-error-500;`
      : null}
  ${({ status }) =>
    status === 'success'
      ? `
    background-color: var(--color-success-500);
    color: var(--color-grey-800);`
      : null}
@media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
`;

export const Title = styled.h2`
  font-size: var(--size-6);
  margin: 0;
`;
export const Message = styled.p`
  margin: 0;
`;
