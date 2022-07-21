import { FunctionComponent, PropsWithChildren } from 'react';

import MainNavigation from './MainNavigation/index';

const Layout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
