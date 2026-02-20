import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
          "py-2 rounded-none border-2 border-slate-200 bg-white shadow-none transition-all flex flex-col h-full min-h-[160px]",
          tool.status !== "coming_soon" && "hover:border-slate-300",
        )}
      >
        <CardHeader className="p-4 pb-2 relative flex flex-row justify-between items-start space-y-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="size-1.5 bg-slate-900 rounded-none relative top-0.5"></span>
              <CardTitle className="text-base font-extrabold text-slate-900 leading-none">
                {tool.name}
              </CardTitle>
            </div>
            <span className="text-[11px] text-slate-500 font-bold ml-[14px]">
              {tool.category}
            </span>
          </div>

          <div className="p-1">
            <img
              src={tool.icon}
              alt={tool.name}
              className={cn(
                "size-8 object-contain",
                tool.status === "coming_soon" && "opacity-50",
              )}
            />
          </div>
        </CardHeader>

        <CardContent className="px-4 py-2 flex-1 flex flex-col">
          <p className="text-[11px] font-semibold text-slate-500 leading-relaxed min-h-[3em] mb-3 flex-1">
            {tool.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tool.services.map((service) => (
              <Badge
                key={service}
                variant="outline"
                className="rounded-none text-[9px] bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors px-2 py-0.5 font-bold uppercase tracking-wider"
              >
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-2 mt-auto">
          {tool.status === "connected" ? (
            <Button
              variant="outline"
              className="w-full rounded-none border-2 border-red-300 text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-400 font-bold text-xs h-9 cursor-pointer transition-all shadow-none"
            >
              <statusConfig.Icon className="mr-1.5 size-4" strokeWidth={2.5} />
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (tool.status === "available") {
                  setIsModalOpen(true);
                }
              }}
              variant="outline"
              className={cn(
                "w-full cursor-pointer rounded-none border-2 font-bold text-xs h-9 transition-all shadow-none",
                tool.status === "available"
                  ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400"
                  : "border-slate-200 text-slate-400 hover:bg-slate-50 cursor-not-allowed",
              )}
              disabled={tool.status === "coming_soon"}
            >
              <statusConfig.Icon
                className="mr-1.5 size-4"
                strokeWidth={tool.status === "available" ? 2.5 : 2}
              />
              {statusConfig.label}
            </Button>
          )}
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
