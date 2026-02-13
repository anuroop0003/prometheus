import { cn } from "@/lib/utils";
import { LOG_LEVEL_CONFIG } from "../constant/log-level-config";

type LogLevelBadgeProps = {
  level: string;
};

const LogLevelBadge = ({ level }: LogLevelBadgeProps) => {
  const config =
    LOG_LEVEL_CONFIG[level as keyof typeof LOG_LEVEL_CONFIG] ??
    LOG_LEVEL_CONFIG.DEFAULT;

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full transition-all",
          config.dot,
        )}
      />
      <span
        className={cn(
          "text-[10px] font-bold tracking-widest uppercase",
          config.text,
        )}
      >
        {level ?? "UNKNOWN"}
      </span>
    </div>
  );
};

export default LogLevelBadge;
