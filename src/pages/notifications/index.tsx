import NotificationCard from "./components/card/notification-card";

const Notifications = () => {
  const notifications = [
    {
      id: "consent-1",
      type: "google_meet",
      provider: "google",
      status: "pending",
      title: "Schedule Google Meet",
      description: `
🤖 **I’d like to schedule a meeting for you**

**Invitee:** \`alex.dev@company.com\`  
**Topic:** **Frontend Architecture**  
**Date:** **Tomorrow**  
**Time:** **2:00 PM – 2:30 PM**

Would you like me to create a **Google Meet** invite and send it?
`,
      metadata: {
        meetingType: "google_meet",
        invitees: ["alex.dev@company.com"],
        startTime: "2026-02-16T14:00:00+05:30",
        endTime: "2026-02-16T14:30:00+05:30",
      },
      actions: {
        confirm: "create_meeting",
        cancel: "dismiss",
      },
      read: false,
      timestamp: "Just now",
      category: "Calendar",
    },

    {
      id: "consent-2",
      type: "google_chat",
      provider: "google",
      status: "accepted",
      title: "Chat Message Sent",
      description: `
🧠 **Sprint summary successfully posted**

**Channel:** \`#product-updates\`  
**Content:** Sprint highlights, blockers, and next steps
`,
      metadata: {
        channel: "#product-updates",
        messageId: "chat_89342",
      },
      actions: {},
      read: true,
      timestamp: "5m ago",
      category: "Communication",
    },

    {
      id: "consent-3",
      type: "jira",
      provider: "atlassian",
      status: "pending",
      title: "Create Jira Issue",
      description: `
🐞 **I noticed a recurring issue in your logs**

**Project:** **CORE**  
**Issue type:** Bug  
**Priority:** 🔴 **High**  
**Title:** *Fixing Auth Timeout*

Do you want me to create this issue in **Jira**?
`,
      metadata: {
        projectKey: "CORE",
        issueType: "Bug",
        priority: "High",
        title: "Fixing Auth Timeout",
      },
      actions: {
        confirm: "create_jira_issue",
        cancel: "dismiss",
      },
      read: false,
      timestamp: "12m ago",
      category: "Development",
    },

    {
      id: "consent-4",
      type: "google_tasks",
      provider: "google",
      status: "accepted",
      title: "Task Added to Google Tasks",
      description: `
📌 **Task successfully added**

- **Follow up with HR**
`,
      metadata: {
        taskId: "task_2231",
        list: "Personal",
      },
      actions: {},
      read: true,
      timestamp: "1h ago",
      category: "Organization",
    },

    {
      id: "consent-5",
      type: "google_tasks",
      provider: "google",
      status: "rejected",
      title: "Channel Invitation Declined",
      description: `
🔐 **Access request was declined**

**Channel:** \`#internal-security\`  
**Requested members:** 2
`,
      metadata: {
        channel: "#internal-security",
        requestedCount: 2,
      },
      actions: {},
      read: true,
      timestamp: "2h ago",
      category: "Access",
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Review and manage actions suggested or completed by your AI assistant.
        </p>
      </div>
      {notifications.map((n) => (
        <NotificationCard key={n.id} {...n} />
      ))}
    </section>
  );
};

export default Notifications;
