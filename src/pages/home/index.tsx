import { useTools } from "@/services/query/tools/tools.api";
import ToolSection from "./components/tool-section";
import { ToolSectionSkeleton } from "./components/tool-section-skeleton";

const Home = () => {
  const { data, isLoading } = useTools();

  const allTools = data?.tools || [];
  const connectedTools = allTools.filter((tool) => tool.status === "connected");
  const availableTools = allTools.filter(
    (tool) => tool.status === "available" || tool.status === "coming_soon",
  );

  if (isLoading) {
    return (
      <div className="space-y-12">
        <ToolSectionSkeleton />
        <ToolSectionSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {connectedTools.length > 0 && (
        <ToolSection
          title="Connected Tools"
          description="Tools that are currently active and linked to your workflows."
          tools={connectedTools}
        />
      )}

      {availableTools.length > 0 && (
        <ToolSection
          title="Available Tools"
          description="Connect new tools to extend your workflow capabilities."
          tools={availableTools}
        />
      )}
    </div>
  );
};

export default Home;
