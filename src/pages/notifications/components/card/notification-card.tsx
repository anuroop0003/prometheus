import { NOTIFICATION_CARD_ICON_CONFIG } from "@/components/header/constant/notification-card-icon-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import * as React from "react";

import { useUpdateActionStatus } from "@/services/query/notifications/notifications.api";
import type { ActionStatus } from "@/services/query/notifications/notifications.types";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, AlertCircle, Clock } from "lucide-react";

interface Props {
  id: string;
  type: string;
  title?: string;
  description?: string;
  status: ActionStatus;
  priority: "high" | "medium" | "low" | "ignore";
  payload: any;
  reasoning?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<ActionStatus, { border: string; badge: string; color: string; bg: string }> = {
  pending: {
    border: "border-l-amber-500",
    badge: "Action Required",
    color: "text-amber-600",
    bg: "bg-amber-500",
  },
  approved: {
    border: "border-l-blue-500",
    badge: "Approved",
    color: "text-blue-600",
    bg: "bg-blue-500",
  },
  executing: {
    border: "border-l-purple-500",
    badge: "Executing...",
    color: "text-purple-600",
    bg: "bg-purple-500",
  },
  completed: {
    border: "border-l-emerald-500",
    badge: "Completed",
    color: "text-emerald-600",
    bg: "bg-emerald-500",
  },
  failed: {
    border: "border-l-red-600",
    badge: "Failed",
    color: "text-red-600",
    bg: "bg-red-600",
  },
  declined: {
    border: "border-l-slate-400",
    badge: "Declined",
    color: "text-slate-500",
    bg: "bg-slate-500",
  },
};

const PRIORITY_CONFIG = {
  high: { label: "High Priority", color: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "Low", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ignore: { label: "Low", color: "bg-slate-100 text-slate-700 border-slate-200" },
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
  id,
  title,
  type,
  description,
  status,
  priority,
  payload,
  reasoning,
  createdAt,
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const config = STATUS_CONFIG[status];
  const priorityConfig = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
  const { mutateAsync: updateStatus, isPending } = useUpdateActionStatus();

  const handleAction = async (newStatus: "approved" | "declined", e: React.MouseEvent) => {
    e.stopPropagation();
    toast.promise(updateStatus({ id, status: newStatus }), {
      loading: `${newStatus === "approved" ? "Approving" : "Declining"} action...`,
      success: `Action ${newStatus === "approved" ? "approved" : "declined"} successfully!`,
      error: `Failed to ${newStatus === "approved" ? "approve" : "decline"} action.`,
    });
  };

  const isPendingStatus = status === "pending";

  return (
    <Card
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "relative cursor-pointer transition-all duration-300 overflow-hidden border-0 border-l-4 shadow-custom bg-card hover:shadow-md",
        config.border,
        isPendingStatus && "hover:bg-muted/30",
        expanded ? "ring-1 ring-primary/10" : "",
      )}
    >
      {isPendingStatus && (
        <span className="absolute right-3 top-3 size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
      )}

      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-base font-bold leading-tight tracking-tight">
              {title || "Action Request"}
            </CardTitle>
            <Badge variant="outline" className={cn("text-[10px] uppercase font-bold px-1.5 py-0 border", priorityConfig.color)}>
              {priorityConfig.label}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <Clock className="size-3" />
              {formatTimeAgo(createdAt)}
            </div>
            <span className="size-1 rounded-full bg-muted-foreground/30" />
            <span className={cn("text-xs font-semibold", config.color)}>{config.badge}</span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-muted/30 p-1.5 rounded-lg border border-muted/50">
            <img
              src={NOTIFICATION_CARD_ICON_CONFIG[type] || "/icons/default-action.svg"}
              alt={type}
              className="size-8 object-contain drop-shadow-sm"
            />
          </div>
          <div className="p-1 hover:bg-muted rounded-full transition-colors">
            {expanded ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div className="text-[13px] text-foreground/90 leading-relaxed max-w-4xl">
          <ReactMarkdown
            components={{
              strong: ({ node, ...props }) => <strong className="text-foreground font-bold" {...props} />,
              code: ({ node, ...props }) => <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-xs" {...props} />,
            }}
          >
            {description || ""}
          </ReactMarkdown>
        </div>

        {expanded && (
          <div className="mt-4 space-y-5 pt-4 border-t border-dashed animate-in fade-in slide-in-from-top-2 duration-300">
            {reasoning && (
              <div className="bg-primary/[0.03] rounded-xl p-4 border border-primary/10 relative overflow-hidden group text-card-foreground">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="size-4 text-primary" />
                  <h4 className="text-xs font-bold text-primary uppercase tracking-tighter">AI Reasoning</h4>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed italic">
                  "{reasoning}"
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2 px-1">
                Action Parameters
                <div className="flex-1 h-[1px] bg-muted" />
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(payload || {}).map(([key, value]) => (
                  <div key={key} className="bg-muted/40 rounded-lg p-3 border border-muted/80 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{key.replace(/_/g, ' ')}</span>
                    <span className="text-xs text-foreground font-medium break-all">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {isPendingStatus && (
        <CardFooter
          className="justify-end gap-3 pt-2 pb-5 pr-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-semibold transition-all"
            onClick={(e) => handleAction("declined", e)}
            disabled={isPending}
          >
            Decline
          </Button>
          <Button
            size="sm"
            className={cn("text-white font-bold shadow-md px-8 h-9 transition-all active:scale-95", config.bg, "hover:opacity-90")}
            onClick={(e) => handleAction("approved", e)}
            disabled={isPending}
          >
            Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCard;
