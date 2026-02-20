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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PersonaFormValues } from "@/validations/persona.schema";
import { Briefcase, Plus, UserCircle, Wrench, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const TOOL_OPTIONS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Vercel",
  "Firebase",
];

export function PersonaForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PersonaFormValues>();
  const watchedValues = watch();
  const [keywordInput, setKeywordInput] = useState<string>("");

  const onAddKeyword = (keyword: string) =>
    setValue("projectKeywords", [
      ...(watchedValues.projectKeywords || []),
      keyword,
    ]);

  const onRemoveKeyword = (index: number) =>
    setValue(
      "projectKeywords",
      (watchedValues.projectKeywords || []).filter((_, i) => i !== index),
    );

  const onAddTool = (tool: string) =>
    setValue("tools", [...(watchedValues.tools || []), tool]);

  const onRemoveTool = (index: number) =>
    setValue(
      "tools",
      (watchedValues.tools || []).filter((_, i) => i !== index),
    );

  return (
    <div className="lg:col-span-7 space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          User Persona
        </h2>
        <p className="text-slate-500 mt-1 text-sm">
          Configure your professional identity across the ecosystem.
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="space-y-8">
          <FieldGroup>
            {/* Section 1: Identity & Context */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Briefcase className="size-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Professional Context
                </h3>
              </div>

              <Field data-invalid={!!errors.role}>
                <FieldTitle className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Current Role *
                </FieldTitle>
                <FieldContent>
                  <Input
                    {...register("role")}
                    placeholder="e.g. Senior Developer"
                  />
                  <FieldError errors={[errors.role]} />
                </FieldContent>
              </Field>

              <Field data-invalid={!!errors.company}>
                <FieldTitle className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Organization *
                </FieldTitle>
                <FieldContent>
                  <Input
                    {...register("company")}
                    placeholder="e.g. Acme Corp"
                  />
                  <FieldError errors={[errors.company]} />
                </FieldContent>
              </Field>
            </div>

            {/* Section 2: Expertise Keywords */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <UserCircle className="size-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Focus Expertise
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g. UX Research)"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
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
                    className="px-3"
                    onClick={() => {
                      if (keywordInput.trim()) {
                        onAddKeyword(keywordInput.trim());
                        setKeywordInput("");
                      }
                    }}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {watchedValues.projectKeywords?.map((tag, index) => (
                    <Badge
                      key={`${tag}-${index}`}
                      className="cursor-pointer bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 px-3 py-1.5 gap-2 border shadow-sm"
                      onClick={() => onRemoveKeyword(index)}
                    >
                      <span className="size-1.25 rounded-full bg-indigo-500" />
                      <span className="text-xs font-semibold">{tag}</span>
                      <X className="size-3 opacity-60 hover:opacity-100" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Technology Stack */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Wrench className="size-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Technology Stack
                </h3>
              </div>

              <div className="space-y-4">
                <Select
                  onValueChange={(val) =>
                    !(watchedValues.tools || []).includes(val) && onAddTool(val)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select verified tools..." />
                  </SelectTrigger>
                  <SelectContent>
                    {TOOL_OPTIONS.map((tool) => (
                      <SelectItem key={tool} value={tool}>
                        {tool}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {watchedValues.tools?.map((tool, index) => (
                    <Badge
                      key={`${tool}-${index}`}
                      className="cursor-pointer bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 px-3 py-1.5 gap-2 border shadow-sm"
                      onClick={() => onRemoveTool(index)}
                    >
                      <span className="size-1.25 rounded-full bg-indigo-500" />
                      <span className="text-xs font-semibold">{tool}</span>
                      <X className="size-3 opacity-60 hover:opacity-100" />
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
