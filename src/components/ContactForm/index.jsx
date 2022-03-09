import { useState } from 'react';

import sendContactData from '/src/lib/sendContactData';

import Notification from '../Notification/index';
import {
  Actions,
  Button,
  Container,
  Control,
  Controls,
  Input,
  Lablel,
  Spacer,
  Title,
} from './style';

function ContactForm() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [enteredData, setEnteredData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
          <Notification requestStatus={requestStatus} requestError={requestError} />
        </form>
      </Container>
    </>
  );
}
export default ContactForm;
