import api from "@/services/instance/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginPayload, UserProfileResponse } from "./login.types";

export const useLogin = () => {
  return useMutation<{ detail: string }, { detail: string }, LoginPayload>({
    mutationKey: ["login"],
    mutationFn: (payload) => api.post("/user/signin", payload),
  });
};

export const useUserProfile = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await api.get("/user/profile");
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
