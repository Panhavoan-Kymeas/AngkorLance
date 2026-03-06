import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import type { NavItem, Page } from "@/types/navigation";
import { useNavigate, Outlet } from "react-router-dom";

interface PublicLayoutProps {
  pages: NavItem[];
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ pages }) => {
  const navigate = useNavigate();

  const centerTabs = pages.filter((p) => p.key !== "login" && p.key !== "signup");

  const handleNavigate = (page: Page) => {
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar pages={centerTabs} active="home" onNavigate={handleNavigate} />
      <main className="flex-1 p-6">
        <Outlet /> {/* Page content will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;