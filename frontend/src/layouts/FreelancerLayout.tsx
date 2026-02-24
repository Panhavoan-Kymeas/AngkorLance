import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { NavItem, Page } from "@/types/navigation";
import Navbar from "@/components/Navbar/Navbar";
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
  const [activePage, setActivePage] = useState<Page>(initialPage);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync active page with current URL
  useEffect(() => {
    const matched = pages.find((p) => p.path === location.pathname);
    if (matched) {
      setActivePage(matched.key);
    }
  }, [location.pathname, pages]);

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar
        pages={pages}
        active={activePage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={onLogout}
      />

      {/* Main content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>

      {/* Footer */}
      <footer className="w-full border-t bg-white text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AngkorLance. All rights reserved.
      </footer>
    </div>
  );
};

export default FreelancerLayout;