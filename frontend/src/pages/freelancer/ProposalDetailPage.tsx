import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { FreelancerProposalResponse, JobStatus, ProposalStatus } from "@/types/proposal";
import { getMyProposalsApi } from "@/api/proposals";
import { fetchJobDetailApi } from "@/api/jobs";

interface JobDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: JobStatus;
  jobImage?: string | null;
  createdAt: string;
}

export default function FreelancerProposalDetailPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [proposal, setProposal] = useState<FreelancerProposalResponse | null>(null);
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const proposalIdNum = Number(proposalId);

  // Validate proposalId
  useEffect(() => {
    if (isNaN(proposalIdNum)) {
      toast({ title: "Error", description: "Invalid proposal ID." });
      navigate("/freelancer/proposals");
    }
  }, [proposalIdNum, toast, navigate]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Get all proposals of freelancer
        const myProposals = await getMyProposalsApi();
        const p = myProposals.find(p => p.proposalId === proposalIdNum);

        if (!p) {
          toast({ title: "Error", description: "Proposal not found." });
          navigate("/freelancer/proposals");
          return;
        }
        setProposal(p);

        // Fetch job details
        const jobDetail = await fetchJobDetailApi(p.jobId);
        setJob(jobDetail);
      } catch (err: any) {
        console.error(err);
        toast({ title: "Error", description: err.response?.data?.message || "Failed to load proposal details." });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [proposalIdNum, toast, navigate]);

  const getJobStatusVariant = (status: JobStatus) => {
    switch (status) {
      case "OPEN": return "outline";
      case "IN_PROGRESS": return "secondary";
      case "COMPLETED": return "default";
      case "CANCELLED": return "destructive";
      default: return "default";
    }
  };

  const getProposalStatusVariant = (status: ProposalStatus) => {
    switch (status) {
      case "PENDING": return "outline";
      case "ACCEPTED": return "secondary";
      case "REJECTED": return "destructive";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-muted-foreground">
        Loading proposal details...
      </div>
    );
  }

  if (!proposal || !job) {
    return (
      <div className="text-center py-20 text-lg text-muted-foreground">
        Proposal not found.
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-16 px-6 space-y-8">
      {/* Back Button */}
      <Button onClick={() => navigate("/freelancer/proposals")}>
        Back to My Proposals
      </Button>

      {/* Job Card */}
      <Card className="shadow-md rounded-xl overflow-hidden">
        {job.jobImage && (
          <img
            src={job.jobImage}
            alt={job.title}
            className="w-full h-64 object-cover md:rounded-t-xl"
          />
        )}
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge variant={getJobStatusVariant(job.status)} className="text-sm">
              {job.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{job.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Category: {job.category}</Badge>
            <Badge variant="outline">Budget: ${job.budget}</Badge>
            <Badge variant="outline">
              Created: {new Date(job.createdAt).toLocaleDateString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Proposal Card */}
      <Card className="shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h2 className="text-2xl font-semibold">Your Proposal</h2>
            <Badge variant={getProposalStatusVariant(proposal.status)} className="text-sm">
              {proposal.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">Proposed: ${proposal.proposedBudget}</Badge>
            <Badge variant="secondary">Job Status: {job.status}</Badge>
            <Badge variant="outline">Proposal ID: {proposal.proposalId}</Badge>
          </div>

          <p className="text-muted-foreground mt-4">
            {proposal.status === "PENDING"
              ? "Waiting for client response."
              : "Proposal decision received."}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}