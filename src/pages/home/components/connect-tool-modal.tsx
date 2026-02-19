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
import { useEffect } from "react";
import { toast } from "sonner";

interface ConnectToolModalProps {
  tool: Tool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TRUSTED_ORIGINS = [
  window.location.origin,
  "http://localhost:4000",
  "https://prometheus-xi-three.vercel.app",
];

const ConnectToolModal = ({
  tool,
  open,
  onOpenChange,
}: ConnectToolModalProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useConnectTool();

  useEffect(() => {
    if (!open || !tool) return;

    const handleMessage = (event: MessageEvent) => {
      if (!TRUSTED_ORIGINS.includes(event.origin)) return;

      if (event.data?.type === "AUTH_SUCCESS") {
        onOpenChange(false);
        toast.success(`${tool.name} connected successfully!`);
        queryClient.invalidateQueries({ queryKey: ["tools"] });
      } else if (event.data?.type === "AUTH_ERROR") {
        toast.error(
          `Failed to connect ${tool.name}: ${event.data.error || "Unknown error"}`,
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [tool, open, onOpenChange, queryClient]);

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

        window.open(
          response.authUrl,
          "ConnectToolPopup",
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
        );
      }
    } catch (error) {
      toast.error("Could not initiate authentication.");
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
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tool.description}
          </p>

          <div className="rounded-lg bg-muted/50 p-4 border border-border">
            <h4 className="text-sm font-semibold mb-2">
              Required Permissions:
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {tool.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center text-xs text-muted-foreground"
                >
                  <span className="mr-2 h-1 w-1 rounded-full bg-primary" />
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
