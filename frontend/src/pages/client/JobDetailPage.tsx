import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { JobStatus, ProposalResponse, ProposalStatus } from "@/types/proposal";
import { fetchJobDetailApi, completeJobApi, deleteJobApi } from "@/api/jobs";
import { getJobProposalsApi, acceptProposalApi, rejectProposalApi } from "@/api/proposals";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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

  const [proposals, setProposals] = useState<ProposalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load job and proposals
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const jobDetail = await fetchJobDetailApi(Number(id));
        const proposalsList = await getJobProposalsApi(Number(id));
        setJob(jobDetail);
        setProposals(proposalsList);
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Failed to load job details." });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, toast]);

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

  const handleAccept = async (proposalId: number) => {
    if (!job) return;
    setActionLoading(true);
    try {
      const res = await acceptProposalApi(proposalId);
      setJob({ ...job, status: res.jobStatus });
      setProposals((prev) =>
        prev.map((p) =>
          p.proposalId === proposalId
            ? { ...p, status: "ACCEPTED" }
            : { ...p, status: p.status === "PENDING" ? "REJECTED" : p.status }
        )
      );
      toast({ title: "Success", description: "Proposal accepted." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to accept proposal." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (proposalId: number) => {
    setActionLoading(true);
    try {
      await rejectProposalApi(proposalId);
      setProposals((prev) =>
        prev.map((p) =>
          p.proposalId === proposalId
            ? { ...p, status: "REJECTED" }
            : p
        )
      );
      toast({ title: "Success", description: "Proposal rejected." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to reject proposal." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteJob = async () => {
    if (!job) return;
    setCompleteLoading(true);
    try {
      const res = await completeJobApi(job.id);
      setJob({ ...job, status: res.status as JobStatus });
      toast({ title: "Success", description: "Job marked as completed." });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to complete job.",
        variant: "destructive",
      });
    } finally {
      setCompleteLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-lg text-muted-foreground">
        Loading job details...
      </div>
    );
  if (!job)
    return (
      <div className="text-center py-20 text-lg text-muted-foreground">
        Job not found.
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto py-20 px-6 space-y-10">
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

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4 flex-wrap">
            <Button onClick={() => navigate("/client/jobs")}>Back to My Jobs</Button>
            {job.status === "OPEN" && (
              <>
                <Button onClick={() => navigate(`/client/jobs/${job.id}/edit`)}>
                  Edit Job
                </Button>

                {/* Delete Job Modal */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" disabled={deleteLoading}>
                      Delete Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this job? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={deleteLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          setDeleteLoading(true);
                          try {
                            if (!job) return;
                            await deleteJobApi(job.id);
                            toast({
                              title: "Success",
                              description: "Job deleted successfully.",
                            });
                            navigate("/client/jobs");
                          } catch (err: any) {
                            toast({
                              title: "Error",
                              description: err.response?.data?.message || "Failed to delete job.",
                              variant: "destructive",
                            });
                          } finally {
                            setDeleteLoading(false);
                            setDeleteDialogOpen(false);
                          }
                        }}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Deleting..." : "Delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {job.status !== "COMPLETED" && job.status !== "CANCELLED" && (
              <Button
                variant="secondary"
                onClick={handleCompleteJob}
                disabled={completeLoading}
              >
                {completeLoading ? "Completing..." : "Mark as Completed"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Proposals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Freelancer Proposals ({proposals.length})
        </h2>
        {proposals.length === 0 ? (
          <p className="text-muted-foreground">No proposals submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proposals.map((p) => (
              <Card
                key={p.proposalId}
                className="flex flex-col md:flex-row overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-lg font-semibold cursor-pointer hover:underline"
                      onClick={() => navigate(`/freelancer/${p.freelancerId}`)}
                    >
                      {p.freelancerName}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">{p.message}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={getProposalStatusVariant(p.status)}>
                        {p.status}
                      </Badge>
                      <Badge variant="outline">Proposed: ${p.proposedBudget}</Badge>
                      <Badge variant="secondary">
                        Submitted: {new Date(p.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>

                  {p.status === "PENDING" &&
                    job.status !== "CANCELLED" &&
                    job.status !== "COMPLETED" && (
                      <div className="mt-4 flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          disabled={actionLoading}
                          onClick={() => handleAccept(p.proposalId)}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={actionLoading}
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