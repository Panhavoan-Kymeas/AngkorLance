import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import FreelancerLayout from "@/layouts/FreelancerLayout";
import FreelancerHomePage from "../pages/freelancer/FreelancerHomePage";
import FreelancerDashboardPage from "../pages/freelancer/DashboardPage";
import JobDetailPage from "@/pages/freelancer/JobDetailPage";
import BrowseJobsPage from "@/pages/freelancer/BrowseJobsPage";
import MyProposalPage from "@/pages/freelancer/MyProposalsPage";
import { freelancerPages } from "@/types/navigation";
import type { AuthUser } from "../types/auth";
import ProfilePage from "@/pages/freelancer/ProfilePage";

const FreelancerRoute: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "FREELANCER") return <Navigate to="/" replace />;

  return (
    <FreelancerLayout
      user={user as AuthUser}
      pages={freelancerPages}
      onLogout={logout}
      initialPage="home"
    >
      <Routes>
        {/* Freelancer home page */}
        <Route index element={<FreelancerHomePage user={user as AuthUser} />} />

        {/* Other pages */}
        <Route
          path="dashboard"
          element={
            <FreelancerDashboardPage user={user as AuthUser} logout={logout} />
          }
        />
        <Route path="browse-jobs" element={<BrowseJobsPage />} />
        <Route path="jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/proposals" element={<MyProposalPage />} />

        <Route path="profile" element={<ProfilePage />} />

        {/* Catch-all redirects to homepage */}
        <Route path="*" element={<Navigate to="/freelancer" replace />} />
      </Routes>
    </FreelancerLayout>
  );
};

export default FreelancerRoute;
