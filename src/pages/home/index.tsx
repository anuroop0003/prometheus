import { Switch } from "@/components/ui/switch";
import { useUserProfile } from "@/services/query/login/login.api";
import { useTools } from "@/services/query/tools/tools.api";
import { useState } from "react";
import { DashboardActions } from "./components/dashboard-actions";
import { DashboardHeader } from "./components/dashboard-header";
import ToolSection from "./components/tool-section";
import { ToolSectionSkeleton } from "./components/tool-section-skeleton";

const Home = () => {
  const [showActionTools, setShowActionTools] = useState(false);
  const { data, isLoading } = useTools();
  const { data: profile } = useUserProfile();

  const isPersonaCreated = profile?.user?.isPersonaCreated ?? false;
  const userName = profile?.user?.name || "";
  const userEmail = profile?.user?.email || "";

  const allTools = data?.tools || [];
  const connectedTools = allTools.filter((tool) => tool.status === "connected");
  const availableTools = allTools.filter(
    (tool) =>
      (tool.status === "available" || tool.status === "coming_soon") &&
      tool.category === (showActionTools ? "action" : "communication"),
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
    <div className="space-y-8">
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        isPersonaCreated={isPersonaCreated}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <DashboardActions />
        </div>

        <div className="lg:w-2/3 space-y-8">
          <ToolSection
            title="Connected Tools"
            description="Active integrations powering your workflows."
            tools={connectedTools}
          />

          <ToolSection
            title="Available Integrations"
            description="Connect new tools to extend your workflow capabilities."
            tools={availableTools}
            extraHeader={
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-none mr-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${!showActionTools ? "text-slate-900" : "text-slate-400"}`}
                >
                  Comms
                </span>
                <Switch
                  checked={showActionTools}
                  onCheckedChange={setShowActionTools}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${showActionTools ? "text-slate-900" : "text-slate-400"}`}
                >
                  Actions
                </span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
