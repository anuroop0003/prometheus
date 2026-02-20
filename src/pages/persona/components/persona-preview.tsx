import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PersonaFormValues } from "@/validations/persona.schema";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function PersonaPreview({ username }: { username: string }) {
  const { watch } = useFormContext<PersonaFormValues>();
  const watchedValues = watch();

  const score = useMemo(
    () =>
      [
        (watchedValues.role?.trim().length || 0) >= 2 ? 20 : 0,
        (watchedValues.company?.trim().length || 0) >= 2 ? 20 : 0,
        Math.min(30, (watchedValues.projectKeywords?.length || 0) * 10),
        Math.min(30, (watchedValues.tools?.length || 0) * 10),
      ].reduce((a, b) => a + b, 0),
    [watchedValues],
  );

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-28 space-y-6">
        <Card className="py-0 overflow-hidden border-none shadow-2xl bg-white ring-1 ring-slate-200">
          {/* Header Banner */}
          <div className="h-28 bg-[#0f172a] relative flex items-end px-8 pb-4" />

          <CardContent className="pb-6">
            {/* Avatar Section */}
            <div className="relative -mt-14 mb-2">
              <Avatar className="size-28">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-600">
                  {username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Identity Information */}
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {username || "New User"}
              </h3>
              <p className="text-rose-600 font-semibold text-sm tracking-tight">
                {watchedValues.role || "Consultant"}
              </p>
              <p className="text-slate-500 text-sm font-medium italic">
                {watchedValues.company
                  ? `@ ${watchedValues.company}`
                  : "Independent Professional"}
              </p>
            </div>

            <Separator className="my-4 opacity-50" />

            {/* Expertise & Skills */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Top Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.projectKeywords?.length > 0 ? (
                    watchedValues.projectKeywords.map((k) => (
                      <span
                        key={k}
                        className="bg-slate-50 text-slate-600 text-[12px] px-3 py-1 rounded-md border border-slate-200 font-medium"
                      >
                        {k}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-300 italic">
                      No expertise added
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Verified Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.tools?.length > 0 ? (
                    watchedValues.tools.map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 bg-indigo-50/60 text-indigo-700 text-[11px] px-2.5 py-1 rounded border border-indigo-100 font-semibold tracking-tight"
                      >
                        <div className="size-1.25 rounded-full bg-indigo-500" />
                        {t}
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-300 italic">
                      No tools selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Progress Widget */}
        <div className="bg-black text-white rounded-2xl p-6 text-white shadow-xl ring-1 ring-white/10">
          <div className="flex justify-between items-end mb-4">
            <div className="space-y-1">
              <span className="text-sm font-bold uppercase tracking-widest block">
                Reliability Score
              </span>
              <p className="text-xs font-medium">Based on verified skills</p>
            </div>
            <span className="text-2xl font-black leading-none">{score}%</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(244,63,94,0.4)]"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
