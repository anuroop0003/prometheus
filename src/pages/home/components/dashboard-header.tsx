import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPersona } from "@/services/query/persona/persona.api";
import { Briefcase, Building2, ChevronRight, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = ({
  userName,
  userEmail,
  isPersonaCreated,
}: {
  userName: string;
  userEmail: string;
  isPersonaCreated: boolean;
}) => {
  const { data: personaData } = useGetPersona();
  const navigate = useNavigate();

  return (
    <Card className="rounded-none border-0 mb-8 bg-[#0a0a0a] text-white shadow-none">
      <CardContent className="p-0 flex flex-col md:flex-row h-full">
        {/* User Card Area */}
        <div className="p-8 md:w-1/3 flex items-center justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div className="flex items-center gap-6">
            <Avatar className="size-20 border-2 border-slate-700 bg-white rounded-none">
              <AvatarFallback className="bg-white text-[#0a0a0a] text-2xl font-bold uppercase rounded-none">
                {userName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold tracking-tight text-white leading-none">
                {userName || "User"}
              </h2>
              <p className="text-slate-500 text-xs font-semibold">
                {userEmail}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="cursor-pointer rounded-none border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white transition-colors h-8 text-xs font-bold uppercase tracking-wider ml-4 hidden sm:flex"
          >
            Log Out
          </Button>
        </div>

        {/* Persona Details Area */}
        <div className="p-8 md:w-2/3 flex items-center justify-between">
          {isPersonaCreated && personaData?.persona ? (
            <div className="flex flex-col gap-5 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-none w-fit">
                <span className="size-1.5 rounded-none bg-slate-300"></span>
                <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
                  Persona Active
                </span>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-10">
                    <div className="flex gap-4 items-center">
                      <div className="p-2.5 bg-[#1a1a1a] border border-[#333] rounded-none">
                        <Briefcase className="size-5 text-slate-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">
                          Role
                        </span>
                        <span className="text-white font-bold text-[15px] leading-none">
                          {personaData.persona.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="p-2.5 bg-[#1a1a1a] border border-[#333] rounded-none">
                        <Building2 className="size-5 text-slate-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">
                          Company
                        </span>
                        <span className="text-white font-bold text-[15px] leading-none">
                          {personaData.persona.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate("/persona")}
                  className="rounded-none border-[#333] text-slate-300 hover:bg-[#1a1a1a] hover:text-white transition-all bg-transparent h-9 text-xs font-semibold px-4"
                >
                  Edit Persona{" "}
                  <ChevronRight className="ml-1 size-3 text-slate-500" />
                </Button>
              </div>

              {personaData.persona.projectKeywords?.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {personaData.persona.projectKeywords.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-transparent border border-[#333] rounded-none text-[10px] font-semibold text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded-none">
                  <User className="size-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    No Persona Configured
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Configure your AI persona to allow Prometheus to act on your
                    behalf.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/persona")}
                className="cursor-pointer rounded-none bg-[#1a1a1a] text-slate-200 border border-[#333] hover:bg-[#222] transition-all font-bold px-6 h-10"
              >
                <Plus className="mr-2 size-4" />
                Create Persona
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
