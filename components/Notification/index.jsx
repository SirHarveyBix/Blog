import { NotificationStatus, Title, Message } from './style';
import ReactDOM from 'react-dom';

function Notification(props) {
  const { title, message, status } = props;

  return ReactDOM.createPortal(
    <>
      <NotificationStatus status={status}>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </NotificationStatus>
    </>,
    document.getElementById('notification')
  );
}

export default Notification;
