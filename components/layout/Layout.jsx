import MainNavigation from './MainNavigation/index';

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}
export default Layout;
