import React from "react";
import type { NavItem, Page } from "@/types/navigation";

export interface SidebarProps {
  activePage: Page;
  pages: NavItem[];
  onNavigate: (page: Page) => void;
}

const SidebarClient: React.FC<SidebarProps> = ({ activePage, pages, onNavigate }) => {
  return (
    <div className="w-64 h-full bg-gray-100 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Client Menu</h2>
      <nav className="flex flex-col gap-2">
        {pages.map((page) => (
          <div
            key={page.key}
            onClick={() => onNavigate(page.key)}
            className={`p-2 rounded cursor-pointer ${
              activePage === page.key ? "bg-gray-200 font-bold" : "hover:bg-gray-50"
            }`}
          >
            {page.label}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SidebarClient;