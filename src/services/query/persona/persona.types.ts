export interface Persona {
  role: string;
  company: string;
  projectKeywords: string[];
  tools: string[];
}

export type PersonaPayload = Persona;

export interface PersonaResponse {
  message: string;
  persona: Persona;
}
