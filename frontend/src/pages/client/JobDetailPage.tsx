import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { JobStatus, ProposalResponse, ProposalStatus } from "@/types/proposal";
import { fetchJobDetailApi, completeJobApi, deleteJobApi } from "@/api/jobs";
import { getJobProposalsApi, acceptProposalApi, rejectProposalApi } from "@/api/proposals";

export default function ClientJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [job, setJob] = useState<{
    id: number;
    title: string;
    description: string;
    category: string;
    budget: number;
    status: JobStatus;
    jobImage?: string | null;
    createdAt: string;
  } | null>(null);

  // Normalized proposals with guaranteed status and proposedBudget
  type NormalizedProposal = ProposalResponse & { status: ProposalStatus; proposedBudget: number };
  const [proposals, setProposals] = useState<NormalizedProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [loadingProposalIds, setLoadingProposalIds] = useState<number[]>([]);

  const jobId = Number(id);
  if (isNaN(jobId)) {
    toast({ title: "Error", description: "Invalid job ID." });
    navigate("/client/jobs");
  }

  // Load job and proposals
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const jobDetail = await fetchJobDetailApi(jobId);
        const proposalsList = await getJobProposalsApi(jobId);

        // 🔹 Normalize proposals for frontend
        const normalized: NormalizedProposal[] = proposalsList.map(p => ({
          ...p,
          proposedBudget: (p as any).proposedPrice ?? p.proposedBudget ?? 0,
          status: (p as any).status ?? "PENDING",
        }));

        setJob(jobDetail);
        setProposals(normalized);
      } catch (err: any) {
        console.error(err);
        toast({ title: "Error", description: err.response?.data?.message || "Failed to load job details." });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [jobId, toast]);

  // Badge helpers
  const getJobStatusVariant = (status: JobStatus) => {
    switch (status) {
      case "OPEN": return "outline";
      case "IN_PROGRESS": return "secondary";
      case "COMPLETED": return "default";
      case "CANCELLED":
      case "CLOSED":
        return "destructive";
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

  // Accept proposal
  const handleAccept = async (proposalId: number) => {
    if (!job) return;
    setLoadingProposalIds(prev => [...prev, proposalId]);
    try {
      const res = await acceptProposalApi(proposalId);
      setJob({ ...job, status: res.jobStatus });
      setProposals(prev =>
        prev.map(p => {
          if (p.proposalId === proposalId) return { ...p, status: "ACCEPTED" as ProposalStatus };
          if (p.status === "PENDING") return { ...p, status: "REJECTED" as ProposalStatus };
          return p;
        })
      );
      toast({ title: "Success", description: "Proposal accepted." });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.response?.data?.message || "Failed to accept proposal." });
    } finally {
      setLoadingProposalIds(prev => prev.filter(id => id !== proposalId));
    }
  };

  // Reject proposal
  const handleReject = async (proposalId: number) => {
    setLoadingProposalIds(prev => [...prev, proposalId]);
    try {
      await rejectProposalApi(proposalId);
      setProposals(prev =>
        prev.map(p => p.proposalId === proposalId ? { ...p, status: "REJECTED" as ProposalStatus } : p)
      );
      toast({ title: "Success", description: "Proposal rejected." });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.response?.data?.message || "Failed to reject proposal." });
    } finally {
      setLoadingProposalIds(prev => prev.filter(id => id !== proposalId));
    }
  };

  // Complete job
  const handleCompleteJob = async () => {
    if (!job) return;
    setCompleteLoading(true);
    try {
      const res = await completeJobApi(job.id);
      setJob({ ...job, status: res.status as JobStatus });
      toast({ title: "Success", description: "Job marked as completed." });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.response?.data?.message || "Failed to complete job." });
    } finally {
      setCompleteLoading(false);
    }
  };

  // Delete job
  const handleDeleteJob = async () => {
    if (!job) return;
    setDeleteLoading(true);
    try {
      await deleteJobApi(job.id);
      toast({ title: "Success", description: "Job deleted successfully." });
      navigate("/client/jobs");
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.response?.data?.message || "Failed to delete job." });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-lg text-muted-foreground">Loading job details...</div>;
  if (!job) return <div className="text-center py-20 text-lg text-muted-foreground">Job not found.</div>;

  return (
    <section className="max-w-6xl mx-auto py-20 px-6 space-y-10">
      {/* Job Card */}
      <Card className="shadow-md rounded-xl overflow-hidden">
        {job.jobImage && <img src={job.jobImage} alt={job.title} className="w-full h-64 object-cover md:rounded-t-xl" />}
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge variant={getJobStatusVariant(job.status)} className="text-sm">{job.status}</Badge>
          </div>
          <p className="text-muted-foreground">{job.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Category: {job.category}</Badge>
            <Badge variant="outline">Budget: ${job.budget}</Badge>
            <Badge variant="outline">Created: {new Date(job.createdAt).toLocaleDateString()}</Badge>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4 flex-wrap">
            <Button onClick={() => navigate("/client/jobs")}>Back to My Jobs</Button>
            {job.status === "OPEN" && (
              <>
                <Button onClick={() => navigate(`/client/jobs/${job.id}/edit`)}>Edit Job</Button>
                <Button variant="destructive" onClick={handleDeleteJob} disabled={deleteLoading}>
                  {deleteLoading ? "Deleting..." : "Delete Job"}
                </Button>
              </>
            )}
            {job.status !== "COMPLETED" && job.status !== "CANCELLED" && (
              <Button variant="secondary" onClick={handleCompleteJob} disabled={completeLoading}>
                {completeLoading ? "Completing..." : "Mark as Completed"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Proposals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Freelancer Proposals ({proposals.length})</h2>
        {proposals.length === 0 ? (
          <p className="text-muted-foreground">No proposals submitted yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {proposals.map(p => (
              <Card key={p.proposalId} className="flex flex-col md:flex-row overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300 w-full md:w-[48%]">
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/freelancer/${p.freelancerId}`)}>
                      {p.freelancerName}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">{p.message}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={getProposalStatusVariant(p.status)}>{p.status}</Badge>
                      <Badge variant="outline">Proposed: ${p.proposedBudget}</Badge>
                      <Badge variant="secondary">Submitted: {new Date(p.createdAt).toLocaleDateString()}</Badge>
                    </div>
                  </div>

                  {/* Accept / Reject Buttons */}
                  {p.status === "PENDING" && job.status !== "CANCELLED" && job.status !== "COMPLETED" && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Button size="sm" disabled={loadingProposalIds.includes(p.proposalId)} onClick={() => handleAccept(p.proposalId)}>Accept</Button>
                      <Button size="sm" variant="destructive" disabled={loadingProposalIds.includes(p.proposalId)} onClick={() => handleReject(p.proposalId)}>Reject</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}