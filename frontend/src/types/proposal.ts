export type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type JobStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";

/* ===============================
   Request
================================ */

export interface ProposalRequest {
  jobId: number;
  message: string;
  proposedPrice: number;
}

/* ===============================
   Client view — proposals for a job
   (GET /api/jobs/{id}/proposals)
================================ */

export interface ProposalResponse {
  proposalId: number;
  freelancerId: number;
  freelancerName: string;
  freelancerEmail: string;
  message: string;
  proposedPrice: number;
  status: ProposalStatus;
  createdAt: string;
}

/* ===============================
   Accept response
   (POST /api/proposals/{id}/accept)
================================ */

export interface ProposalAcceptanceResponse {
  proposalId: number;
  status: ProposalStatus;
  jobStatus: JobStatus;
}

/* ===============================
   Freelancer view — my proposals
   (GET /api/my-proposals)
================================ */

export interface FreelancerProposalResponse {
  proposalId: number;
  jobId: number;
  jobTitle: string;
  jobStatus: JobStatus;
  proposedPrice: number;
  status: ProposalStatus;
}
