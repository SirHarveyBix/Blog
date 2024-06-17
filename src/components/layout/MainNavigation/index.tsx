import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';

import Logo from '../Logo/index';
import { Button, Container, Header, List } from './style';

const MainNavigation: FunctionComponent = () => {
  const { data: session } = useSession();

  return (
    <Header>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <Container>
          <List>
            <Link href="/hidden/budget">Budget</Link>
          </List>
          <List>
            <Link href="/post">Posts</Link>
          </List>
          <List>
            <Link href="/contact">Contact</Link>
          </List>
          {session && (
            <List>
              <Button type="button" onClick={() => signOut()}>
                Logout
              </Button>
            </List>
          )}
        </Container>
      </nav>
    </Header>
  );
};
export default MainNavigation;
