import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart3, LogOut, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 z-40 bg-white flex items-center justify-between border-b py-5 mb-5">
      <div className="flex items-center gap-2 font-semibold text-xl">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <Workflow className="size-6" />
        </div>
        Prometheus Inc.
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
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
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigate("/analytics")}
            className="cursor-pointer"
          >
            <BarChart3 />
            Analytics
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer"
            // onClick={onLogout}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
