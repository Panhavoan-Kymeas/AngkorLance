// LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Users, MagnifyingGlass, ArrowRight } from "phosphor-react";
import { Button } from "@/components/ui/button";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

const LandingPage: React.FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Connect with top talent.
            <br />
            <span className="text-primary">Get work done effortlessly.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            The simplest way to find freelancers and get projects completed.
            Post jobs, receive proposals, and collaborate seamlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <Link to="/auth/register">
                <Users size={18} weight="bold" />
                Hire Talent
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-2xl"
            >
              <Link to="/auth/login">
                <MagnifyingGlass size={18} weight="bold" />
                Find Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= CTA ================= */}
      <section className="py-28 px-6 text-center bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join thousands of clients and freelancers already using AngkorLance to collaborate and succeed.
          </p>

          <Button
            asChild
            size="lg"
            className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
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