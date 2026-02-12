export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  services: string[];
  status: ToolStatus;
}

export type ToolStatus = "connected" | "coming_soon" | "available";

export const CONNECTED_TOOLS = [
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description:
      "Collaborate with your team through chat, meetings, and real-time notifications.",
    category: "Communication",
    icon: "/icons/Microsoft_Office_Teams.svg",
    services: ["microsoft", "chat", "meetings", "notifications"],
    status: "connected",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description:
      "Send and receive emails and manage your calendar in one place.",
    category: "Email & Calendar",
    icon: "/icons/Microsoft_Office_Outlook.svg",
    services: ["microsoft", "email", "calendar"],
    status: "connected",
  },
  {
    id: "microsoft-todo",
    name: "Microsoft To Do",
    description: "Organize tasks, set reminders, and track your daily to-dos.",
    category: "Task Management",
    icon: "/icons/Microsoft_To-Do.svg",
    services: ["microsoft", "tasks", "reminders"],
    status: "connected",
  },
];

export const AVAILABLE_TOOLS = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Send, receive, and manage emails using your Google account.",
    category: "Email",
    icon: "/icons/Google_Gmail.svg",
    services: ["google", "email"],
    status: "coming_soon",
  },
  {
    id: "google-meet",
    name: "Google Meet",
    description: "Host secure video meetings and collaborate in real time.",
    category: "Meetings",
    icon: "/icons/Google_Meet.svg",
    services: ["google", "meetings", "video"],
    status: "coming_soon",
  },
  {
    id: "google-tasks",
    name: "Google Tasks",
    description: "Create and track tasks directly from your Google workspace.",
    category: "Task Management",
    icon: "/icons/Google_Tasks.svg",
    services: ["google", "tasks", "reminders"],
    status: "available",
  },
  {
    id: "google-chat",
    name: "Google Chat",
    description:
      "Communicate with your team through direct messages and spaces.",
    category: "Communication",
    icon: "/icons/Google_Chat.svg",
    services: ["google", "chat", "messaging"],
    status: "coming_soon",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Schedule events and manage your calendar across devices.",
    category: "Calendar",
    icon: "/icons/Google_Calendar.svg",
    services: ["google", "calendar", "events"],
    status: "available",
  },
];
