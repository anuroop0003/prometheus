import api from "@/services/instance/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Action } from "./notifications.types";

export const useActions = () => {
  return useQuery<Action[]>({
    queryKey: ["actions"],
    queryFn: async () => {
      const { data } = await api.get("/actions");
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useApproveAction = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Action,
    Error,
    { action_id: string; source: string; type: string }
  >({
    mutationFn: async (payloadData) => {
      const { data } = await api.post(`/actions/approve`, payloadData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
  });
};

export const useDeclineAction = () => {
  const queryClient = useQueryClient();

  return useMutation<Action, Error, { action_id: string; remark: string }>({
    mutationFn: async ({ action_id, remark }) => {
      const { data } = await api.post(`/actions/delete`, {
        action_id,
        remark,
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
    { message: string; action: Action },
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

export const useUpdateActionPayload = () => {
  const queryClient = useQueryClient();

  return useMutation<Action, Error, { id: string; payload: any }>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await api.post(`/actions/${id}`, { payload });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
  });
};
