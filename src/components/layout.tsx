import { Outlet } from "react-router-dom";
import Header from "./header/header";

const Layout = () => {
  return (
    <div className="relative m-5 mt-0">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
