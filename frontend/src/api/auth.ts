import api from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "CLIENT" | "FREELANCER";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    expiresAt: number;
    userId: number;
    name: string;
    role: "CLIENT" | "FREELANCER";
  };
}

export const registerApi = async (data: RegisterPayload) => {
  const res = await api.post("/auth/register", data);
  return res.data; // returns backend response
};

export const loginApi = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data; // returns { success, message, data }
};