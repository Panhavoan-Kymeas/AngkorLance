import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../contexts/useAuth";

import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";

const AuthRoute: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    const redirectPath =
      user.role === "CLIENT"
        ? "/client/"
        : user.role === "FREELANCER"
        ? "/freelancer" 
        : "/";
    return <Navigate to={redirectPath} replace />;
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