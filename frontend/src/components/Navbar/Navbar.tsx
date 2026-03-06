import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import type { NavItem, Page } from "@/types/navigation";
import { useAuth } from "@/contexts/useAuth";

interface NavbarProps {
  pages: NavItem[];
  active: Page;
  onNavigate: (page: Page) => void;
  user?: { name: string; role: string }; 
  onLogout?: () => void;
}

export default function Navbar({ pages, active, onNavigate, user, onLogout }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const auth = useAuth();
  const currentUser = user ?? auth.user;
  const handleLogout = onLogout ?? auth.logout;

  const handleClick = (page: Page) => {
    onNavigate(page);
    const navItem = pages.find((p) => p.key === page);
    if (navItem) navigate(navItem.path);
  };

  return (
    <nav className="w-full border-b bg-background sticky top-0 z-50">
      <div className="flex justify-center w-full">
        <div className="flex items-center justify-between h-16 px-4 w-full max-w-7xl">
          {/* Logo */}
          <div
            onClick={() => handleClick("home")}
            className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
          >
            <Briefcase className="h-5 w-5" />
            <span>AngkorLance</span>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center gap-2">
            {pages.map((page) => (
              <Button
                key={page.key}
                variant="ghost"
                onClick={() => handleClick(page.key)}
                className={cn("text-sm font-medium", active === page.key && "bg-muted text-primary")}
              >
                {page.label}
              </Button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 relative">
            {currentUser ? (
              <div className="relative">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center cursor-pointer font-semibold shadow-md hover:scale-105 transition-transform duration-200"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title={currentUser.name}
                >
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    <Button
                      variant="ghost"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleClick("profile")}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleClick("login")}
                  className="text-sm font-medium"
                >
                  Log in
                </Button>
                <Button onClick={() => handleClick("signup")} className="text-sm font-medium">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}