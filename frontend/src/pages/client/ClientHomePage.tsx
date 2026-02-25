import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyJobsApi } from "@/api/jobs";
import type { ClientJob } from "@/types/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, CheckCircle, FileText, Clock } from "lucide-react";

export default function ClientHomePage() {
  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobsApi()
      .then(setJobs)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading dashboard...</div>;

  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.status === "OPEN").length;
  const inProgressJobs = jobs.filter((j) => j.status === "IN_PROGRESS").length;
  const completedJobs = jobs.filter((j) => j.status === "COMPLETED").length;
  const completionPercent = totalJobs
    ? Math.round((completedJobs / totalJobs) * 100)
    : 0;

  const DASHBOARD_STEPS = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Create Jobs",
      desc: "Post jobs and attract skilled freelancers quickly.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Review Proposals",
      desc: "Evaluate freelancer applications and select the best fit.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Track Progress",
      desc: "Monitor ongoing projects and ensure deadlines are met.",
    },
  ];

  const getStatusVariant = (
    status: string,
  ): "outline" | "secondary" | "default" => {
    switch (status) {
      case "OPEN":
        return "outline";
      case "IN_PROGRESS":
        return "secondary";
      case "COMPLETED":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <section className="flex-1 flex flex-col space-y-16">
      {/* ================= HERO ================= */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-background to-muted/40 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Welcome back, <span className="text-primary">Client!</span>!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Manage your jobs, review proposals, and collaborate with freelancers
            seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <Link to="/client/jobs/create">
                <Plus className="w-5 h-5" />
                Create Job
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 hover:bg-primary hover:text-white transition-all"
            >
              <Link to="/client/jobs">
                <Eye className="w-5 h-5" />
                View All Jobs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 px-6 max-w-7xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalJobs}</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Open</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{openJobs}</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{inProgressJobs}</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedJobs}</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Completion %</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completionPercent}%</p>
          </CardContent>
        </Card>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Follow these steps to post jobs, review proposals, and successfully
            complete projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {DASHBOARD_STEPS.map((step, index) => (
            <Card
              key={index}
              className="border bg-background/70 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= RECENT JOBS ================= */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Recent Jobs</h2>

        {jobs.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {jobs.slice(0, 10).map((job) => (
              <Card
                key={job.id}
                className="flex-shrink-0 w-80 p-5 bg-white shadow-sm hover:shadow-md rounded-lg transition-shadow"
              >
                {/* Job Info */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Posted on: {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <Badge
                      variant={getStatusVariant(job.status)}
                      className="mt-2"
                    >
                      {job.status.replace("_", " ")}
                    </Badge>
                  </div>

                  {/* Action Button */}
                  <Button size="sm" variant="outline" asChild className="mt-4">
                    <Link
                      to={`/client/jobs/${job.id}`}
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Proposals
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No jobs yet. Start by creating a new job!
          </p>
        )}
      </section>
    </section>
  );
}
