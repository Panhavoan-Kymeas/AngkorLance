import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetailApi } from "@/api/jobs";
import { submitProposalApi } from "@/api/proposals";
import type { JobDetail } from "@/types/jobs";
import type { ProposalRequest } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { toast } = useToast();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [applyOpen, setApplyOpen] = useState(false);
  const [proposalMessage, setProposalMessage] = useState("");
  const [proposedPrice, setProposedPrice] = useState<number | "">("");

  // Fetch job details
  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await fetchJobDetailApi(Number(jobId));
        setJob(data);
      } catch (err: unknown) {
        toast({
          title: "Failed to load job",
          description: err instanceof Error ? err.message : "Unknown error",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, toast]);

  if (loading)
    return <p className="text-center mt-12 text-gray-500">Loading job details...</p>;
  if (!job) return <p className="text-center mt-12 text-gray-500">Job not found.</p>;

  // Submit proposal
  const handleSubmitProposal = async () => {
    if (!proposalMessage || !proposedPrice) {
      toast({
        title: "Incomplete Proposal",
        description: "Please add a message and proposed price.",
        variant: "destructive",
      });
      return;
    }

    const payload: ProposalRequest = {
      jobId: Number(jobId),
      message: proposalMessage,
      proposedPrice: Number(proposedPrice),
    };

    try {
      await submitProposalApi(payload);

      toast({
        title: "Proposal Submitted",
        description: "Your proposal has been sent successfully.",
        variant: "default",
      });

      setApplyOpen(false);
      setProposalMessage("");
      setProposedPrice("");
    } catch (err: any) {
      // Extract backend error message
      const errorResponse = err?.response?.data;
      const errorMessage =
        errorResponse?.data?.error || errorResponse?.message || "Something went wrong";

      toast({
        title: "Failed to submit proposal",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-500 mt-1">{job.category}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-400">
            Posted on {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <span className="font-semibold text-lg">${job.budget}</span>
          <span className="text-sm text-gray-600">Client: {job.clientName}</span>
          <span
            className={`mt-1 px-2 py-1 rounded text-sm font-medium ${
              job.status === "OPEN"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-6 text-gray-700 leading-relaxed">{job.description}</div>

      {/* Submit Proposal Button */}
      <div className="flex gap-4 mt-6">
        <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Submit Proposal</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Your Proposal</DialogTitle>
              <DialogDescription>
                Enter your proposal message and proposed price.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="proposalMessage">Proposal Message</Label>
                <Textarea
                  id="proposalMessage"
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                  placeholder="Describe how you will complete this job..."
                  className="mt-1 w-full"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="proposedPrice">Proposed Price ($)</Label>
                <Input
                  id="proposedPrice"
                  type="number"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(Number(e.target.value))}
                  placeholder="Enter your proposed price"
                  className="mt-1 w-full"
                  min={0}
                />
              </div>

              <Button onClick={handleSubmitProposal}>Submit Proposal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JobDetailPage;