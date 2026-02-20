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
  const { mutateAsync, isPending } = useConnectTool();

  const handleAuthenticate = async () => {
    if (!tool) return;

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
                { id: `tool-connect-success-${tool.id}` },
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
        { id: `tool-connect-error-${tool.id}` },
      );
    }
  };

  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background p-2">
              <img
                src={tool.icon}
                alt={tool.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl">Connect {tool.name}</DialogTitle>
              <DialogDescription className="text-xs uppercase tracking-wider font-semibold">
                {tool.category}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground leading-relaxed">
            {tool.description}
          </p>

          <div className="rounded-lg bg-muted/50 p-3 border">
            <h4 className="font-semibold mb-2">Required Permissions:</h4>
            <ul className="flex flex-col gap-1.5">
              {tool.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <span className="mr-2 size-1.5 rounded-full bg-primary" />
                  Full {service.charAt(0).toUpperCase() + service.slice(1)}{" "}
                  integration
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-6">
          <Button
            variant="outline"
            className="cursor-pointer w-30"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAuthenticate}
            disabled={isPending}
            loading={isPending}
            className="cursor-pointer w-30"
          >
            Connect Tool
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectToolModal;
