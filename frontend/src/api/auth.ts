import api from "./api";
import type {
  RegisterPayload,
  LoginPayload,
  ApiResponse,
  AuthUser,
} from "../types/auth";

export const registerApi = async (data: RegisterPayload): Promise<string> => {
  const res = await api.post<string>("/auth/register", data);
  return res.data;
};

export const loginApi = async (
  data: LoginPayload,
): Promise<ApiResponse<AuthUser>> => {
  const res = await api.post<ApiResponse<AuthUser>>("/auth/login", data);
  return res.data;
};
