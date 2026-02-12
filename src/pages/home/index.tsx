import Header from "@/components/header";
import ToolSection from "./components/tool-section";
import { AVAILABLE_TOOLS, CONNECTED_TOOLS } from "./constant/tools.config";

const Home = () => {
  return (
    <div className="relative m-5 mt-0">
      <Header
        user={{
          name: "Anuroop K",
          email: "anuroop@example.com",
          avatarUrl: "/avatar.png",
        }}
      />

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
    </div>
  );
};

export default Home;
