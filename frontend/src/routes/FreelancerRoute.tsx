import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FreelancerLayout from "../layouts/FreelancerLayout";

import FreelancerDashboard from "../pages/freelancer/DashboardPage";
import BrowseJobsPage from "../pages/freelancer/BrowseJobsPage";

const FreelancerRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "FREELANCER") return <Navigate to="/" replace />;

  return (
    <FreelancerLayout>
      <Routes>
        <Route path="dashboard" element={<FreelancerDashboard />} />
        <Route path="browse-jobs" element={<BrowseJobsPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </FreelancerLayout>
  );
};

export default FreelancerRoute;