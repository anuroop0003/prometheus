import ToolSection from "./components/tool-section";
import { useTools } from "@/services/query/tools/tools.api";

const Home = () => {
  const { data, isLoading } = useTools();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground animate-pulse">Loading tools...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <ToolSection
        title="Connected Tools"
        description="Tools that are currently active and linked to your workflows."
        tools={data?.connected || []}
      />

      <ToolSection
        title="Available Tools"
        description="Connect new tools to extend your workflow capabilities."
        tools={data?.available || []}
      />
    </div>
  );
};

export default Home;
