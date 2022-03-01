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
import sendContactData from '/src/lib/sendContactData';
import Notification from '../Notification/index';

function ContactForm() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [enteredData, setEnteredData] = useState({
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
      await sendContactData({ ...enteredData });
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
      title: 'Envoi de votre message',
      message: "Votre message est en cours d'envoi",
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Message envoyé.',
      message: 'Votre a bien été envoyé',
    };
  }
  if (requestError) {
    notification = {
      status: 'error',
      title: 'Erreur !',
      message: requestError,
    };
  }

  return (
    <>
      <Spacer />
      <Container>
        <Title>Vous voulez me contacter ?</Title>
        <form onSubmit={sendMessageHandler}>
          <Controls>
            <Control>
              <Lablel htmlFor="email">Email</Lablel>
              <Input
                type="email"
                id="email"
                required
                value={enteredData.email}
                onChange={(event) => setEnteredData({ ...enteredData, email: event.target.value })}
              />
            </Control>
            <Control>
              <Lablel htmlFor="name">Nom</Lablel>
              <Input
                tag={'input'}
                type="text"
                id="name"
                required
                value={enteredData.name}
                onChange={(event) => setEnteredData({ ...enteredData, name: event.target.value })}
              />
            </Control>
            <Control>
              <Lablel htmlFor="message">Message</Lablel>
              <Input
                as="textarea"
                id="message"
                rows="5"
                required
                value={enteredData.message}
                onChange={(event) =>
                  setEnteredData({ ...enteredData, message: event.target.value })
                }
              />
            </Control>
            <Actions>
              <Button>Envoyer</Button>
            </Actions>
          </Controls>
          {notification && <Notification {...notification} />}
        </form>
      </Container>
    </>
  );
}
export default ContactForm;
