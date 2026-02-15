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
    title: "Schedule Google Meet",
    description: `
🤖 **I’d like to schedule a meeting for you**

**Invitee:** \`alex.dev@company.com\`  
**Topic:** **Frontend Architecture**  
**Date:** **Tomorrow**  
**Time:** **2:00 PM – 2:30 PM**

Would you like me to create a **Google Meet** invite and send it?
`,
    read: false,
    timestamp: "Just now",
    category: "Calendar",
  },
  {
    id: "consent-2",
    type: "google_chat",
    title: "Send Chat Message",
    description: `
🧠 **I’ve prepared a summary of your sprint meeting**

**Destination:** \`#product-updates\`  
**Content:** Sprint highlights, blockers, and next steps

Should I post this message to **Google Chat** on your behalf?
`,
    read: false,
    timestamp: "5m ago",
    category: "Communication",
  },
  {
    id: "consent-3",
    type: "jira",
    title: "Create Jira Issue",
    description: `
🐞 **I noticed a recurring issue in your logs**

**Project:** **CORE**  
**Issue type:** Bug  
**Priority:** 🔴 **High**  
**Title:** *Fixing Auth Timeout*

Do you want me to create this issue in **Jira**?
`,
    read: false,
    timestamp: "12m ago",
    category: "Development",
  },
  {
    id: "consent-4",
    type: "google_tasks",
    title: "Add to Task List",
    description: `
📌 **I found action items in your last email**

**Suggested task:**  
- **Follow up with HR**

Should I add this to your **Personal Google Tasks** list?
`,
    read: true,
    timestamp: "1h ago",
    category: "Organization",
  },
  {
    id: "consent-5",
    type: "google_tasks",
    title: "Channel Invitation",
    description: `
🔐 **I can help manage access for your team**

**Channel:** \`#internal-security\`  
**Action:** Invite **2 new team members**

Would you like me to send these invitations now?
`,
    read: true,
    timestamp: "2h ago",
    category: "Access",
  },
];

const NotificationMenu = () => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative cursor-pointer focus-visible:ring-0"
        >
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex">
              <span className="animate-ping absolute inline-flex size-3 rounded-full bg-red-400 opacity-75" />
              <Badge className="relative inline-flex rounded-full p-0 size-3 text-[8px]">
                {unreadCount}
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
