import ErrorToaster from "@/components/toaster/error-toaster";
import PendingToaster from "@/components/toaster/pending-toaster";
import SuccessToaster from "@/components/toaster/success-toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useDeclineAction } from "@/services/query/notifications/notifications.api";
import { useState } from "react";
import { toast } from "sonner";

interface DeclineActionModalProps {
  id: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeclineActionModal = ({
  id,
  isOpen,
  onOpenChange,
}: DeclineActionModalProps) => {
  const [remark, setRemark] = useState<string>("");
  const { mutateAsync: declineAction, isPending: isDeclining } =
    useDeclineAction();

  const handleDecline = async () => {
    toast.promise(declineAction({ action_id: id, remark }), {
      icon: null,
      loading: (
        <PendingToaster
          title="Declining Action"
          description="Please wait while the action is declined."
        />
      ),
      success: () => {
        onOpenChange(false);
        setRemark("");
        return (
          <SuccessToaster
            title="Action Declined"
            description="The action has been successfully declined."
          />
        );
      },
      error: () => (
        <ErrorToaster
          title="Decline Failed"
          description="There was a problem declining this action."
        />
      ),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-2 border-slate-200 shadow-none max-w-xl p-6">
        <DialogHeader>
          <DialogTitle className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Decline Action
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-slate-500 mt-2">
            Please provide a reason for declining this action. This context will
            help the AI improve future suggestions.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Enter your reasoning here..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="rounded-none border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-900 focus-visible:ring-offset-0 text-sm font-medium resize-none min-h-[120px] shadow-none"
          />
        </div>
        <DialogFooter className="gap-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-none border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold uppercase tracking-wider text-xs shadow-none px-6 h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDecline}
            disabled={isDeclining || !remark.trim()}
            loading={isDeclining}
            className="w-36 rounded-none bg-red-600 text-white hover:bg-red-700 font-bold uppercase tracking-wider text-xs shadow-none px-6 h-10"
          >
            Submit Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineActionModal;
