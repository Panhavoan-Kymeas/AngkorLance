import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import { useAuth } from "../contexts/useAuth";

const AuthRoute: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    const redirectPath =
      user.role === "CLIENT"
        ? "/client"
        : user.role === "FREELANCER"
          ? "/freelancer"
          : "/";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default AuthRoute;
