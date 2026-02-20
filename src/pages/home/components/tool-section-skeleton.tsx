import { ToolCardSkeleton } from "./tool-card-skeleton";

export function ToolSectionSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-start border-none pb-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-1.5 bg-slate-200 rounded-none relative top-0.5"></span>
            <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-none" />
            <div className="h-4 w-6 bg-slate-200 animate-pulse rounded-none ml-1" />
          </div>
          <div className="h-3 w-64 bg-slate-200 animate-pulse rounded-none ml-3.5 mt-1" />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="min-w-full md:min-w-[calc(50%-0.5rem)] xl:min-w-[calc(33.333%-11px)] snap-start h-full"
          >
            <ToolCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
