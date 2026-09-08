import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { FreelancerProposalResponse, JobStatus, ProposalStatus } from "@/types/proposal";
import { getMyProposalsApi } from "@/api/proposals";
import { fetchJobDetailApi } from "@/api/jobs";
import type { JobDetail } from "@/types/jobs";
import { assetUrl } from "@/lib/assets";
import { categoryLabel } from "@/lib/categories";
import { parseApiError } from "@/lib/apiError";

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
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to load proposal details.") });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [proposalIdNum, toast, navigate]);

  const getJobStatusVariant = (status: JobStatus) => {
    switch (status) {
      case "OPEN": return "outline" as const;
      case "IN_PROGRESS": return "secondary" as const;
      default: return "default" as const;
    }
  };

  const getProposalStatusVariant = (status: ProposalStatus) => {
    switch (status) {
      case "PENDING": return "outline" as const;
      case "ACCEPTED": return "secondary" as const;
      case "REJECTED": return "destructive" as const;
      default: return "default" as const;
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
        {job.imageUrl && (
          <img
            src={assetUrl(job.imageUrl)}
            alt={job.title}
            className="w-full h-64 object-cover md:rounded-t-xl"
          />
        )}
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge variant={getJobStatusVariant(job.status ?? "OPEN")} className="text-sm">
              {(job.status ?? "OPEN").replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Category: {categoryLabel(job.category)}</Badge>
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
            <Badge variant="outline">Proposed: ${proposal.proposedPrice}</Badge>
            <Badge variant="secondary">Job Status: {(job.status ?? "OPEN").replace("_", " ")}</Badge>
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