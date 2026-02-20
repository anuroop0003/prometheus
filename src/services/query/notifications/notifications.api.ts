import api from "@/services/instance/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Action, UpdateActionStatusPayload } from "./notifications.types";

export const useActions = () => {
  return useQuery<Action[]>({
    queryKey: ["actions"],
    queryFn: async () => {
      const { data } = await api.get("/actions");
      return data;
    },
  });
};

export const useUpdateActionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Action, Error, UpdateActionStatusPayload>({
    mutationFn: async ({ id, status, payload }) => {
      const { data } = await api.post(`/actions/${id}/status`, {
        status,
        payload,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
  });
};

export const useEnhanceAction = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; enhacement: { enhancedPayload: Action } },
    Error,
    { id: string; description: string }
  >({
    mutationFn: async ({ id, description }) => {
      const { data } = await api.post(`/actions/enhance/${id}`, {
        description,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
  });
};
