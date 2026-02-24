export type Role = "CLIENT" | "FREELANCER";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  token: string;
  expiresAt: number;
  userId: number;
  name: string;
  role: Role;
  email?: string;       
  avatarUrl?: string; 
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
}