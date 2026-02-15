import { NOTIFICATION_CARD_ICON_CONFIG } from "@/components/header/constant/notification-card-icon-config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface NotificationCardProps {
  id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  read: boolean;
}

const NOTIFICATION_CARD_STATUS_CONFIG: Record<
  string,
  {
    cardClass: string;
    titleClass: string;
    showFooter: boolean;
  }
> = {
  pending: {
    cardClass: "bg-amber-600/10",
    titleClass: "text-amber-600",
    showFooter: true,
  },
  accepted: {
    cardClass: "bg-emerald-600/10",
    titleClass: "text-emerald-600",
    showFooter: false,
  },
  rejected: {
    cardClass: "bg-red-600/10",
    titleClass: "text-red-600",
    showFooter: false,
  },
};

const NotificationCard = ({
  title,
  type,
  description,
  status,
  read,
}: NotificationCardProps) => {
  const config = NOTIFICATION_CARD_STATUS_CONFIG[status];

  return (
    <Card className={cn("gap-3", config.cardClass)}>
      <CardHeader className="flex items-center justify-between gap-6">
        <CardTitle className={config.titleClass}>{title}</CardTitle>
        <CardAction>
          <img
            src={NOTIFICATION_CARD_ICON_CONFIG[type]}
            alt={type}
            className="size-10 object-contain"
          />
        </CardAction>
      </CardHeader>
      <CardContent className="prose max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-0">
        <ReactMarkdown>{description}</ReactMarkdown>
      </CardContent>
      {!read && (
        <CardFooter className="justify-end gap-6">
          <Button size="sm" variant="outline" className="cursor-pointer">
            Cancel
          </Button>
          <Button size="sm" className="cursor-pointer">
            Confirm
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCard;
