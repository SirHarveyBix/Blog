import { FunctionComponent } from 'react';

import MainNavigation from './MainNavigation/index';

const Layout: FunctionComponent = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
