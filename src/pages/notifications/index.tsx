import NotificationCard from "./components/card/notification-card";

import { useActions } from "@/services/query/notifications/notifications.api";

const Notifications = () => {
  const { data: actions, isLoading } = useActions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground animate-pulse">
          Loading notifications...
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Actions suggested or completed by your AI assistant
        </p>
      </header>

      {actions?.map((action) => (
        <NotificationCard key={action._id} {...action} id={action._id} />
      ))}
    </section>
  );
};

export default Notifications;
