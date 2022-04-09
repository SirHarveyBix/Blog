import { FormEvent, useContext, useState } from 'react';
import sendContactData from 'src/lib/sendContactData';

import { NotificationContext } from '../context/NotificationContext';
import { NotificationContextType } from '../context/type';
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
  Textarea,
} from './style';

function ContactForm() {
  const { setRequestStatus } = useContext(NotificationContext) as NotificationContextType;
  const [enteredData, setEnteredData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const sendMessageHandler = async (event: FormEvent) => {
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
                type="text"
                id="name"
                required
                value={enteredData.name}
                onChange={(event) => setEnteredData({ ...enteredData, name: event.target.value })}
              />
            </Control>
            <Control>
              <Lablel htmlFor="message">Message</Lablel>
              <Textarea
                id="message"
                rows={5}
                required
                value={enteredData.message}
                onChange={(event) =>
                  setEnteredData({ ...enteredData, message: event.target.value })
                }
              />
            </Control>
            <Actions>
              <Button type="button">Envoyer</Button>
            </Actions>
          </Controls>
          <Notification />
        </form>
      </Container>
    </>
  );
}
export default ContactForm;
