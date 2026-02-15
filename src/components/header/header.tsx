import { Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import NotificationMenu from "./components/notification-menu";
import UserMenu from "./components/user-menu";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 left-0 z-40 bg-white flex items-center justify-between border-b py-5 mb-5 px-6">
      <Link
        to="/home"
        className="flex items-center gap-2 font-semibold text-xl"
      >
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <Workflow className="size-6" />
        </div>
        Prometheus Inc.
      </Link>

      <div className="flex items-center gap-4">
        <NotificationMenu />
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
