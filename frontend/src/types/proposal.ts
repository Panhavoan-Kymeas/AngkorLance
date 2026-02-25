export type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export type JobStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

/* ===============================
   Request Types
================================ */

export interface ProposalRequest {
  jobId: number
  message: string
  proposedPrice: number
}

/* ===============================
   Client View (Job Proposals)
================================ */

export interface ProposalResponse {
  proposalId: number
  freelancerId: number
  freelancerName: string
  freelancerEmail: string
  message: string
  proposedBudget: number
  status: ProposalStatus
  createdAt: string
}

/* ===============================
   Accept Response
================================ */

export interface ProposalAcceptanceResponse {
  proposalId: number
  proposalStatus: ProposalStatus
  jobStatus: JobStatus
}

/* ===============================
   Freelancer Dashboard View
================================ */

export interface FreelancerProposalResponse {
  proposalId: number
  jobId: number
  jobTitle: string
  jobStatus: JobStatus
  proposedBudget: number
  status: ProposalStatus
}