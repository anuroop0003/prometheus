import NotificationCard from "./components/card/notification-card";

const Notifications = () => {
  const notifications = [
    {
      id: "consent-1",
      type: "google_meet",
      status: "pending",
      title: "Schedule Google Meet",
      description:
        "🤖 **I’d like to schedule a meeting for you**\n\n**Invitee:** `alex.dev@company.com`\n**Topic:** **Frontend Architecture**\n**Date:** **Tomorrow**\n**Time:** **2:00 PM – 2:30 PM**",
      read: false,
      timestamp: "2026-02-16T12:50:00.000Z",
    },
    {
      id: "consent-2",
      type: "google_chat",
      status: "accepted",
      title: "Chat Message Sent",
      description:
        "🧠 **Sprint summary successfully posted**\n\n**Channel:** `#product-updates`",
      read: true,
      timestamp: "2026-02-16T12:45:00.000Z",
    },
    {
      id: "consent-3",
      type: "jira",
      status: "pending",
      title: "Create Jira Issue",
      description:
        "🐞 **Recurring issue detected**\n\n**Project:** CORE\n**Priority:** 🔴 High",
      read: false,
      timestamp: "2026-02-16T12:38:00.000Z",
    },
    {
      id: "consent-4",
      type: "google_tasks",
      status: "accepted",
      title: "Task Added to Google Tasks",
      description: "📌 **Task successfully added**\n\n- Follow up with HR",
      read: true,
      timestamp: "2026-02-16T11:55:00.000Z",
    },
    {
      id: "consent-5",
      type: "google_tasks",
      status: "rejected",
      title: "Channel Invitation Declined",
      description:
        "🔐 **Access request declined**\n\nChannel: `#internal-security`",
      read: true,
      timestamp: "2026-02-16T10:55:00.000Z",
    },
  ];

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Actions suggested or completed by your AI assistant
        </p>
      </header>

      {notifications.map((n) => (
        <NotificationCard key={n.id} {...n} />
      ))}
    </section>
  );
};

export default Notifications;
