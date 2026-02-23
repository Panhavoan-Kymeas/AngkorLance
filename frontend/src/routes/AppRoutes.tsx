import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/HomePage";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";

import ClientRoute from "./ClientRoute";
import FreelancerRoute from "./FreelancerRoute";
import AuthRoute from "./AuthRoute";

import ClientDashboard from "../pages/client/DashboardPage";
import FreelancerDashboard from "../pages/freelancer/DashboardPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Client Routes */}
      <Route element={<ClientRoute />}>
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        {/* Add more client pages here */}
      </Route>

      {/* Freelancer Routes */}
      <Route element={<FreelancerRoute />}>
        <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
        {/* Add more freelancer pages here */}
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;