import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";

const AuthRoute: React.FC = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthRoute;