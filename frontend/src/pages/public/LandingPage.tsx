// LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MagnifyingGlass,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
} from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HOW_IT_WORKS = [
  {
    icon: <FileText size={28} weight="bold" className="text-primary" />,
    title: "Post Jobs Easily",
    desc: "Create detailed job listings with categories, budgets, and requirements in minutes.",
  },
  {
    icon: <CheckCircle size={28} weight="bold" className="text-primary" />,
    title: "Receive Proposals",
    desc: "Get tailored proposals from skilled freelancers ready to bring your vision to life.",
  },
  {
    icon: <Users size={28} weight="bold" className="text-primary" />,
    title: "Choose & Collaborate",
    desc: "Review proposals, select the best fit, and work together to complete your project.",
  },
  {
    icon: <Clock size={28} weight="bold" className="text-primary" />,
    title: "Track Progress",
    desc: "Monitor job status from open to in-progress to completed — all in one place.",
  },
];

const LandingPage: React.FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Connect with top talent.
            <br />
            <span className="text-primary">
              Get work done effortlessly.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            The simplest way to find freelancers and get projects completed.
            Post jobs, receive proposals, and collaborate seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <Link to="/auth/register">
                <Users size={18} weight="bold" />
                Hire Talent
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="gap-2 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-2xl">
              <Link to="/auth/login">
                <MagnifyingGlass size={18} weight="bold" />
                Find Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-28 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple, streamlined process to connect clients with freelancers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {HOW_IT_WORKS.map((step, index) => (
            <Card
              key={index}
              className="border bg-background/70 backdrop-blur-sm
                         transition-all duration-300
                         hover:shadow-2xl hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 px-6 text-center bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join thousands of clients and freelancers already using AngkorLance to collaborate and succeed.
          </p>

          <Button asChild size="lg" className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Link to="/auth/register">
              Create Your Account
              <ArrowRight size={18} weight="bold" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;