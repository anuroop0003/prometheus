import { NOTIFICATION_CARD_ICON_CONFIG } from "@/components/header/constant/notification-card-icon-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Props {
  id: string;
  type: string;
  title: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
  read: boolean;
  timestamp: string;
}

const STATUS_CONFIG = {
  pending: {
    border: "border-l-amber-500",
    badge: "Pending",
  },
  accepted: {
    border: "border-l-emerald-500",
    badge: "Completed",
  },
  rejected: {
    border: "border-l-red-500",
    badge: "Dismissed",
  },
};

const formatTimeAgo = (isoString: string) => {
  const date = new Date(isoString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

const NotificationCard = ({
  title,
  type,
  description,
  status,
  read,
  timestamp,
}: Props) => {
  const config = STATUS_CONFIG[status];

  return (
    <Card
      className={cn(
        "relative rounded-md border-0 border-l-4 shadow-custom bg-card",
        config.border,
        !read && "bg-muted/40",
      )}
    >
      {!read && (
        <span className="absolute right-3 top-3 size-2 rounded-full bg-primary" />
      )}

      <CardHeader className="gap-2">
        <CardTitle className="leading-tight">{title}</CardTitle>
        <CardDescription className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(timestamp)}
          </span>
          <Badge className="text-xs rounded-md">{config.badge}</Badge>
        </CardDescription>
        <CardAction>
          <img
            src={NOTIFICATION_CARD_ICON_CONFIG[type]}
            alt={type}
            className="size-10"
          />
        </CardAction>
      </CardHeader>

      <CardContent
        className="pt-0 text-sm text-muted-foreground
        [&_strong]:text-foreground
        [&_code]:rounded
        [&_code]:bg-muted
        [&_code]:px-1
      "
      >
        <ReactMarkdown>{description}</ReactMarkdown>
      </CardContent>

      {!read && (
        <CardFooter className="justify-end gap-3">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCard;
