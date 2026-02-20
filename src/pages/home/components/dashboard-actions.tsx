import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useActions } from "@/services/query/notifications/notifications.api";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardActions = () => {
  const { data: actions, isLoading } = useActions({ status: "pending" });
  const navigate = useNavigate();

  const pendingActions = actions?.slice(0, 5) || [];

  return (
    <Card className="rounded-none border-2 border-slate-200 bg-white shadow-none h-full p-6 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Pending Actions
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Requires your approval
          </p>
        </div>
        <div className="flex items-center justify-center size-6 bg-slate-900 text-white rounded-none text-xs font-bold">
          {pendingActions.length}
        </div>
      </div>

      <div className="flex flex-col gap-0 flex-1 mt-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="py-4 border-l-2 border-slate-200 pl-4 animate-pulse"
            >
              <div className="h-4 bg-slate-200 w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 w-1/2"></div>
            </div>
          ))
        ) : pendingActions.length > 0 ? (
          pendingActions.map((action) => (
            <div key={action._id} className="py-4 flex gap-4 items-start">
              <div className="border-l-2 border-slate-800 pl-4 flex flex-1 items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 text-slate-400 p-1 border border-slate-200 rounded-none bg-slate-50">
                    <Clock className="size-4 text-orange-500" />
                  </div>
                  <div
                    className="group space-y-1.5 hover:cursor-pointer"
                    onClick={() => navigate("/notifications")}
                  >
                    <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                      {action.title || "Action Request"}
                    </h4>
                    <p className="group-hover:text-indigo-600 text-[11px] font-semibold text-slate-500 leading-relaxed min-h-[3em] mb-3 flex-1">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1text-slate-500 text-xs font-medium text-slate-400">
                      <span className="capitalize">
                        {action.type.replace("_", " ")}
                      </span>
                      <span className="text-[10px]">•</span>
                      <span>
                        {new Date(action.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`rounded-none text-[10px] font-bold px-3 py-0.5 capitalize ${
                    action.priority === "high"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {action.priority}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-50 p-3 rounded-none mb-4 ring-1 ring-slate-200">
              <CheckCircle2 className="size-6 text-slate-400" />
            </div>
            <CardTitle className="text-sm font-bold text-slate-800">
              All Caught Up
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1 max-w-[200px]">
              You have no pending actions requiring approval.
            </p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 flex justify-between items-center text-sm font-medium">
        <Button
          variant="link"
          onClick={() => navigate("/notifications")}
          className="text-slate-400 hover:text-slate-800 transition-colors w-full flex justify-between items-center"
        >
          View all actions <ArrowRight className="size-4" />
        </Button>
      </div>
    </Card>
  );
};
