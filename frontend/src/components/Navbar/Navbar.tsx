import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Page = "home" | "jobs" | "post-job" | "login" | "signup";

interface NavbarProps {
  active: Page
  onNavigate: (page: Page) => void
}

const pages: { key: Page; label: string; path: string }[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "jobs", label: "Browse Jobs", path: "/jobs" },
  { key: "post-job", label: "Post a Job", path: "/post-job" },
]

export default function Navbar({ active, onNavigate }: NavbarProps) {
  const navigate = useNavigate()

  const handleClick = (page: Page, path: string) => {
    onNavigate(page) 
    navigate(path)   
  }

  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div
          onClick={() => handleClick("home", "/")}
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
              onClick={() => handleClick(page.key, page.path)}
              className={cn(
                "text-sm font-medium",
                active === page.key && "bg-muted text-primary"
              )}
            >
              {page.label}
            </Button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => handleClick("login", "/login")}
            className="text-sm font-medium"
          >
            Log in
          </Button>

          <Button
            onClick={() => handleClick("signup", "/register")}
            className="text-sm font-medium"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}