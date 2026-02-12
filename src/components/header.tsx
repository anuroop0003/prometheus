import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Workflow } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 left-0 bg-white flex items-center justify-between border-b py-5 mb-5">
      <div className="flex items-center gap-2 self-center font-semibold leading-0 text-xl">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <Workflow className="size-6" />
        </div>
        Prometheus Inc.
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <Avatar className="size-10">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <Button
          variant="ghost"
          size="icon"
          // onClick={onLogout}
          className="hover:bg-white text-destructive hover:text-destructive cursor-pointer"
          aria-label="Logout"
        >
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default Header;
