import { useState } from "react";

{/*
  
  export const useAuth = () => {
  const [user] = useState({ role: "CLIENT", name: "John Doe" }); // mock user
  return { user, isAuthenticated: !!user };
};

*/}

export const useAuth = () => {
  const [user] = useState<{ role: string; name: string } | null>(null); // not logged in
  return { user, isAuthenticated: !!user };
};