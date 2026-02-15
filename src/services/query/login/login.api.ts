import api from "@/services/instance/api";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "./login.types";

export const useLogin = () => {
  return useMutation<{ detail: string }, { detail: string }, LoginPayload>({
    mutationKey: ["login"],
    mutationFn: (payload) => api.post("user/login", payload),
  });
};
