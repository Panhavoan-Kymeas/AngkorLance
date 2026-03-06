import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { publicPages, freelancerPages, clientPages } from "@/types/navigation";
import type { NavItem, Page } from "@/types/navigation";

const PublicLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /** Decide which pages navbar should show */
  let pages: NavItem[] = publicPages;

  if (user?.role === "FREELANCER") pages = freelancerPages;
  else if (user?.role === "CLIENT") pages = clientPages;

  /** Filter center tabs for navbar: hide login/signup and Dashboard/Profile */
  const centerTabs = pages.filter(
    (p) => !["login", "signup", "dashboard", "profile"].includes(p.key)
  );

  /** Determine active page from current URL */
  const initialActivePage: Page =
    pages.find((p) => p.path === location.pathname)?.key ?? "home";

  const [activePage, setActivePage] = React.useState<Page>(initialActivePage);

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with role-aware pages, avatar still visible */}
      <Navbar
        pages={centerTabs}
        active={activePage}
        onNavigate={handleNavigate}
        user={user ?? undefined} // show avatar if logged in
        onLogout={logout}
      />

      {/* Render page content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;