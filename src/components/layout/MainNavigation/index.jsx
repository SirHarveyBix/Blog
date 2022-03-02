import Link from 'next/link';

import Logo from '../Logo/index';
import { Container, Header, List } from './style';

function MainNavigation() {
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
        </Container>
      </nav>
    </Header>
  );
}
export default MainNavigation;
