import api from "./api";
import type {
  Job,
  JobDetail,
  ClientJob,
  JobFilterPayload,
  BrowseJobsResponse,
} from "../types/jobs";

/**
 * Fetch open jobs for freelancers (with optional category & pagination)
 */
export const fetchOpenJobsApi = async (
  filters: JobFilterPayload
): Promise<BrowseJobsResponse> => {
  const params: Record<string, string | number> = {};

  if (filters.page !== undefined) params.page = filters.page;
  if (filters.size !== undefined) params.size = filters.size;
  if (filters.category) params.category = filters.category;
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;

  const res = await api.get<BrowseJobsResponse>("/jobs/open", { params });
  return res.data;
};

/**
 * Fetch a single job detail
 */
export const fetchJobDetailApi = async (jobId: number): Promise<JobDetail> => {
  const res = await api.get<JobDetail>(`/jobs/${jobId}`);
  return res.data;
};

/**
 * Fetch current client's jobs
 */
export const fetchMyJobsApi = async (): Promise<ClientJob[]> => {
  const res = await api.get<ClientJob[]>("/jobs/my-jobs");
  return res.data;
};

/**
 * Create a new job (multipart/form-data)
 */
export const createJobApi = async (data: FormData): Promise<number> => {
  const res = await api.post<number>("/jobs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

/**
 * Update a job
 */
export const updateJobApi = async (
  jobId: number,
  data: Partial<Job>
): Promise<ClientJob> => {
  const res = await api.patch<ClientJob>(`/jobs/${jobId}`, data);
  return res.data;
};

/**
 * Delete a job
 */
export const deleteJobApi = async (jobId: number): Promise<void> => {
  await api.delete(`/jobs/${jobId}`);
};

/**
 * Complete a job
 */
export const completeJobApi = async (
  jobId: number
): Promise<{ id: number; status: string }> => {
  const res = await api.post<{ id: number; status: string }>(`/jobs/${jobId}/complete`);
  return res.data;
};