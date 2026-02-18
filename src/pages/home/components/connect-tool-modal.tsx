import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import api from "@/services/instance/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ConnectToolModalProps {
    tool: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ConnectToolModal = ({ tool, open, onOpenChange }: ConnectToolModalProps) => {
    const [isAuthenticating, setIsAuthenticating] = React.useState(false);
    const queryClient = useQueryClient();

    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Check if the message comes from a trusted origin (backend or same origin)
            // In dev, we allow localhost:4000. In prod, this should be the backend URL.
            const trustedOrigins = [window.location.origin, "http://localhost:4000", "https://prometheus-xi-three.vercel.app"];
            if (!trustedOrigins.includes(event.origin)) {
                console.warn("[ConnectToolModal] Blocking message from untrusted origin:", event.origin);
                return;
            }

            if (event.data?.type === "AUTH_SUCCESS") {
                setIsAuthenticating(false);
                onOpenChange(false);
                toast.success(`${tool.name} connected successfully!`);
                queryClient.invalidateQueries({ queryKey: ["tools"] });
            } else if (event.data?.type === "AUTH_ERROR") {
                setIsAuthenticating(false);
                toast.error(`Failed to connect ${tool.name}: ${event.data.error}`);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [tool, onOpenChange, queryClient]);

    const handleAuthenticate = async () => {
        setIsAuthenticating(true);
        try {
            let authEndpoint = `/google/auth?toolId=${tool.id}`;
            if (tool.id === "slack") {
                authEndpoint = `/tools/slack/auth?toolId=${tool.id}`;
            }

            const response = await api.get(authEndpoint);
            if (response.data?.authUrl) {
                const width = 600;
                const height = 700;
                const left = window.screen.width / 2 - width / 2;
                const top = window.screen.height / 2 - height / 2;

                window.open(
                    response.data.authUrl,
                    "Connect Tool",
                    `width=${width},height=${height},left=${left},top=${top}`
                );
            }
        } catch (error) {
            console.error("Failed to get auth URL:", error);
            toast.error("Failed to start authentication.");
            setIsAuthenticating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <img src={tool.icon} alt={tool.name} className="size-12 object-contain" />
                        <div>
                            <DialogTitle>Connect {tool.name}</DialogTitle>
                            <DialogDescription>{tool.category}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-6">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <div className="mt-4 rounded-md bg-muted p-4">
                        <h4 className="text-sm font-medium">Access required:</h4>
                        <ul className="mt-2 text-xs text-muted-foreground list-disc list-inside space-y-1">
                            {tool.services.map((service: string) => (
                                <li key={service} className="capitalize">{service} access</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isAuthenticating}>
                        Cancel
                    </Button>
                    <Button onClick={handleAuthenticate} disabled={isAuthenticating}>
                        {isAuthenticating ? "Waiting for Auth..." : "Authenticate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConnectToolModal;
