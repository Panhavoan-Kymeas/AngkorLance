import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PRICING_PLANS = [
  {
    title: "Basic",
    price: "$0",
    features: [
      "Post up to 3 jobs per month",
      "Access to freelancer proposals",
      "Email support",
    ],
  },
  {
    title: "Pro",
    price: "$49/mo",
    features: [
      "Unlimited job postings",
      "Premium freelancer access",
      "Priority email support",
      "Analytics dashboard",
    ],
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Dedicated account manager",
      "Custom workflow integrations",
      "Team collaboration tools",
      "Advanced analytics & reporting",
    ],
  },
];

const PricingPage: React.FC = () => {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-lg text-muted-foreground">
          Choose a plan that fits your business needs. Simple, transparent, and scalable pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.title}
            className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border bg-background/80 backdrop-blur-sm"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>

              <ul className="mb-6 text-sm text-muted-foreground space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingPage;