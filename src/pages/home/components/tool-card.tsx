import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TOOL_STYLE_CONFIG } from "../constant/tool-style.config";
import type { Tool } from "../constant/tools.config";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const statusConfig = TOOL_STYLE_CONFIG[tool.status];

  return (
    <Card
      className={cn(
        "border-2 transition-shadow",
        statusConfig.border,
        tool.status !== "coming_soon" && "hover:shadow-custom cursor-pointer",
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg">{tool.name}</CardTitle>
        <CardDescription className="-mt-2.5 text-xs text-muted-foreground">
          {tool.category}
        </CardDescription>

        <CardAction>
          <img
            src={tool.icon}
            alt={tool.name}
            className={cn(
              "size-10 object-contain",
              tool.status === "coming_soon" && "opacity-50",
            )}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3em]">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2.5">
          {tool.services.map((service) => (
            <Badge
              key={service}
              variant="secondary"
              className="rounded-sm text-xs capitalize"
            >
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          // disabled={statusConfig.disabled}
          className={cn("w-full gap-2 cursor-pointer", statusConfig.button)}
        >
          <statusConfig.Icon className="size-4" />
          {statusConfig.label}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
