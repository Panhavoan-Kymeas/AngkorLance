import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";

const AuthRoute: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "CLIENT") return <Navigate to="/client/dashboard" replace />;
    if (user.role === "FREELANCER") return <Navigate to="/freelancer/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoute;