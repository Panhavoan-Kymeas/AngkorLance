import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import type { NavItem, Page } from "@/types/navigation";
import { useNavigate } from "react-router-dom";

interface PublicLayoutProps {
  children: React.ReactNode;
  pages: NavItem[];
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, pages }) => {
  const navigate = useNavigate();

  // Filter out login and signup from center tabs
  const centerTabs = pages.filter(
    (p) => p.key !== "login" && p.key !== "signup"
  );

  const handleNavigate = (page: Page) => {
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Pass only filtered pages to Navbar center tabs */}
      <Navbar pages={centerTabs} active="home" onNavigate={handleNavigate} />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;