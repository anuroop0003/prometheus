import * as z from "zod";

export const personaSchema = z.object({
  role: z.string().min(2, "Role is required"),
  company: z.string().min(2, "Organization is required"),
  projectKeywords: z.array(z.string()),
  tools: z.array(z.string()),
});

export type PersonaFormValues = z.infer<typeof personaSchema>;
