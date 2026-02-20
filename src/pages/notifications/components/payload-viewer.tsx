import { Separator } from "@/components/ui/separator";

interface PayloadViewerProps {
  payload: any;
}

const PayloadViewer = ({ payload }: PayloadViewerProps) => {
  if (!payload || Object.keys(payload).length === 0) return null;

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Payload Parameters
        </p>
        <Separator className="flex-1 bg-slate-200 h-0.5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(payload).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col gap-1.5 rounded-none border-2 border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-900 break-words capitalize">
              {typeof value === "object"
                ? "JSON Object"
                : String(value).replace(/_/g, " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayloadViewer;
