import EmptyToolState from "./empty-tool-state";
import ToolCard from "./tool-card";

interface ToolSectionProps {
  title: string;
  description: string;
  tools: any[];
}

const ToolSection = ({ title, description, tools }: ToolSectionProps) => {
  const hasTools = tools.length > 0;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hasTools ? (
          tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <EmptyToolState />
        )}
      </div>
    </section>
  );
};

export default ToolSection;
