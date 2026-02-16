import HeaderNotificationCard from "@/components/header/components/header-notification-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: "consent-1",
    type: "google_meet",
    title: "Google Meet",
    description:
      "Schedule **Frontend Architecture** with alex.dev tomorrow at 2:00 PM?",
    timestamp: new Date().toISOString(),
  },
  {
    id: "consent-2",
    type: "google_chat",
    title: "Google Chat",
    description: "Post the **Sprint Meeting summary** to #product-updates?",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "consent-3",
    type: "jira",
    title: "Jira",
    description: `
    🐞 **I noticed a recurring issue in your logs**

**Project:** **CORE**  
**Issue type:** Bug  
**Priority:** 🔴 **High**  
**Title:** *Fixing Auth Timeout*

Do you want me to create this issue in **Jira**?
`,
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
  },
  {
    id: "consent-4",
    type: "google_tasks",
    title: "Google Tasks",
    description: "Add **'Follow up with HR'** to your personal task list?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

const NotificationMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative cursor-pointer focus-visible:ring-0"
        >
          <Bell />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 flex">
              <span className="animate-ping absolute inline-flex size-3 rounded-full bg-red-400 opacity-75" />
              <Badge className="relative inline-flex rounded-full p-0 size-3 text-[8px]">
                {notifications.length}
              </Badge>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-120">
        <DropdownMenuLabel className="text-base">
          AI Action Center
        </DropdownMenuLabel>

        <ScrollArea className="h-[70vh]">
          <div className="space-y-3">
            {notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="px-3 py-0 focus:bg-transparent"
              >
                <HeaderNotificationCard {...n} />
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>

        <DropdownMenuItem asChild>
          <Button
            size="sm"
            variant="link"
            className="w-full text-xs cursor-pointer hover:underline hover:underline-offset-2 hover:text-primary! focus-visible:ring-0"
            onClick={() => navigate("/notifications")}
          >
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
