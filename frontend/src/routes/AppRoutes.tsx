import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import AuthRoute from "./AuthRoute";
import ClientRoute from "./ClientRoute";
import FreelancerRoute from "./FreelancerRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes */}
      <Route path="/*" element={<AuthRoute />} />

      {/* Client routes */}
      <Route path="/client/*" element={<ClientRoute />} />

      {/* Freelancer routes */}
      <Route path="/freelancer/*" element={<FreelancerRoute />} />

      {/* Fallback 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;