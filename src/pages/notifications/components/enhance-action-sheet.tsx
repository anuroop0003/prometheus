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
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface EnhanceActionSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  originalPayload: Record<string, any>;
  isPending: boolean;
  onSave: (editedPayload: any) => void;
}

const EnhanceActionSheet = ({
  isOpen,
  onOpenChange,
  originalPayload,
  isPending,
  onSave,
}: EnhanceActionSheetProps) => {
  const [editedPayload, setEditedPayload] = useState<Record<string, any>>({});

  useEffect(() => {
    setEditedPayload(originalPayload || {});
  }, [originalPayload, isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-2xl max-w-2xl">
        <SheetHeader>
          <SheetTitle>Enhance Action</SheetTitle>
          <SheetDescription>
            Review and modify parameters before approving.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 pb-6">
            {Object.entries(editedPayload).map(([key, value]) => {
              const stringValue =
                typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : String(value ?? "");

              const isLong =
                stringValue.length > 40 ||
                key.toLowerCase().includes("body") ||
                key.toLowerCase().includes("description");

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium capitalize">
                      {key.replace(/_/g, " ")}
                    </Label>
                    <Badge variant="secondary" className="text-xs">
                      {typeof value}
                    </Badge>
                  </div>

                  {isLong ? (
                    <Textarea
                      value={stringValue}
                      className="min-h-[140px] font-mono text-sm"
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

                  <p className="text-xs text-muted-foreground">
                    Edit the value for <span className="font-mono">{key}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="sticky bottom-0 border-t bg-background px-6 py-4">
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSave(editedPayload)}
              disabled={isPending}
              className="gap-2"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
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
