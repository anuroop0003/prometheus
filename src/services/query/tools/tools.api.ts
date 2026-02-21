import api from "@/services/instance/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ToolsResponse } from "./tools.types";

export const useTools = () => {
  return useQuery<ToolsResponse>({
    queryKey: ["tools"],
    queryFn: async () => {
      const { data } = await api.get("/tools/connected");
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
export const useDisconnectTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (toolId: string) => {
      const { data } = await api.delete(`/tools`, {
        params: { toolId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
};
