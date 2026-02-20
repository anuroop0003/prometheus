import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

const EmptyToolState = () => {
  return (
    <Card className="w-full flex flex-col items-center border-dashed border-2 border-slate-200 shadow-none py-12 bg-slate-50/50 rounded-none h-full justify-center">
      <CardHeader className="flex items-center justify-center size-16 bg-white shadow-sm border border-slate-200 mb-4 rounded-none p-0">
        <PackageOpen className="size-8 text-slate-400" />
      </CardHeader>

      <CardContent className="space-y-2 text-center max-w-md pb-0">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase">
          No Connected Tools
        </h3>
        <p className="text-xs font-medium leading-relaxed text-slate-500 max-w-sm mx-auto">
          You haven't connected any tools yet. Add your verified stack from the
          available tools below to empower Prometheus with more capabilities.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyToolState;
