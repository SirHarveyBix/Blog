import { signIn } from 'next-auth/react';
import { useState } from 'react';

import createUser from '../../../lib/createUser';
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
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });
    } else {
      try {
        const result = await createUser(loginData);
      } catch (error) {
        console.error('error', error);
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
    </>
  );
}
export default AuthCard;
