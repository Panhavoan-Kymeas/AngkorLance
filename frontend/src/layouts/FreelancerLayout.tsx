import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { NavItem, Page } from "@/types/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import type { AuthUser } from "@/types/auth";

interface FreelancerLayoutProps {
  children: React.ReactNode;
  user: AuthUser;
  pages: NavItem[];
  onLogout: () => void;
  initialPage?: Page;
}

const FreelancerLayout: React.FC<FreelancerLayoutProps> = ({
  children,
  user,
  pages,
  onLogout,
  initialPage = "home",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Filter pages for center tabs (exclude some keys)
  const centerTabs = pages.filter(
    (p) => p.key !== "home" && p.key !== "dashboard" && p.key !== "profile"
  );

  // Initialize active page based on current URL
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

export default FreelancerLayout;