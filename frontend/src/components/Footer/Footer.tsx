import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 space-y-12">

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
              <Button variant="link" className="p-0 h-auto justify-start">
                Browse Jobs
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                Post a Job
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                Pricing
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                How it Works
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Button variant="link" className="p-0 h-auto justify-start">
                About
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                Careers
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                Blog
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                Contact
              </Button>
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
              <Input placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} FreelanceHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="link" className="p-0 h-auto">
              Terms
            </Button>
            <Button variant="link" className="p-0 h-auto">
              Privacy
            </Button>
            <Button variant="link" className="p-0 h-auto">
              Cookies
            </Button>
          </div>
        </div>

      </div>
    </footer>
  )
}