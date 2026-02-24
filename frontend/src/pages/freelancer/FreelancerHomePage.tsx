import { Link } from "react-router-dom";
import { Users, MagnifyingGlass, FileText, CheckCircle, Clock, ArrowRight } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AuthUser } from "@/types/auth";

interface FreelancerHomePageProps {
  user: AuthUser;
}

const HOW_IT_WORKS = [
  {
    icon: <FileText size={28} weight="bold" className="text-primary" />,
    title: "Find Projects Easily",
    desc: "Browse and apply to projects that match your skills and interests.",
  },
  {
    icon: <CheckCircle size={28} weight="bold" className="text-primary" />,
    title: "Submit Proposals",
    desc: "Send tailored proposals to clients and showcase your expertise.",
  },
  {
    icon: <Users size={28} weight="bold" className="text-primary" />,
    title: "Collaborate & Deliver",
    desc: "Work with clients seamlessly and complete projects successfully.",
  },
  {
    icon: <Clock size={28} weight="bold" className="text-primary" />,
    title: "Track Your Progress",
    desc: "Monitor your active projects, deadlines, and completed work.",
  },
];

export default function FreelancerHomePage({ user }: FreelancerHomePageProps) {
  return (
    <section className="flex-1 flex flex-col">
      {/* ================= HERO ================= */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Welcome back, <span className="text-primary">{user.name}</span>!
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore available jobs, submit proposals, and grow your freelance career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <Link to="/freelancer/browse-jobs">
                <MagnifyingGlass size={18} weight="bold" />
                Browse Jobs
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-2xl"
            >
              <Link to="/freelancer/profile">
                <Users size={18} weight="bold" />
                My Profile
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
            Follow these steps to find, apply, and succeed on freelance projects.
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
                <h3 className="font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 px-6 text-center bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start applying?
          </h2>

          <p className="text-muted-foreground text-lg mb-10">
            Browse jobs, submit proposals, and grow your freelance career with AngkorLance.
          </p>

          <Button
            asChild
            size="lg"
            className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <Link to="/freelancer/browse-jobs">
              Browse Jobs
              <ArrowRight size={18} weight="bold" />
            </Link>
          </Button>
        </div>
      </section>
    </section>
  );
}