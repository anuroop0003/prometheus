import { NOTIFICATION_CARD_ICON_CONFIG } from "@/components/header/constant/notification-card-icon-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUpdateActionStatus } from "@/services/query/notifications/notifications.api";
import type { ActionStatus } from "@/services/query/notifications/notifications.types";
import {
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import EnhanceActionSheet from "./enhance-action-sheet";
import PayloadViewer from "./payload-viewer";

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

const STATUS_CONFIG: Record<
  ActionStatus,
  { border: string; badge: string; icon: any; color: string }
> = {
  pending: {
    border: "border-l-amber-500",
    badge: "Action Required",
    icon: Clock,
    color: "text-amber-600",
  },
  approved: {
    border: "border-l-blue-500",
    badge: "Approved",
    icon: CheckCircle2,
    color: "text-blue-600",
  },
  executing: {
    border: "border-l-purple-500",
    badge: "Executing",
    icon: Loader2,
    color: "text-purple-600",
  },
  completed: {
    border: "border-l-emerald-500",
    badge: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-600",
  },
  failed: {
    border: "border-l-red-600",
    badge: "Failed",
    icon: XCircle,
    color: "text-red-600",
  },
  declined: {
    border: "border-l-slate-400",
    badge: "Declined",
    icon: XCircle,
    color: "text-slate-500",
  },
};

const PRIORITY_CONFIG = {
  high: "bg-red-500/10 text-red-700 border-red-200 animate-pulse",
  medium: "bg-amber-500/10 text-amber-700 border-amber-200",
  low: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  ignore: "bg-slate-500/10 text-slate-600 border-slate-200",
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
  const { mutateAsync, isPending } = useUpdateActionStatus();
  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;

  const [isEnhanceOpen, setIsEnhanceOpen] = useState(false);

  const onAction = async (
    nextStatus: "approved" | "declined",
    overridePayload?: any,
  ) => {
    toast.promise(
      mutateAsync({ id, status: nextStatus, payload: overridePayload }),
      {
        loading: "Updating status...",
        success: `Action ${nextStatus} successfully`,
        error: "Failed to update action",
      },
    );
    if (isEnhanceOpen) setIsEnhanceOpen(false);
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={id}
          className={cn(
            "border rounded-lg mb-2 overflow-hidden transition-all duration-200 bg-card",
            config.border,
            "border-l-4",
          )}
        >
          <AccordionTrigger className="cursor-pointer px-4 py-4 hover:no-underline hover:bg-accent/30">
            <div className="flex w-full items-start justify-between gap-4">
              <div className="flex gap-6">
                <div className="relative mt-1">
                  <img
                    src={NOTIFICATION_CARD_ICON_CONFIG[type]}
                    className="size-8 bg-slate-100 p-1"
                    alt={type}
                  />
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 rounded-full bg-background p-0.5",
                      config.color,
                    )}
                  >
                    <StatusIcon
                      className={cn(
                        "size-3",
                        status === "executing" && "animate-spin",
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <p className="text-sm font-semibold leading-none tracking-tight">
                    {title ?? "Action Request"}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={cn("font-medium", config.color)}>
                      {config.badge}
                    </span>
                    <Separator orientation="vertical" className="h-3" />
                    <span>
                      {new Date(createdAt).toLocaleDateString()} at{" "}
                      {new Date(createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-bold shadow-sm",
                  PRIORITY_CONFIG[priority],
                )}
              >
                {priority.toUpperCase()}
              </Badge>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 pt-2">
              {description && (
                <div className="text-sm leading-relaxed text-foreground/80 bg-muted/30 p-3 rounded-md border">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              )}

              {reasoning && (
                <div className="flex gap-2 text-xs bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/50">
                  <Info className="size-4 text-blue-500 shrink-0" />
                  <div className="italic text-muted-foreground">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 not-italic mr-1">
                      Reasoning:
                    </span>
                    {reasoning}
                  </div>
                </div>
              )}

              <PayloadViewer payload={payload} />

              {status === "pending" && (
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-auto border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-950/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEnhanceOpen(true);
                    }}
                    disabled={isPending}
                  >
                    <Sparkles className="mr-2 size-3" />
                    Enhance
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onAction("declined")}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 size-3 animate-spin" />
                    ) : null}
                    Decline
                  </Button>

                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 shadow-md transition-all active:scale-95"
                    onClick={() => onAction("approved")}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 size-3 animate-spin" />
                    ) : (
                      "Approve Action"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <EnhanceActionSheet
        isOpen={isEnhanceOpen}
        onOpenChange={setIsEnhanceOpen}
        originalPayload={payload}
        isPending={isPending}
        onSave={(editedPayload) => onAction("approved", editedPayload)}
      />
    </>
  );
};

export default NotificationCard;
