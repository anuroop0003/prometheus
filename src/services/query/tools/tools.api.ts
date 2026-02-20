import api from "@/services/instance/api";
import { useQuery } from "@tanstack/react-query";
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
