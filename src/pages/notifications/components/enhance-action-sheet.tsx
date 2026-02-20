import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useEnhanceAction } from "@/services/query/notifications/notifications.api";
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EnhanceActionSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  originalPayload: Record<string, any>;
  isPending: boolean;
  onSave: (editedPayload: any) => void;
  actionId: string;
}

const EnhanceActionSheet = ({
  isOpen,
  onOpenChange,
  originalPayload,
  isPending,
  onSave,
  actionId,
}: EnhanceActionSheetProps) => {
  const [editedPayload, setEditedPayload] = useState<Record<string, any>>({});
  const [enhancePrompt, setEnhancePrompt] = useState("");
  const { mutateAsync: enhanceAction, isPending: isEnhancing } =
    useEnhanceAction();

  useEffect(() => {
    setEditedPayload(originalPayload || {});
  }, [originalPayload, isOpen]);

  const handleEnhance = async () => {
    if (!enhancePrompt.trim()) return;

    try {
      const response = await enhanceAction({
        id: actionId,
        prompt: enhancePrompt,
      });

      if (response && response.payload) {
        setEditedPayload(response.payload);
        setEnhancePrompt("");
        toast.success("Payload enhanced successfully");
      }
    } catch (error) {
      toast.error("Failed to enhance payload");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-xl sm:max-w-xl rounded-none border-l-2 border-slate-200 bg-white flex flex-col p-0 gap-0">
        <div className="px-6 pt-6 shrink-0">
          <SheetHeader className="mb-6 mt-2">
            <SheetTitle className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none flex items-center gap-2">
              <Sparkles className="size-6 text-indigo-500" strokeWidth={2.5} />
              Enhance Action
            </SheetTitle>
            <SheetDescription className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mt-2">
              Review and modify parameters before approving
            </SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 px-6 min-h-0">
          <div className="space-y-6 pb-6 pt-2">
            {Object.entries(editedPayload).map(([key, value]) => {
              const stringValue =
                typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : String(value ?? "");

              const isLong =
                stringValue.length > 40 ||
                key.toLowerCase().includes("body") ||
                key.toLowerCase().includes("description") ||
                typeof value === "object";

              return (
                <div
                  key={key}
                  className="space-y-2 bg-slate-50 p-4 border-2 border-slate-200"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
                      {key.replace(/_/g, " ")}
                    </Label>
                    <Badge
                      variant="outline"
                      className="text-[9px] font-bold uppercase tracking-widest rounded-none border-2 border-slate-200 bg-white shadow-none text-slate-500"
                    >
                      {typeof value}
                    </Badge>
                  </div>

                  {isLong ? (
                    <Textarea
                      value={stringValue}
                      className="min-h-[140px] font-mono text-xs rounded-none border-2 border-slate-200 bg-white focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors shadow-none"
                      onChange={(e) => {
                        let val: any = e.target.value;
                        if (typeof value === "object") {
                          try {
                            val = JSON.parse(val);
                          } catch {
                            /* keep string */
                          }
                        }
                        setEditedPayload((prev) => ({
                          ...prev,
                          [key]: val,
                        }));
                      }}
                    />
                  ) : (
                    <Input
                      value={stringValue}
                      className="rounded-none border-2 border-slate-200 bg-white focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors shadow-none font-medium h-10 text-sm"
                      onChange={(e) => {
                        let val: any = e.target.value;
                        if (typeof value === "number") val = Number(val);
                        setEditedPayload((prev) => ({
                          ...prev,
                          [key]: val,
                        }));
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Enhance with AI Card */}
            <div className="mt-8 border-2 border-indigo-100 bg-indigo-50/30 p-5 rounded-none">
              <div className="flex flex-col gap-4">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-indigo-700 flex items-center gap-2">
                  <Sparkles className="size-4" strokeWidth={2.5} />
                  Enhance with AI
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Describe how to enhance this action..."
                    value={enhancePrompt}
                    onChange={(e) => setEnhancePrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEnhance();
                      }
                    }}
                    className="rounded-none border-2 border-indigo-200 bg-white focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors shadow-none font-medium h-10 text-sm"
                  />
                  <Button
                    variant="outline"
                    className="gap-2 rounded-none border-2 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold uppercase tracking-wider text-[10px] shadow-none h-10 px-6 transition-colors shrink-0 cursor-pointer"
                    onClick={handleEnhance}
                    disabled={isEnhancing || !enhancePrompt.trim()}
                    loading={isEnhancing}
                  >
                    Enhance
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 border-t-2 border-slate-200 bg-white shrink-0 mt-auto">
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="rounded-none border-2 border-slate-200 font-bold uppercase tracking-wider text-[10px] text-slate-600 hover:bg-slate-50 shadow-none h-10 px-6 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSave(editedPayload)}
              disabled={isPending}
              className="gap-2 rounded-none border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800 font-bold uppercase tracking-wider text-[10px] shadow-none h-10 px-6 transition-colors"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" strokeWidth={2.5} />
              )}
              Save & Approve
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EnhanceActionSheet;
