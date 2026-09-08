import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { JobDetail } from "@/types/jobs";
import type { ProposalResponse, ProposalStatus } from "@/types/proposal";
import { fetchJobDetailApi, completeJobApi, deleteJobApi } from "@/api/jobs";
import { getJobProposalsApi, acceptProposalApi, rejectProposalApi } from "@/api/proposals";
import { categoryLabel } from "@/lib/categories";
import { assetUrl } from "@/lib/assets";
import { parseApiError } from "@/lib/apiError";

export default function ClientJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const jobId = Number(id);

  const [job, setJob] = useState<JobDetail | null>(null);
  const [proposals, setProposals] = useState<ProposalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [busyProposalIds, setBusyProposalIds] = useState<number[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [jobDetail, proposalsList] = await Promise.all([
        fetchJobDetailApi(jobId),
        getJobProposalsApi(jobId),
      ]);
      setJob(jobDetail);
      setProposals(proposalsList);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to load job details.") });
    } finally {
      setLoading(false);
    }
  }, [jobId, toast]);

  useEffect(() => {
    if (Number.isNaN(jobId)) {
      toast({ variant: "destructive", title: "Error", description: "Invalid job id." });
      navigate("/client/jobs", { replace: true });
      return;
    }
    loadData();
  }, [jobId, loadData, navigate, toast]);

  const jobStatusVariant = (status: JobDetail["status"]) => {
    switch (status) {
      case "OPEN":
        return "outline" as const;
      case "IN_PROGRESS":
        return "secondary" as const;
      default:
        return "default" as const;
    }
  };

  const proposalStatusVariant = (status: ProposalStatus) => {
    switch (status) {
      case "PENDING":
        return "outline" as const;
      case "ACCEPTED":
        return "secondary" as const;
      case "REJECTED":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };

  const withBusy = async (proposalId: number, fn: () => Promise<void>) => {
    setBusyProposalIds((prev) => [...prev, proposalId]);
    try {
      await fn();
    } finally {
      setBusyProposalIds((prev) => prev.filter((x) => x !== proposalId));
    }
  };

  const handleAccept = (proposalId: number) =>
    withBusy(proposalId, async () => {
      try {
        await acceptProposalApi(proposalId);
        await loadData();
        toast({ title: "Proposal accepted", description: "The job is now in progress." });
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to accept proposal.") });
      }
    });

  const handleReject = (proposalId: number) =>
    withBusy(proposalId, async () => {
      try {
        await rejectProposalApi(proposalId);
        await loadData();
        toast({ title: "Proposal rejected" });
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to reject proposal.") });
      }
    });

  const handleComplete = async () => {
    setCompleteLoading(true);
    try {
      await completeJobApi(jobId);
      await loadData();
      toast({ title: "Job completed" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to complete job.") });
    } finally {
      setCompleteLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this job? This cannot be undone.")) return;
    setDeleteLoading(true);
    try {
      await deleteJobApi(jobId);
      toast({ title: "Job deleted" });
      navigate("/client/jobs");
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to delete job.") });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-lg text-muted-foreground">Loading job details...</div>;
  if (!job) return <div className="text-center py-20 text-lg text-muted-foreground">Job not found.</div>;

  return (
    <section className="max-w-6xl mx-auto py-20 px-6 space-y-10">
      <Card className="shadow-md rounded-xl overflow-hidden">
        {job.imageUrl && (
          <img src={assetUrl(job.imageUrl)} alt={job.title} className="w-full h-64 object-cover md:rounded-t-xl" />
        )}
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge variant={jobStatusVariant(job.status)} className="text-sm">
              {job.status?.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Category: {categoryLabel(job.category)}</Badge>
            <Badge variant="outline">Budget: ${job.budget}</Badge>
            <Badge variant="outline">Created: {new Date(job.createdAt).toLocaleDateString()}</Badge>
          </div>

          <div className="mt-4 flex gap-4 flex-wrap">
            <Button variant="outline" onClick={() => navigate("/client/jobs")}>
              Back to My Jobs
            </Button>
            {job.status === "OPEN" && (
              <>
                <Button onClick={() => navigate(`/client/jobs/${job.id}/edit`)}>Edit Job</Button>
                <Button variant="destructive" onClick={handleDelete} disabled={deleteLoading}>
                  {deleteLoading ? "Deleting..." : "Delete Job"}
                </Button>
              </>
            )}
            {job.status === "IN_PROGRESS" && (
              <Button variant="secondary" onClick={handleComplete} disabled={completeLoading}>
                {completeLoading ? "Completing..." : "Mark as Completed"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Proposals ({proposals.length})</h2>
        {proposals.length === 0 ? (
          <p className="text-muted-foreground">No proposals submitted yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {proposals.map((p) => (
              <Card
                key={p.proposalId}
                className="flex flex-col overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300 w-full md:w-[48%]"
              >
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.freelancerName}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{p.freelancerEmail}</p>
                    <p className="text-muted-foreground text-sm mb-2 whitespace-pre-line">{p.message}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={proposalStatusVariant(p.status)}>{p.status}</Badge>
                      <Badge variant="outline">Proposed: ${p.proposedPrice}</Badge>
                      <Badge variant="secondary">
                        Submitted: {new Date(p.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>

                  {p.status === "PENDING" && job.status === "OPEN" && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        disabled={busyProposalIds.includes(p.proposalId)}
                        onClick={() => handleAccept(p.proposalId)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={busyProposalIds.includes(p.proposalId)}
                        onClick={() => handleReject(p.proposalId)}
                      >
                        Reject
                      </Button>
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
