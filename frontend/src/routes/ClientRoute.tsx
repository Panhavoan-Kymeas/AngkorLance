import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ClientLayout from "../layouts/ClientLayout";

const ClientRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "CLIENT") return <Navigate to="/" replace />;

  return (
    <ClientLayout>
      <Outlet />
    </ClientLayout>
  );
};

export default ClientRoute;