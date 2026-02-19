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
import type { Tool } from "@/services/query/tools/tools.types";
import { useState } from "react";
import { TOOL_STYLE_CONFIG } from "../constant/tool-style.config";
import ConnectToolModal from "./connect-tool-modal";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const statusConfig = TOOL_STYLE_CONFIG[tool.status];

  return (
    <>
      <Card
        className={cn(
          "border-2 transition-shadow",
          statusConfig.border,
          tool.status !== "coming_soon" && "hover:shadow-custom",
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
                variant="outline"
                className="rounded-sm text-xs capitalize border-indigo-500 text-indigo-500"
              >
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => {
              if (tool.status === "available") {
                setIsModalOpen(true);
              }
            }}
            className={cn("w-full cursor-pointer", statusConfig.button)}
            disabled={tool.status === "coming_soon"}
          >
            <statusConfig.Icon />
            {statusConfig.label}
          </Button>
        </CardFooter>
      </Card>

      <ConnectToolModal
        tool={tool}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};
export default ToolCard;
