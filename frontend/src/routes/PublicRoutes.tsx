import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import LandingPage from "@/pages/public/LandingPage";
import About from "@/pages/public/AboutPage";
import BlogPage from "@/pages/public/BlogPage";
import PricingPage from "@/pages/public/PricingPage";
import CareerPage from "@/pages/public/CareerPage";
import ContactPage from "@/pages/public/ContactPage";
import HowItWorksPage from "@/pages/public/HowItWorksPage";

const companyName = "AngkorLance";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About companyName={companyName} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;