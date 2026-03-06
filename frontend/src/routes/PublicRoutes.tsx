import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import LandingPage from "@/pages/public/LandingPage";
import About from "@/pages/public/AboutPage";
import { publicPages } from "@/types/navigation";
import BlogPage from "@/pages/public/BlogPage";
import PricingPage from "@/pages/public/PricingPage";
import CareerPage from "@/pages/public/CareerPage";
import ContactPage from "@/pages/public/ContactPage";

const companyName = "Angkorlance";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      {/* All public pages share this layout */}
      <Route element={<PublicLayout pages={publicPages} />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About companyName={companyName} />} />
        <Route path="/blog" element={<BlogPage />}/>
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/careers" element={<CareerPage />} /> 
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;