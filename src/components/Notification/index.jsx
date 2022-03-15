import { useContext } from 'react';

import { NotificationContext } from '../context/NotificationContext';
import { Message, NotificationStatus, Title } from './style';

function Notification() {
  const { notification } = useContext(NotificationContext);

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
}

export default Notification;
