export type ActionStatus =
  | "pending"
  | "approved"
  | "declined"
  | "executing"
  | "completed"
  | "failed";

export interface Action {
  _id: string;
  source: string;
  sourceId: string;
  type: string;
  status: ActionStatus;
  priority: "high" | "medium" | "low" | "ignore";
  title?: string;
  description?: string;
  payload: any;
  reasoning?: string;
  confidence?: number;
  executedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateActionStatusPayload {
  id: string;
  status: "approved" | "declined";
  payload?: any;
}

export interface EnhanceActionPayload {
  id: string;
  prompt: string;
}
