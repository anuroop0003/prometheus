import api from "@/services/instance/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Action, UpdateActionStatusPayload } from "./notifications.types";

export const useActions = (filter?: { status?: string; type?: string }) => {
  return useQuery<Action[]>({
    queryKey: ["actions", filter],
    queryFn: async () => {
      const response = await api.get("/actions", { params: filter });
      return response.data;
    },
  });
};

export const useUpdateActionStatus = () => {
    const queryClient = useQueryClient();
    
    return useMutation<Action, Error, UpdateActionStatusPayload>({
        mutationFn: async ({ id, status }) => {
            const response = await api.post(`/actions/${id}/status`, { status });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        }
    });
};
