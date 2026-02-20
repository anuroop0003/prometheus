import api from "@/services/instance/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Action, UpdateActionStatusPayload } from "./notifications.types";

export const useActions = (filter?: { status?: string; type?: string }) => {
  return useQuery<Action[]>({
    queryKey: ["actions", filter],
    queryFn: async () => {
      const { data } = await api.get("/actions", { params: filter });
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
