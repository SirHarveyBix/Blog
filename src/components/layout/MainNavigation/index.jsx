import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import Logo from '../Logo/index';
import { Button, Container, Header, List } from './style';

function MainNavigation() {
  const { data: session, status } = useSession();
  console.log('MainNavigation : session', session);

  return (
    <Header>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <Container>
          <List>
            <Link href="/post">Posts</Link>
          </List>
          <List>
            <Link href="/contact">Contact</Link>
          </List>
          {session && (
            <List>
              <Button onClick={signOut}>Logout</Button>
            </List>
          )}
        </Container>
      </nav>
    </Header>
  );
}
export default MainNavigation;
