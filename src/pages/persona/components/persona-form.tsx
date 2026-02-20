import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { PersonaFormValues } from "@/validations/persona.schema";
import { Briefcase, Plus, UserCircle, Wrench, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function PersonaForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PersonaFormValues>();
  const watchedValues = watch();
  const [projectInput, setProjectInput] = useState<string>("");
  const [keywordInput, setKeywordInput] = useState<string>("");

  const onAddProject = (project: string) =>
    setValue("projectKeywords", [
      ...(watchedValues.projectKeywords || []),
      project,
    ]);

  const onRemoveProject = (index: number) =>
    setValue(
      "projectKeywords",
      (watchedValues.projectKeywords || []).filter((_, i) => i !== index),
    );

  const onAddKeyword = (keyword: string) =>
    setValue("tools", [...(watchedValues.tools || []), keyword]);

  const onRemoveKeyword = (index: number) =>
    setValue(
      "tools",
      (watchedValues.tools || []).filter((_, i) => i !== index),
    );

  return (
    <div className="lg:col-span-7 space-y-4">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
          User Persona
        </h2>
        <p className="text-slate-500 mt-2 font-medium text-sm">
          Configure your professional identity across the ecosystem.
        </p>
      </div>

      <Card className="rounded-none border-2 border-slate-200 bg-white shadow-none">
        <CardContent className="space-y-8 p-6">
          <FieldGroup>
            {/* Section 1: Identity & Context */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2">
                <Briefcase className="size-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Professional Context
                </h3>
              </div>

              <Field data-invalid={!!errors.role}>
                <FieldTitle className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Current Role *
                </FieldTitle>
                <FieldContent>
                  <Input
                    {...register("role")}
                    placeholder="e.g. Senior Developer"
                    className="rounded-none border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-800 transition-colors"
                  />
                  <FieldError errors={[errors.role]} />
                </FieldContent>
              </Field>

              <Field data-invalid={!!errors.company}>
                <FieldTitle className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Organization *
                </FieldTitle>
                <FieldContent>
                  <Input
                    {...register("company")}
                    placeholder="e.g. Acme Corp"
                    className="rounded-none border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-800 transition-colors"
                  />
                  <FieldError errors={[errors.company]} />
                </FieldContent>
              </Field>
            </div>

            {/* Section 2: Personal Projects */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2">
                <UserCircle className="size-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Personal Projects
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a project (e.g. Open Source CLI Tool)"
                    value={projectInput}
                    onChange={(e) => setProjectInput(e.target.value)}
                    className="rounded-none border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-800 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (projectInput.trim()) {
                          onAddProject(projectInput.trim());
                          setProjectInput("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-4 rounded-none border-2 border-slate-200 shadow-none font-bold tracking-wider hover:bg-slate-100 transition-colors"
                    onClick={() => {
                      if (projectInput.trim()) {
                        onAddProject(projectInput.trim());
                        setProjectInput("");
                      }
                    }}
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[32px] mt-3">
                  {watchedValues.projectKeywords?.map((tag, index) => (
                    <Badge
                      key={`${tag}-${index}`}
                      className="cursor-pointer bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-slate-200 px-3 py-1 gap-2 rounded-none font-bold uppercase tracking-wider text-[10px] shadow-none"
                      onClick={() => onRemoveProject(index)}
                    >
                      <span className="size-1.5 rounded-none bg-slate-400" />
                      <span className="leading-none pt-0.5">{tag}</span>
                      <X
                        className="size-3 opacity-60 hover:opacity-100"
                        strokeWidth={3}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Professional Keywords */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2">
                <Wrench className="size-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Professional Keywords
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a keyword (e.g. Distributed Systems, GenAI)"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    className="rounded-none border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-800 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (keywordInput.trim()) {
                          onAddKeyword(keywordInput.trim());
                          setKeywordInput("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-4 rounded-none border-2 border-slate-200 shadow-none font-bold tracking-wider hover:bg-slate-100 transition-colors"
                    onClick={() => {
                      if (keywordInput.trim()) {
                        onAddKeyword(keywordInput.trim());
                        setKeywordInput("");
                      }
                    }}
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[32px] mt-3">
                  {watchedValues.tools?.map((tool, index) => (
                    <Badge
                      key={`${tool}-${index}`}
                      className="cursor-pointer bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-2 border-indigo-200 px-3 py-1 gap-2 rounded-none font-bold uppercase tracking-wider text-[10px] shadow-none"
                      onClick={() => onRemoveKeyword(index)}
                    >
                      <span className="size-1.5 rounded-none bg-indigo-500" />
                      <span className="leading-none pt-0.5">{tool}</span>
                      <X
                        className="size-3 opacity-60 hover:opacity-100"
                        strokeWidth={3}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
