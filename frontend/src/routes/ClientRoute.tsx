import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ClientLayout from "../layouts/ClientLayout";

import ClientDashboard from "../pages/client/DashboardPage";

const ClientRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "CLIENT") return <Navigate to="/" replace />;

  return (
    <ClientLayout>
      <Routes>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ClientLayout>
  );
};

export default ClientRoute;