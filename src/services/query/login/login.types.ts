export type LoginPayload = {
  name: string;
  email: string;
  password: string;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  preferences: {
    autoExecuteActions: boolean;
  };
  isPersonaCreated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserProfileResponse {
  message: string;
  user: User;
}
