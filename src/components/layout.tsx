import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  return (
    <div className="relative m-5 mt-0">
      <Header
        user={{
          name: "Anuroop K",
          email: "anuroop@example.com",
          avatarUrl: "/avatar.png",
        }}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
