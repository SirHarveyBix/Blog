import { SessionProviderProps } from 'next-auth/react';
import { FunctionComponent } from 'react';

import MainNavigation from './MainNavigation/index';

const Layout: FunctionComponent<SessionProviderProps> = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
