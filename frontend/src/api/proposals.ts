import api from "./api";
import type {
  ProposalRequest,
  ProposalResponse,
  ProposalAcceptanceResponse,
  FreelancerProposalResponse,
} from "../types/proposal";

export type {
  ProposalRequest,
  ProposalResponse,
  ProposalAcceptanceResponse,
  FreelancerProposalResponse,
};

/**
 * Submit a proposal (Freelancer)
 */
export const submitProposalApi = async (
  data: ProposalRequest
): Promise<number> => {
  const res = await api.post<number>("/proposals", data);
  return res.data;
};

/**
 * Get proposals for a specific job (Client)
 */
export const getJobProposalsApi = async (
  jobId: number
): Promise<ProposalResponse[]> => {
  const res = await api.get<ProposalResponse[]>(`/jobs/${jobId}/proposals`);
  return res.data;
};

/**
 * Accept a proposal (Client)
 */
export const acceptProposalApi = async (
  proposalId: number
): Promise<ProposalAcceptanceResponse> => {
  const res = await api.post<ProposalAcceptanceResponse>(
    `/proposals/${proposalId}/accept`
  );
  return res.data;
};

/**
 * Reject a proposal (Client)
 */
export const rejectProposalApi = async (
  proposalId: number
): Promise<void> => {
  await api.post(`/proposals/${proposalId}/reject`);
};

/**
 * Get all proposals of current freelancer
 */
export const getMyProposalsApi = async (): Promise<
  FreelancerProposalResponse[]
> => {
  const res = await api.get<FreelancerProposalResponse[]>("/my-proposals");
  return res.data;
};