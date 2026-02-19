import api from "@/services/instance/api";
import { useQuery } from "@tanstack/react-query";
import type { Tool } from "@/pages/home/constant/tools.config";

export interface ToolsResponse {
  availableTools: Tool[];
}

export const useTools = () => {
  return useQuery<ToolsResponse>({
    queryKey: ["tools"],
    queryFn: async () => {
      const response = await api.get("/tools/connected");
      return response.data;
    },
  });
};
