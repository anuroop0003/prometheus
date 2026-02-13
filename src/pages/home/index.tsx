import ToolSection from "./components/tool-section";
import { AVAILABLE_TOOLS, CONNECTED_TOOLS } from "./constant/tools.config";

const Home = () => {
  return (
    <div className="space-y-10">
      <ToolSection
        title="Connected Tools"
        description="Tools that are currently active and linked to your workflows."
        tools={CONNECTED_TOOLS}
      />

      <ToolSection
        title="Available Tools"
        description="Connect new tools to extend your workflow capabilities."
        tools={AVAILABLE_TOOLS}
      />
    </div>
  );
};

export default Home;
