import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/services/query/login/login.api";
import { BarChart3, Bell, LogOut, User, Workflow } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { data: profile } = useUserProfile();
  const userName = profile?.user?.name || "User";

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground",
    );

  return (
    <header className="sticky top-0 left-0 z-40 bg-white flex items-center justify-between border-b py-5 mb-5">
      <div className="flex items-center gap-10">
        <Link
          to="/home"
          className="flex items-center gap-2 font-semibold text-xl"
        >
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <Workflow className="size-6" />
          </div>
          Prometheus Inc.
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/analytics" className={navClass}>
            <BarChart3 className="size-4" />
            Analytics
          </NavLink>
          <NavLink to="/persona" className={navClass}>
            <User className="size-4" />
            Persona
          </NavLink>
          <NavLink to="/notifications" className={navClass}>
            <Bell className="size-4" />
            Notifications
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {profile?.user?.email}
            </p>
          </div>
          <Avatar className="size-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="h-6 w-px bg-border"></div>
        <NavLink
          to="/login"
          className={navClass}
          onClick={() => localStorage.clear()}
        >
          <LogOut className="size-4" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
