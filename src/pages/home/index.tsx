import { useTools } from "@/services/query/tools/tools.api";
import ToolSection from "./components/tool-section";

const Home = () => {
  const { data, isLoading } = useTools();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground animate-pulse">
          Loading tools...
        </div>
      </div>
    );
  }

  const allTools = data?.tools || [];

  const connectedTools = allTools.filter((tool) => tool.status === "connected");
  const availableTools = allTools.filter((tool) => tool.status === "available");

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
