import api from "@/services/instance/api";
import { useMutation } from "@tanstack/react-query";
import type {
  ConnectToolPayload,
  ConnectToolResponse,
} from "./subscriptions.types";

export const useConnectTool = () => {
  return useMutation<ConnectToolResponse, Error, ConnectToolPayload>({
    mutationFn: async ({ provider, toolId }) => {
      const response = await api.get(`/subscription/${provider}`, {
        params: {
          toolId: toolId,
        },
      });
      return response.data;
    },
  });
};
