import { Clock, Power, PowerOff } from "lucide-react";

export const TOOL_STYLE_CONFIG = {
  connected: {
    border: "border-green-500",
    button: "bg-green-600 hover:bg-green-600",
    label: "Disable Tool",
    Icon: PowerOff,
    disabled: false,
  },
  available: {
    border: "border-rose-500",
    button: "bg-rose-600 hover:bg-rose-600",
    label: "Connect Tool",
    Icon: Power,
    disabled: false,
  },
  coming_soon: {
    border: "border-muted",
    button: "bg-yellow-500 hover:bg-yellow-500 cursor-not-allowed",
    label: "Coming Soon",
    Icon: Clock,
    disabled: true,
  },
} as const;
