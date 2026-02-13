export const LOG_LEVEL_CONFIG: Record<string, { dot: string; text: string }> = {
  ERROR: {
    dot: "bg-red-500",
    text: "text-red-500",
  },
  INFO: {
    dot: "bg-blue-500",
    text: "text-muted-foreground",
  },
  WARN: {
    dot: "bg-yellow-500",
    text: "text-yellow-600",
  },
  SUCCESS: {
    dot: "bg-green-500",
    text: "text-green-600",
  },
  DEFAULT: {
    dot: "bg-zinc-400",
    text: "text-muted-foreground",
  },
};
