export interface Tool {
  id: string;
  name: string;
  description: string;
  category: "actions" | "communication";
  icon: string;
  services: string[];
  status: "available" | "coming_soon" | "connected";
}

export interface ToolsResponse {
  tools: Tool[];
}
