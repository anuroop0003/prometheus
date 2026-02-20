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
        <Card className="py-0 overflow-hidden border-2 border-slate-200 shadow-none bg-white rounded-none">
          {/* Header Banner */}
          <div className="h-28 bg-[#0a0a0a] relative flex items-end px-8 pb-4" />

          <CardContent className="pb-6">
            {/* Avatar Section */}
            <div className="relative -mt-14 mb-2">
              <Avatar className="size-28 rounded-none border-4 border-white">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-none object-cover"
                />
                <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-900 rounded-none uppercase">
                  {username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Identity Information */}
            <div className="space-y-1 mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                {username || "New User"}
              </h3>
              <p className="text-rose-600 font-bold text-xs tracking-wider uppercase mt-2">
                {watchedValues.role || "Consultant"}
              </p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {watchedValues.company
                  ? `@ ${watchedValues.company}`
                  : "Independent Professional"}
              </p>
            </div>

            <Separator className="my-6 border-slate-200 border-b-2" />

            {/* Expertise & Skills */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="size-1.5 bg-slate-900 rounded-none relative"></span>
                  Personal Projects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.projectKeywords?.length > 0 ? (
                    watchedValues.projectKeywords.map((k) => (
                      <span
                        key={k}
                        className="bg-slate-50 text-slate-600 text-[10px] px-3 py-1 rounded-none border-2 border-slate-200 font-bold uppercase tracking-wider"
                      >
                        {k}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      No projects added
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="size-1.5 bg-slate-900 rounded-none relative"></span>
                  Professional Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.tools?.length > 0 ? (
                    watchedValues.tools.map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 bg-indigo-50 text-indigo-700 text-[10px] px-2.5 py-1 rounded-none border-2 border-indigo-200 font-bold uppercase tracking-wider"
                      >
                        <div className="size-1.5 rounded-none bg-indigo-500" />
                        {t}
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      No keywords added
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Progress Widget */}
        <div className="bg-[#0a0a0a] text-white rounded-none p-6 shadow-none border-0">
          <div className="flex justify-between items-end mb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest block text-slate-400">
                Reliability Score
              </span>
              <p className="text-xs font-bold tracking-tight">
                Based on verified skills
              </p>
            </div>
            <span className="text-3xl font-extrabold leading-none">
              {score}%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-none overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-1000 ease-out"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
