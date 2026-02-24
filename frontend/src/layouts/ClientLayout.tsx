import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import SidebarClient from "@/components/Sidebar/SidebarClient";
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
  const [activePage, setActivePage] = useState<Page>(initialPage);
  const navigate = useNavigate();

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar visible only on dashboard */}
      {activePage === "dashboard" && (
        <SidebarClient
          activePage={activePage}
          pages={pages}
          onNavigate={handleNavigate}
        />
      )}

      <div className="flex-1 flex flex-col">
        <Navbar
          pages={pages}
          active={activePage}
          onNavigate={handleNavigate}
          user={user}
          onLogout={onLogout}
        />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;