import { createContext } from "react";
import type { AuthUser } from "../types/auth";

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  login: (user: AuthUser) => void;
  logout: () => void;
}

// Create and export context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);