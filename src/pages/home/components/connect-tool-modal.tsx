import ErrorToaster from "@/components/toaster/error-toaster";
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
import { useUserProfile } from "@/services/query/login/login.api";
import { useConnectTool } from "@/services/query/subscriptions/subscriptions.api";
import type { Tool } from "@/services/query/tools/tools.types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ConnectToolModalProps {
  tool: Tool;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectToolModal = ({
  tool,
  open,
  onOpenChange,
}: ConnectToolModalProps) => {
  const queryClient = useQueryClient();
  const { data } = useUserProfile();
  const { mutateAsync, isPending } = useConnectTool();

  const handleAuthenticate = async () => {
    if (!tool) return;

    if (!data?.user.isPersonaCreated) {
      toast.custom(
        () => (
          <ErrorToaster
            title="Persona Required"
            description={`Set up your persona to start using ${tool.name}.`}
          />
        ),
        { id: `tool-connect-error-${tool.id}`, unstyled: true },
      );
      return;
    }

    try {
      const provider = tool.services.includes("google") ? "google" : "slack";
      const response = await mutateAsync({ provider, toolId: tool.id });

      if (response?.authUrl) {
        const width = 600;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          response.authUrl,
          "ConnectToolPopup",
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
        );

        window.addEventListener(
          "message",
          (event) => {
            if (event.data.type === "AUTH_SUCCESS") {
              queryClient.invalidateQueries({ queryKey: ["tools"] });
              if (popup) popup.close();
              onOpenChange(false);
              toast.custom(
                () => (
                  <SuccessToaster
                    title="Tool Connected"
                    description={`${tool.name} connected successfully!`}
                  />
                ),
                { id: `tool-connect-success-${tool.id}`, unstyled: true },
              );
            }
          },
          { once: true },
        );
      }
    } catch (error) {
      toast.custom(
        () => (
          <ErrorToaster
            title="Connection Failed"
            description={`Failed to connect ${tool.name}. Please try again.`}
          />
        ),
        { id: `tool-connect-error-${tool.id}`, unstyled: true },
      );
    }
  };

  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-2 border-slate-200 shadow-none bg-white max-w-md">
        <DialogHeader className="mb-2">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-none border-2 border-slate-200 bg-slate-50 p-2 shrink-0">
              <img
                src={tool.icon}
                alt={tool.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-left flex flex-col gap-1">
              <DialogTitle className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                Connect {tool.name}
              </DialogTitle>
              <DialogDescription className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                {tool.category} Integration
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <p className="text-sm font-semibold text-slate-700 leading-relaxed border-l-4 border-slate-900 pl-4">
            {tool.description}
          </p>

          <div className="rounded-none border-2 border-slate-200 bg-slate-50 p-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
              Required Permissions
            </h4>
            <ul className="flex flex-col gap-3">
              {tool.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center text-[11px] font-bold text-slate-700 tracking-wider uppercase"
                >
                  <span className="mr-3 size-2 rounded-none bg-indigo-500 border border-indigo-600" />
                  Full {service.charAt(0).toUpperCase() + service.slice(1)}{" "}
                  Integration
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-6 mt-4 border-t-2 border-slate-100 pt-6">
          <Button
            variant="outline"
            className="cursor-pointer w-30 rounded-none border-2 border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold tracking-widest uppercase shadow-none h-11"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAuthenticate}
            disabled={isPending}
            loading={isPending}
            className="cursor-pointer w-40 rounded-none border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-widest uppercase shadow-none h-11"
          >
            Connect Tool
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectToolModal;
