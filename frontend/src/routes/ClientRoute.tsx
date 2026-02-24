import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import ClientDashboardPage from "../pages/client/DashboardPage";
import type { AuthUser } from "../types/auth";

const ClientRoute: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "CLIENT") return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route
        path="dashboard"
        element={<ClientDashboardPage user={user as AuthUser} logout={logout} />}
      />
      <Route
        path="post-job"
        element={<div>Post Job Page (replace with component)</div>}
      />
      <Route
        path="profile"
        element={<div>Profile Page (replace with component)</div>}
      />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ClientRoute;