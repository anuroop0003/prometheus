import ErrorToaster from "@/components/toaster/error-toaster";
import SuccessToaster from "@/components/toaster/success-toaster";
import { Button } from "@/components/ui/button";
import { CalendarInput } from "@/components/ui/calendar-input";
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
import { TimePicker } from "@/components/ui/time-picker";
import { useEnhanceAction } from "@/services/query/notifications/notifications.api";
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { NOTIFICATION_CARD_ICON_CONFIG } from "../constant/notification-card-icon-config";

interface EnhanceActionSheetProps {
  type: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  originalPayload: Record<string, any>;
  isPending: boolean;
  onSave: (editedPayload: any) => void;
  actionId: string;
}

const EnhanceActionSheet = ({
  type,
  isOpen,
  onOpenChange,
  originalPayload,
  isPending,
  onSave,
  actionId,
}: EnhanceActionSheetProps) => {
  const [enhancePrompt, setEnhancePrompt] = useState<string>("");
  const { mutateAsync: enhanceAction, isPending: isEnhancing } =
    useEnhanceAction();

  const form = useForm({
    values: originalPayload || {},
  });

  useEffect(() => {
    form.reset(originalPayload || {});
  }, [originalPayload, isOpen, form]);

  const handleEnhance = async () => {
    if (!enhancePrompt.trim()) return;

    try {
      const response = await enhanceAction({
        id: actionId,
        description: enhancePrompt,
      });

      if (response && response.payload) {
        form.reset(response.payload);
        setEnhancePrompt("");
        toast.custom(
          () => (
            <SuccessToaster
              title="Enhancement Success"
              description="Payload has been enhanced successfully."
            />
          ),
          { id: `enhance-success-${actionId}` },
        );
      }
    } catch (error) {
      toast.custom(
        () => (
          <ErrorToaster
            title="Enhancement Failed"
            description="Failed to enhance payload. Please try again."
          />
        ),
        { id: `enhance-error-${actionId}` },
      );
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    // Attempt to parse stringified JSON back if applicable
    const parsedData = { ...data };
    Object.keys(parsedData).forEach((key) => {
      if (
        typeof originalPayload?.[key] === "object" &&
        typeof parsedData[key] === "string"
      ) {
        try {
          parsedData[key] = JSON.parse(parsedData[key]);
        } catch {
          // ignore
        }
      }
    });
    onSave(parsedData);
  });

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        form.reset(originalPayload || {});
        setEnhancePrompt("");
      }}
    >
      <SheetContent className="w-xl sm:max-w-xl rounded-none border-l-2 border-slate-200 bg-white flex flex-col p-0 gap-0">
        <div className="shrink-0">
          <SheetHeader className="p-6">
            <SheetTitle className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none flex items-center gap-6">
              <div className="relative">
                <div className="bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center">
                  <img
                    src={NOTIFICATION_CARD_ICON_CONFIG[type]}
                    alt={type}
                    className="size-6 object-contain"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-50 border border-indigo-200 p-1">
                  <Sparkles className="size-3 text-indigo-600" />
                </div>
              </div>
              Enhance Action
            </SheetTitle>
            <SheetDescription className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mt-2">
              Review and modify parameters before approving
            </SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 px-6 min-h-0">
          <form
            id="enhance-form"
            onSubmit={onSubmit}
            className="space-y-6 pb-6 pt-2"
          >
            {Object.entries(originalPayload || {}).map(([key, value]) => {
              if (key.toLowerCase() === "type") return null;

              const isLong =
                String(value).length > 40 ||
                key.toLowerCase().includes("body") ||
                key.toLowerCase().includes("description") ||
                typeof value === "object";

              const isDate =
                key.toLowerCase().includes("date") &&
                !key.toLowerCase().includes("time");
              const isTime =
                key.toLowerCase().includes("time") &&
                !key.toLowerCase().includes("date");

              return (
                <div key={key} className="space-y-2">
                  <Label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                    {key.replace(/_/g, " ")}
                  </Label>

                  <Controller
                    control={form.control}
                    name={key}
                    render={({ field }) => {
                      const stringValue =
                        typeof field.value === "object"
                          ? JSON.stringify(field.value, null, 2)
                          : String(field.value ?? "");

                      if (isLong) {
                        return (
                          <Textarea
                            {...field}
                            value={stringValue}
                            className="min-h-[80px] font-mono text-sm rounded-none border border-slate-200 bg-white focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors shadow-none p-3"
                          />
                        );
                      }

                      if (isDate) {
                        const dateVal =
                          stringValue && !isNaN(new Date(stringValue).getTime())
                            ? new Date(stringValue)
                            : undefined;
                        return (
                          <CalendarInput
                            value={dateVal}
                            onChange={(date) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                          />
                        );
                      }

                      if (isTime) {
                        const dateVal =
                          stringValue && !isNaN(new Date(stringValue).getTime())
                            ? new Date(stringValue)
                            : undefined;
                        return (
                          <TimePicker
                            date={dateVal}
                            setDate={(date) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                          />
                        );
                      }

                      return (
                        <Input
                          {...field}
                          value={stringValue}
                          onChange={(e) => {
                            let val: any = e.target.value;
                            if (typeof value === "number") val = Number(val);
                            field.onChange(val);
                          }}
                          className="rounded-none border border-slate-200 bg-white focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors shadow-none font-medium h-10 px-3 text-sm"
                        />
                      );
                    }}
                  />
                </div>
              );
            })}

            {/* Enhance with AI Card */}
            <div className="mt-8 bg-slate-50 border border-slate-200 p-5 rounded-none shadow-sm flex flex-col gap-3">
              <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900">
                Enhance with AI
              </Label>
              <div className="flex flex-col gap-3">
                <Textarea
                  placeholder="Describe how to enhance this action..."
                  value={enhancePrompt}
                  onChange={(e) => setEnhancePrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleEnhance();
                    }
                  }}
                  className="rounded-none border border-slate-200 bg-white focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors shadow-none font-medium min-h-[80px] p-3 text-sm"
                />
                <Button
                  type="button"
                  onClick={handleEnhance}
                  disabled={isEnhancing || !enhancePrompt.trim()}
                  loading={isEnhancing}
                  variant="outline"
                  className="w-full gap-2 rounded-none border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold uppercase tracking-wider text-[11px] shadow-none h-10 transition-colors cursor-pointer"
                >
                  <Sparkles className="size-4" strokeWidth={2.5} />
                  Enhance
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>

        <div className="p-6 border-t-2 border-slate-200 bg-white shrink-0 mt-auto">
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="rounded-none border-2 border-slate-200 font-bold uppercase tracking-wider text-[10px] text-slate-600 hover:bg-slate-50 shadow-none h-10 px-6 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="enhance-form"
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
