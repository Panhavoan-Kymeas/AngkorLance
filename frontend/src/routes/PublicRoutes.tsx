import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import LandingPage from "@/pages/public/LandingPage";
import About from "@/pages/public/AboutPage";
import { publicPages } from "@/types/navigation";

const companyName = "Angkorlance";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      {/* All public pages share this layout */}
      <Route element={<PublicLayout pages={publicPages} />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About companyName={companyName} />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;