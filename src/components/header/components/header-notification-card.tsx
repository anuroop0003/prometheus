import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { NOTIFICATION_CARD_ICON_CONFIG } from "../constant/notification-card-icon-config";

interface NotificationCardProps {
  id: string;
  type: string;
  title: string;
  description: string;
}

const HeaderNotificationCard = ({
  title,
  type,
  description,
}: NotificationCardProps) => {
  return (
    <Card className="w-full py-3 gap-3 bg-amber-600/5 hover:bg-amber-600/10 transition-colors">
      <Link to="#" className=" flex flex-col gap-3">
        <CardHeader className="px-3 flex items-center justify-between gap-6">
          <CardTitle className="text-sm text-amber-600">{title}</CardTitle>
          <CardAction>
            <img
              src={NOTIFICATION_CARD_ICON_CONFIG[type]}
              alt={type}
              className="size-6 object-contain"
            />
          </CardAction>
        </CardHeader>
        <CardContent className="px-3 prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-0">
          <ReactMarkdown>{description}</ReactMarkdown>
        </CardContent>
      </Link>
      <CardFooter className="px-3 justify-end gap-3">
        <Button size="sm" variant="outline" className="h-7 cursor-pointer">
          Cancel
        </Button>
        <Button size="sm" className="h-7 cursor-pointer">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HeaderNotificationCard;
