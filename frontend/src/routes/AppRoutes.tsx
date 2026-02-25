import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import AuthRoute from "./AuthRoute";
import ClientRoute from "./ClientRoute";
import FreelancerRoute from "./FreelancerRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth pages */}
      <Route path="/auth/*" element={<AuthRoute />} />

      {/* Client pages */}
      <Route path="/client/*" element={<ClientRoute />} />

      {/* Freelancer pages */}
      <Route path="/freelancer/*" element={<FreelancerRoute />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;