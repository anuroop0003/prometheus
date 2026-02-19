import { ToolCardSkeleton } from "./tool-card-skeleton";

export function ToolSectionSkeleton() {
  return (
    <section className="space-y-6">
      <div>
        <div className="h-7 w-48 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-96 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ToolCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
