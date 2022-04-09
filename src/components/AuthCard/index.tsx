import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent, FunctionComponent, useContext, useRef, useState } from 'react';

import createUserRoute from '../../lib/createUser';
import { NotificationContext } from '../context/NotificationContext';
import { NotificationContextType } from '../context/type';
import Notification from '../Notification';
import {
  Actions,
  AuthContainer,
  Button,
  Container,
  ContentFrom,
  Control,
  Input,
  Label,
  Spacer,
  Title,
  Toogle,
} from './style';
import { UserAuth } from './type';

const AuthCard: FunctionComponent = () => {
  const router = useRouter();
  const { setRequestStatus } = useContext(NotificationContext) as NotificationContextType;
  const [isLogin, setIsLogin] = useState(false);

  const enteredEmail = useRef<HTMLInputElement>(null);
  const enteredPassword = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (isLogin) {
      try {
        setRequestStatus('pending');
        // TODO remove | any
        const result: UserAuth | any = await signIn('credentials', {
          redirect: false,
          email: enteredEmail.current!.value,
          password: enteredPassword.current!.value,
        });
        setRequestStatus('connected');
        if (result.error) {
          +console.error(result!.error);
          setRequestStatus('wrongPassword');
        }
        if (!result.error) router.push('/hidden/budget');
      } catch (error) {
        console.error(error);
      }
    }

    if (!isLogin) {
      try {
        setRequestStatus('pending');
        await createUserRoute({
          email: enteredEmail.current!.value,
          password: enteredPassword.current!.value,
        });
        setRequestStatus('userCreated');
        setIsLogin(!isLogin);
        return;
      } catch (error) {
        console.error(error);
        setRequestStatus('userExists');
      }
    }
  };

  return (
    <>
      <Spacer />
      <Container>
        <AuthContainer>
          <ContentFrom onSubmit={submitHandler}>
            <Title>{isLogin ? 'Connection' : 'Creer un compte'}</Title>
            <Control>
              <Label htmlFor="email">Email</Label>
              <Input ref={enteredEmail} type="email" id="email" required />
            </Control>
            <Control>
              <Label htmlFor="password">Password</Label>
              <Input ref={enteredPassword} type="password" id="password" required />
            </Control>
            <Actions>
              <Button type="button">{isLogin ? 'Connection' : 'Creer un compte'}</Button>
              <Toogle type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Creer un nouveau compte' : 'Se connecter'}
              </Toogle>
            </Actions>
          </ContentFrom>
        </AuthContainer>
      </Container>
      <Notification />
    </>
  );
};
export default AuthCard;
