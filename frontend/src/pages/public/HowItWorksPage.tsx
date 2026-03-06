import React from "react";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "phosphor-react";

const HowItWorksPage: React.FC = () => {
  return (
    <>
      {/* Page Header */}
      <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How AngkorLance Works
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how clients and freelancers collaborate seamlessly on our platform.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Call To Action */}
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

export default HowItWorksPage;