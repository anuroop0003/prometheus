import { useActions } from "@/services/query/notifications/notifications.api";
import EmptyNotificationState from "./components/empty-notification-state";
import NotificationCard from "./components/notification-card";
import { NotificationsHeader } from "./components/notifications-header";

const Notifications = () => {
  const { data: actions, isLoading } = useActions();

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <NotificationsHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground animate-pulse font-bold tracking-widest text-xs uppercase">
            Loading notifications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <NotificationsHeader />
      <section className="space-y-4 max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
            Notifications
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-sm">
            Actions suggested or completed by your AI assistant
          </p>
        </header>

        {actions && actions.length > 0 ? (
          actions.map((action) => (
            <NotificationCard key={action._id} {...action} id={action._id} />
          ))
        ) : (
          <EmptyNotificationState />
        )}
      </section>
    </div>
  );
};

export default Notifications;
