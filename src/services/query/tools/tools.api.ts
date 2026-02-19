import api from "@/services/instance/api";
import { useQuery } from "@tanstack/react-query";
import type { ToolsResponse } from "./tools.types";

export const useTools = () => {
  return useQuery<ToolsResponse>({
    queryKey: ["tools"],
    queryFn: async () => {
      const response = await api.get("/tools/connected");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
