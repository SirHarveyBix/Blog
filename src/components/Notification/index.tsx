import { FunctionComponent, useContext } from 'react';

import { NotificationContext } from '../context/NotificationContext';
import { NotificationContextType } from '../context/type';
import { Message, NotificationStatus, Title } from './style';

const Notification: FunctionComponent = (): JSX.Element => {
  const { notification } = useContext(NotificationContext) as NotificationContextType;

  return (
    <>
      {notification && (
        <NotificationStatus status={notification.status}>
          <Title>{notification.title}</Title>
          <Message>{notification.message}</Message>
        </NotificationStatus>
      )}
    </>
  );
};

export default Notification;
