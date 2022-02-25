import {
  Container,
  Actions,
  Button,
  Control,
  Controls,
  Input,
  Title,
  Lablel,
  Spacer,
} from './style';
import { useState, useEffect } from 'react';
import Notification from '../Notification/index';

const sendContactData = async (contactDetails) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
};

function ContactForm() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [entertedData, setEnteredData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    setRequestStatus('pending');

    try {
      await sendContactData({ ...entertedData });
      setRequestStatus('success');
      setEnteredData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  };

  let notification = null;
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way',
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Message sent.',
      message: 'Message sent successfully',
    };
  }
  if (requestError) {
    notification = {
      status: 'error',
      title: 'Error !',
      message: requestError,
    };
  }

  return (
    <>
      <Spacer />
      <Container>
        <Title>Want to reach me ?</Title>
        <form onSubmit={sendMessageHandler}>
          <Controls>
            <Control>
              <Lablel htmlFor="email">Your Email</Lablel>
              <Input
                type="email"
                id="email"
                required
                value={entertedData.email}
                onChange={(event) => setEnteredData({ ...entertedData, email: event.target.value })}
              />
            </Control>
            <Control>
              <Lablel htmlFor="name">Your Name</Lablel>
              <Input
                tag={'input'}
                type="text"
                id="name"
                required
                value={entertedData.name}
                onChange={(event) => setEnteredData({ ...entertedData, name: event.target.value })}
              />
            </Control>
            <Control>
              <Lablel htmlFor="message">Your Message</Lablel>
              <Input
                as="textarea"
                id="message"
                rows="5"
                required
                value={entertedData.message}
                onChange={(event) =>
                  setEnteredData({ ...entertedData, message: event.target.value })
                }
              />
            </Control>
            <Actions>
              <Button>Send Message</Button>
            </Actions>
          </Controls>
          {notification && <Notification {...notification} />}
        </form>
      </Container>
    </>
  );
}
export default ContactForm;
