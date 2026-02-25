import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProposalsApi } from "@/api/proposals";
import type { FreelancerProposalResponse, ProposalStatus, JobStatus } from "@/types/proposal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MyProposalsPage: React.FC = () => {
  const [proposals, setProposals] = useState<FreelancerProposalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Map ProposalStatus to Badge variant
  const getProposalBadgeVariant = (status: ProposalStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "default"; 
      case "REJECTED":
        return "destructive"; 
      case "PENDING":
        return "secondary";
    }
  };

  // Map JobStatus to Badge variant
  const getJobBadgeVariant = (status: JobStatus) => {
    switch (status) {
      case "OPEN":
        return "outline"; // blue outline
      case "IN_PROGRESS":
        return "default"; // neutral
      case "COMPLETED":
        return "secondary"; // gray
      case "CANCELLED":
        return "destructive"; // red
    }
  };

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const data = await getMyProposalsApi();
      setProposals(data);
    } catch (err: unknown) {
      toast({
        title: "Failed to load proposals",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-12 text-gray-500 text-lg font-medium">
        Loading your proposals...
      </p>
    );

  if (!proposals.length)
    return (
      <div className="text-center mt-12 text-gray-500">
        <p className="text-lg font-medium mb-4">
          You haven’t submitted any proposals yet.
        </p>
        <Button
          size="lg"
          variant="default"
          onClick={() => navigate("/jobs/open")}
        >
          Browse Available Jobs
        </Button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Proposals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proposals.map((proposal) => (
          <div
            key={proposal.proposalId}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between group"
          >
            <div>
              <Button
                variant="link"
                className="text-xl font-semibold p-0 text-gray-900 hover:text-blue-600 transition"
                onClick={() => navigate(`/jobs/${proposal.jobId}`)}
              >
                {proposal.jobTitle}
              </Button>
              <p className="mt-2 text-gray-600">
                Proposed Budget:{" "}
                <span className="font-medium">${proposal.proposedBudget}</span>
              </p>
              <p className="mt-1 text-gray-500 flex items-center gap-2">
                Job Status:{" "}
                <Badge variant={getJobBadgeVariant(proposal.jobStatus)}>
                  {proposal.jobStatus}
                </Badge>
              </p>
            </div>

            <div className="mt-3 text-sm text-gray-400 flex justify-between items-center">
              <span>Proposal ID: {proposal.proposalId}</span>
              <Badge variant={getProposalBadgeVariant(proposal.status)}>
                {proposal.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Browse More Jobs Button */}
      <div className="mt-8 text-center">
        <Button
          size="lg"
          variant="default"
          onClick={() => navigate("/jobs/open")}
          className="px-8"
        >
          Browse More Jobs
        </Button>
      </div>
    </div>
  );
};

export default MyProposalsPage;