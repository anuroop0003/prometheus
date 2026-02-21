import ErrorToaster from "@/components/toaster/error-toaster";
import PendingToaster from "@/components/toaster/pending-toaster";
import SuccessToaster from "@/components/toaster/success-toaster";
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
import { useApproveAction } from "@/services/query/notifications/notifications.api";
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
import { NOTIFICATION_CARD_ICON_CONFIG } from "../constant/notification-card-icon-config";
import DeclineActionModal from "./decline-action-modal";
import EnhanceActionSheet from "./enhance-action-sheet";
import PayloadViewer from "./payload-viewer";

interface Props {
  id: string;
  source: string;
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
  high: "bg-red-50 text-red-700 border-red-200 animate-pulse",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ignore: "bg-slate-50 text-slate-600 border-slate-200",
};

const NotificationCard = ({
  id,
  source,
  title,
  type,
  description,
  status,
  priority,
  payload,
  reasoning,
  createdAt,
  ...rest
}: Props & { [key: string]: any }) => {
  const fullAction = {
    id,
    source,
    title,
    type,
    description,
    status,
    priority,
    payload,
    reasoning,
    createdAt,
    ...rest,
  };

  const { mutateAsync: approveAction, isPending } = useApproveAction();

  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;

  const [isEnhanceOpen, setIsEnhanceOpen] = useState<boolean>(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState<boolean>(false);

  const onAction = async (nextStatus: "approved" | "declined") => {
    if (nextStatus === "approved") {
      toast.promise(approveAction({ action_id: id, source, type }), {
        icon: null,
        loading: (
          <PendingToaster
            title="Approving Action"
            description="Please wait while the action is processed."
          />
        ),
        success: () => {
          setIsEnhanceOpen(false);
          return (
            <SuccessToaster
              title="Action Approved"
              description="The action has been approved successfully."
            />
          );
        },
        error: () => (
          <ErrorToaster
            title="Approval Failed"
            description="There was a problem approving this action."
          />
        ),
      });
    }
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={id}
          className={cn(
            "border-2 border-slate-200 rounded-none mb-3 overflow-hidden bg-white shadow-none",
            config.border,
            "border-l-[6px]",
          )}
        >
          <AccordionTrigger className="cursor-pointer px-5 py-5 hover:no-underline hover:bg-slate-50 transition-colors">
            <div className="flex w-full items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="relative">
                  <img
                    src={NOTIFICATION_CARD_ICON_CONFIG[type]}
                    className="size-10 bg-slate-100 p-1.5 border border-slate-200 rounded-none"
                    alt={type}
                  />
                  <div
                    className={cn(
                      "absolute -bottom-1.5 -right-1.5 rounded-none bg-white p-0.5 border border-slate-200",
                      config.color,
                    )}
                  >
                    <StatusIcon
                      className={cn(
                        "size-4",
                        status === "executing" && "animate-spin",
                      )}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left ml-2">
                  <p className="text-base font-extrabold leading-none tracking-tight text-slate-900">
                    {title ?? "Action Request"}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <span className={cn(config.color)}>{config.badge}</span>
                    <Separator
                      orientation="vertical"
                      className="h-3 bg-slate-300"
                    />
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
                  "text-[10px] font-bold uppercase tracking-wider shadow-none rounded-none border-2 px-2.5 py-1",
                  PRIORITY_CONFIG[priority],
                )}
              >
                {priority}
              </Badge>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-5 pb-5">
            <div className="space-y-4 pt-2">
              {description && (
                <div className="text-xs bg-slate-50 p-4 border-2 border-slate-200 text-slate-700 font-semibold leading-relaxed">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              )}

              {reasoning && (
                <div className="flex gap-3 text-xs bg-indigo-50/50 p-4 border-2 border-indigo-100 items-start">
                  <Info
                    className="size-4 text-indigo-500 shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <div className="text-slate-600 font-medium leading-relaxed">
                    <span className="font-bold text-indigo-700 uppercase tracking-widest mr-2 inline-block text-[10px]">
                      Reasoning
                    </span>
                    {reasoning}
                  </div>
                </div>
              )}

              <PayloadViewer payload={payload} />

              {status === "pending" && (
                <div className="flex flex-col sm:flex-row justify-end gap-6 pt-4 border-t-2 border-slate-100 mt-4">
                  <Button
                    variant="outline"
                    className="sm:mr-auto rounded-none border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 font-bold uppercase tracking-wider text-xs h-10 px-5 shadow-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEnhanceOpen(true);
                    }}
                    disabled={isPending}
                  >
                    <Sparkles className="mr-2 size-4" strokeWidth={2.5} />
                    Enhance
                  </Button>

                  <Button
                    variant="outline"
                    className="w-30 rounded-none border-2 border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700 font-bold uppercase tracking-wider text-xs h-10 px-6 shadow-none transition-colors"
                    onClick={() => setIsDeclineOpen(true)}
                    disabled={isPending}
                  >
                    Decline
                  </Button>

                  <Button
                    className="w-30 rounded-none border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800 font-bold uppercase tracking-wider text-xs h-10 px-8 shadow-none transition-colors"
                    onClick={() => onAction("approved")}
                    disabled={isPending}
                    loading={isPending}
                  >
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <EnhanceActionSheet
        actionId={id}
        type={type}
        isOpen={isEnhanceOpen}
        onOpenChange={setIsEnhanceOpen}
        originalAction={fullAction}
        isPending={isPending}
        onSave={() => onAction("approved")}
      />

      <DeclineActionModal
        id={id}
        isOpen={isDeclineOpen}
        onOpenChange={setIsDeclineOpen}
      />
    </>
  );
};

export default NotificationCard;
