import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FreelancerLayout from "../layouts/FreelancerLayout";

const FreelancerRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "FREELANCER") return <Navigate to="/" replace />;

  return (
    <FreelancerLayout>
      <Outlet />
    </FreelancerLayout>
  );
};

export default FreelancerRoute;