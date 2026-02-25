import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import type { NavItem, Page } from "@/types/navigation";
import type { AuthUser } from "@/types/auth";

interface ClientLayoutProps {
  children: React.ReactNode;
  user: AuthUser;
  pages: NavItem[];
  initialPage?: Page;
  onLogout: () => void;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  user,
  pages,
  initialPage = "dashboard",
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Filter pages for center tabs (exclude some keys)
  const centerTabs = pages.filter(
    (p) => p.key !== "home" && p.key !== "dashboard" && p.key !== "profile" && p.key !== "edit_job" && p.key !== "job-detail"
  );

  // Determine the initial active page from URL or default
  const initialActivePage =
    pages.find((p) => p.path === location.pathname)?.key ?? initialPage;

  const [activePage, setActivePage] = useState<Page>(initialActivePage);

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar
        pages={centerTabs}
        active={activePage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={onLogout}
      />

      {/* Main content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClientLayout;