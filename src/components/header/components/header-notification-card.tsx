import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { NOTIFICATION_CARD_ICON_CONFIG } from "../constant/notification-card-icon-config";

interface Props {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

const formatTimeAgo = (isoString: string) => {
  const date = new Date(isoString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

const HeaderNotificationCard = ({
  title,
  type,
  description,
  timestamp,
}: Props) => {
  return (
    <Link to="#" className="w-full">
      <Card className="group gap-3 py-2.5 rounded-md transition-all w-full border-2 border-amber-200 hover:bg-accent cursor-pointer">
        <CardHeader className="px-2.5 gap-1">
          <CardTitle className="text-[11px] font-bold uppercase tracking-tight text-amber-700">
            {title}
          </CardTitle>
          <CardDescription className="text-[10px] tabular-nums">
            {formatTimeAgo(timestamp)}
          </CardDescription>
          <CardAction className="shrink-0">
            <img
              src={NOTIFICATION_CARD_ICON_CONFIG[type]}
              alt={type}
              className="size-7 object-contain rounded bg-white p-1 border border-amber-200"
            />
          </CardAction>
        </CardHeader>
        <CardContent className="px-2.5 text-[13px] leading-snug text-muted-foreground line-clamp-2 prose-strong:text-foreground">
          <ReactMarkdown>{description}</ReactMarkdown>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HeaderNotificationCard;
