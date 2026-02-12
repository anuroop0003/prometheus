import ToolCard from "./tool-card";

interface ToolSectionProps {
  title: string;
  description?: string;
  tools: any[];
}

const ToolSection = ({ title, description, tools }: ToolSectionProps) => {
  if (!tools.length) return null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default ToolSection;
