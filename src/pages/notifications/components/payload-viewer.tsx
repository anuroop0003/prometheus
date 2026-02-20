import { Separator } from "@/components/ui/separator";

interface PayloadViewerProps {
  payload: any;
}

const isUnixTimestamp = (value: number) => {
  return value > 1e9;
};

const formatValue = (key: string, value: any) => {
  if (value == null) return "—";

  const lowerKey = key.toLowerCase();

  if (typeof value === "object") {
    return "JSON Object";
  }
  if (typeof value === "number" && isUnixTimestamp(value)) {
    const date =
      value.toString().length === 10 ? new Date(value * 1000) : new Date(value);

    return date.toLocaleString();
  }

  if (lowerKey.includes("time") || lowerKey.includes("timestamp")) {
    return new Date(value).toLocaleTimeString();
  }

  if (
    lowerKey.includes("date") ||
    lowerKey.includes("dob") ||
    lowerKey.includes("created") ||
    lowerKey.includes("updated")
  ) {
    return new Date(value).toLocaleDateString();
  }

  return String(value).replace(/_/g, " ");
};

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
            className="flex flex-col gap-1.5 border-2 border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {key.replace(/_/g, " ")}
            </span>

            <span className="text-sm font-bold tracking-tight text-slate-900 break-words">
              {formatValue(key, value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayloadViewer;
