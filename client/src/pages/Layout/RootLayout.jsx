import { Outlet } from 'react-router-dom';

const RootLayout = () => (
  <div id="lms-root" >
    <Outlet />
  </div>
);

export default RootLayout;