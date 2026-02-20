import api from "@/services/instance/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { PersonaPayload, PersonaResponse } from "./persona.types";

export const useGetPersona = () => {
  return useQuery<PersonaResponse, Error>({
    queryKey: ["persona"],
    queryFn: async () => {
      const { data } = await api.get("/user/persona");
      return data;
    },
  });
};

export const useCreatePersona = () => {
  return useMutation<{ message: string }, Error, PersonaPayload>({
    mutationKey: ["create-persona"],
    mutationFn: (payload) => api.post("/user/persona", payload),
  });
};
