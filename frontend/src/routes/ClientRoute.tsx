import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import ClientLayout from "@/layouts/ClientLayout";
import type { AuthUser } from "@/types/auth";
import { clientPages } from "@/types/navigation";

// Placeholder pages
import ClientHomePage from "@/pages/client/ClientHomePage";
import ClientDashboardPage from "@/pages/client/DashboardPage";
import MyJobsPage from "@/pages/client/MyJobsPage";
import CreateJobPage from "@/pages/client/CreateJobPage";
import JobDetailPage from "@/pages/client/JobDetailPage";
import ProfilePage from "@/pages/client/ProfilePage";

const ClientRoute: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "CLIENT") return <Navigate to="/" replace />;

  return (
    <ClientLayout
      user={user as AuthUser}
      pages={clientPages}
      onLogout={logout}
      initialPage="home"
    >
      <Routes>
        {/* Client Home Page as index */}
        <Route index element={<ClientHomePage />} />

        {/* Other pages */}
        <Route path="dashboard" element={<ClientDashboardPage />} />
        <Route path="jobs" element={<MyJobsPage />} />
        <Route path="jobs/create" element={<CreateJobPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Catch-all redirect to ClientHomePage */}
        <Route path="*" element={<Navigate to="/client" replace />} />
      </Routes>
    </ClientLayout>
  );
};

export default ClientRoute;