// src/pages/About.tsx
import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

// Define prop types
interface AboutProps {
  companyName: string
}

const About: React.FC<AboutProps> = ({ companyName }) => {
  return (
    <main className="bg-background min-h-screen">

      {/* Hero Section */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Briefcase className="h-6 w-6" />
          <h1 className="text-3xl font-bold">About {companyName}</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          At {companyName}, our mission is to connect talented freelancers with clients worldwide. 
          We help professionals build their careers, and help businesses hire smarter and faster.
        </p>
      </section>

      <Separator className="my-12" />

      {/* Our Story / Vision */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground">
            {companyName} started with a simple idea: to make freelance work accessible, reliable, and professional. 
            We wanted to bridge the gap between skilled freelancers and businesses that need their expertise.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-muted-foreground">
            We aim to empower freelancers to grow their careers and enable companies to find the best talent efficiently. 
            {companyName} focuses on trust, transparency, and growth for everyone involved.
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Call-to-Action */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Join {companyName} Today</h2>
        <p className="text-muted-foreground mb-6">
          Whether you're a freelancer looking for opportunities or a company looking for talent, we're here to help.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
          <Link to="/post-job">
            <Button variant="outline">Post a Job</Button>
          </Link>
        </div>
      </section>

    </main>
  )
}

export default About