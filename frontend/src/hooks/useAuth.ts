// src/hooks/useAuth.ts
import { useState } from "react";

export const useAuth = () => {
  const [user] = useState({ role: "CLIENT", name: "John Doe" }); // mock user
  return { user, isAuthenticated: !!user };
};