import { Separator } from "@/components/ui/separator";

interface PayloadViewerProps {
  payload: any;
}

const PayloadViewer = ({ payload }: PayloadViewerProps) => {
  if (!payload || Object.keys(payload).length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Payload Parameters
        </p>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(payload).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col gap-2 rounded-md border bg-muted/20 px-3 py-1.5 transition-colors hover:bg-muted/40"
          >
            <span className="text-xs font-medium text-muted-foreground capitalize">
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-xs font-mono font-semibold bg-background capitalize break-words">
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
