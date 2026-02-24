import MainLayout from "../../../layouts/PublicLayout"
import {
  Users,
  MagnifyingGlass,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
} from "phosphor-react"

const HOW_IT_WORKS = [
  {
    icon: <FileText size={32} weight="bold" className="text-primary" />,
    title: "Post Jobs Easily",
    desc: "Create detailed job listings with categories, budgets, and requirements in minutes.",
  },
  {
    icon: <CheckCircle size={32} weight="bold" className="text-primary" />,
    title: "Receive Proposals",
    desc: "Get tailored proposals from skilled freelancers ready to bring your vision to life.",
  },
  {
    icon: <Users size={32} weight="bold" className="text-primary" />,
    title: "Choose & Collaborate",
    desc: "Review proposals, select the best fit, and work together to complete your project.",
  },
  {
    icon: <Clock size={32} weight="bold" className="text-primary" />,
    title: "Track Progress",
    desc: "Monitor job status from open to in-progress to completed — all in one place.",
  },
]

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero py-20 px-6 text-center bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Connect with top talent.<br />
          <span className="text-primary">Get work done.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          The simplest way to find freelancers and get projects completed. Post jobs, receive proposals, and collaborate seamlessly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn-primary flex items-center gap-2 justify-center">
            <Users size={20} weight="bold" /> Hire Talent <ArrowRight size={20} weight="bold" />
          </button>
          <button className="btn-outline flex items-center gap-2 justify-center">
            <MagnifyingGlass size={20} weight="bold" /> Find Work
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            A simple, streamlined process to connect clients with freelancers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {HOW_IT_WORKS.map((step, index) => (
            <div
              key={index}
              className="card p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="card-icon mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-section py-20 px-6 text-center bg-primary/5">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Join thousands of clients and freelancers already using FreelanceHub to work together.
        </p>
        <button className="btn-primary flex items-center gap-2 justify-center mx-auto">
          Create Your Account <ArrowRight size={20} weight="bold" />
        </button>
      </section>
    </MainLayout>
  )
}