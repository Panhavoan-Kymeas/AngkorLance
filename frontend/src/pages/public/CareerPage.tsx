import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase } from "phosphor-react";

interface JobOpening {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    description: "Work with React and Tailwind to build modern web applications.",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Phnom Penh, Cambodia",
    type: "Full-time",
    description: "Build robust APIs and manage database architectures.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Part-time",
    description: "Design intuitive and beautiful user interfaces.",
  },
];

const CareerPage: React.FC = () => {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join Our Team
        </h1>
        <p className="text-lg text-muted-foreground">
          At AngkorLance, we are always looking for talented individuals to grow with us. Explore our current openings below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {JOB_OPENINGS.map((job) => (
          <Card
            key={job.id}
            className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <CardContent className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Briefcase size={20} weight="bold" />
                  <span className="font-semibold">{job.type}</span>
                </div>
                <h2 className="text-lg font-bold mb-1">{job.title}</h2>
                <p className="text-sm text-muted-foreground mb-3">{job.location}</p>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-4 w-full hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/careers/${job.id}`}>Apply Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-20 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Can't find the right role?
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          We are always open to talented individuals. Send us your resume, and we'll reach out when a suitable opportunity arises.
        </p>
        <Button
          asChild
          size="lg"
          className="gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <Link to="/auth/contact">Submit Your Resume</Link>
        </Button>
      </section>
    </section>
  );
};

export default CareerPage;