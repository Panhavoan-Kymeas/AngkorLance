import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import type { ChangeEvent } from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  const [email, setEmail] = useState<string>("")

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  // Handle newsletter subscription
  const handleSubscribe = (): void => {
    if (!email) {
      alert("Please enter your email")
      return
    }
    // Replace with your subscription API call
    alert(`Subscribed with ${email}`)
    setEmail("")
  }

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto px-4 py-12 w-full max-w-7xl">

        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Briefcase className="h-5 w-5" />
              <span>Angkorlance</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting talented freelancers with clients worldwide.
              Build your career, hire smarter, and grow faster.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Product
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/jobs">
                <Button variant="link" className="p-0 h-auto justify-start">
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/post-job">
                <Button variant="link" className="p-0 h-auto justify-start">
                  Post a Job
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="link" className="p-0 h-auto justify-start">
                  Pricing
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="link" className="p-0 h-auto justify-start">
                  How it Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about">
                <Button variant="link" className="p-0 h-auto justify-start">
                  About
                </Button>
              </Link>
              <Link to="/careers">
                <Button variant="link" className="p-0 h-auto justify-start">
                  Careers
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="link" className="p-0 h-auto justify-start">
                  Blog
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="link" className="p-0 h-auto justify-start">
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Subscribe
            </h4>
            <p className="text-sm text-muted-foreground">
              Get product updates and job alerts.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
              />
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms">
              <Button variant="link" className="p-0 h-auto">Terms</Button>
            </Link>
            <Link to="/privacy">
              <Button variant="link" className="p-0 h-auto">Privacy</Button>
            </Link>
            <Link to="/cookies">
              <Button variant="link" className="p-0 h-auto">Cookies</Button>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}