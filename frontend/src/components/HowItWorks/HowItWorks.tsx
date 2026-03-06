import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Users, Clock } from "phosphor-react";

/* Define the steps for How It Works */
const DEFAULT_STEPS = [
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

/* Props interface to allow custom steps */
interface HowItWorksProps {
  steps?: typeof DEFAULT_STEPS;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ steps = DEFAULT_STEPS }) => {
  return (
    <section className="py-28 px-6 bg-muted/30">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg">
          A simple, streamlined process to connect clients with freelancers.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
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
  );
};

export default HowItWorks;