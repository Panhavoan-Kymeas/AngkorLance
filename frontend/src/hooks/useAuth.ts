// src/hooks/useAuth.ts
import { useState } from "react";

export interface AuthUser {
  userId: number;
  name: string;
  role: "CLIENT" | "FREELANCER";
  token: string;
}

export const useAuth = () => {
  // Lazy initial state: read from localStorage only once
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, setUser, logout };
};