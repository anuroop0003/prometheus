import { ArrowRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import EmptyToolState from "./empty-tool-state";
import ToolCard from "./tool-card";

interface ToolSectionProps {
  title: string;
  description: string;
  tools: any[];
  extraHeader?: React.ReactNode;
}

const ToolSection = ({
  title,
  description,
  tools,
  extraHeader,
}: ToolSectionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hasTools = tools.length > 0;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-start border-none pb-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-1.5 bg-slate-900 rounded-none relative top-0.5"></span>
            <h2 className="text-base font-bold tracking-tight text-slate-900">
              {title}
            </h2>
            <div className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-none ml-1 flex items-center justify-center">
              {tools.length}
            </div>
          </div>
          <p className="text-sm text-slate-400 font-medium ml-3.5 leading-none">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {extraHeader}
          {hasTools && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {isExpanded ? "View less" : "View more"}
              {isExpanded ? (
                <ChevronUp className="size-3" />
              ) : (
                <ArrowRight className="size-3" />
              )}
            </button>
          )}
        </div>
      </div>

      <div
        className={
          isExpanded
            ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            : "flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar"
        }
      >
        {hasTools ? (
          tools.map((tool) => (
            <div
              key={tool.id}
              className={
                isExpanded
                  ? "h-full"
                  : "min-w-full md:min-w-[calc(50%-0.5rem)] xl:min-w-[calc(33.333%-11px)] snap-start h-full"
              }
            >
              <ToolCard tool={tool} />
            </div>
          ))
        ) : (
          <EmptyToolState />
        )}
      </div>
    </section>
  );
};

export default ToolSection;
