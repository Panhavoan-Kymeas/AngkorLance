import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

type Page = "home" | "jobs" | "post-job" | "login" | "signup"

interface NavbarProps {
  active: Page
  onNavigate: (page: Page) => void
}

const pages: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "jobs", label: "Browse Jobs" },
  { key: "post-job", label: "Post a Job" },
]

export default function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <div
          onClick={() => onNavigate("home")}
          className="flex cursor-pointer items-center gap-2 text-lg font-semibold"
        >
          <Briefcase className="h-5 w-5" />
          <span>FreelanceHub</span>
        </div>

        {/* Center Tabs */}
        <div className="hidden md:flex items-center gap-2">
          {pages.map((page) => (
            <Button
              key={page.key}
              variant="ghost"
              onClick={() => onNavigate(page.key)}
              className={cn(
                "text-sm font-medium",
                active === page.key && "bg-muted"
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
            onClick={() => onNavigate("login")}
          >
            Log in
          </Button>

          <Button
            onClick={() => onNavigate("signup")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}