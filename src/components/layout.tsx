import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <main className="relative m-5">
      <Outlet />
      <ScrollRestoration />
    </main>
  );
};

export default Layout;
