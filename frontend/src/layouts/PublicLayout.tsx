import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import type { NavItem, Page } from "@/types/navigation";

interface PublicLayoutProps {
  pages: NavItem[];
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ pages }) => {
  const { user, logout } = useAuth();

  // Filter center tabs (hide login/signup in center tabs)
  const centerTabs = pages.filter((p) => p.key !== "login" && p.key !== "signup");

  const handleNavigate = (page: Page) => {
    const navItem = pages.find((p) => p.key === page);
    if (navItem) window.location.href = navItem.path; // simple navigation fallback
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with filtered pages and auth */}
      <Navbar
        pages={centerTabs}
        active="home"
        onNavigate={handleNavigate}
        user={user ?? undefined}
        onLogout={logout}
      />

      {/* Page content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;