import { signIn } from 'next-auth/react';
import { useState } from 'react';

import createUserRoute from '../../../lib/createUser';
import Notification from '../../Notification/index';
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

function AuthCard(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      try {
        setRequestStatus('pending');
        const result = await signIn('credentials', {
          redirect: false,
          email: loginData.email,
          password: loginData.password,
        });
        setRequestStatus('connected');
        if (result.error) setRequestStatus('wrongPassword');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        setRequestStatus('pending');
        const result = await createUserRoute(loginData);
        setRequestStatus('userCreated');
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
              <Input
                type="email"
                id="email"
                onChange={(event) => setLoginData({ ...loginData, email: event.target.value })}
                required
              />
            </Control>
            <Control>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                required
              />
            </Control>
            <Actions>
              <Button>{isLogin ? 'Connection' : 'Creer un compte'}</Button>
              <Toogle type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Creer un nouveau compte' : 'Se connecter'}
              </Toogle>
            </Actions>
          </ContentFrom>
        </AuthContainer>
      </Container>
      <Notification requestStatus={requestStatus} />
    </>
  );
}
export default AuthCard;
