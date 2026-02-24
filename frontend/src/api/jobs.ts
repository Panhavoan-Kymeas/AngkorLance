import api from "./api";

// --- Types ---
export type JobStatus = "OPEN" | "CLOSED" | "IN_PROGRESS" | "COMPLETED";

export interface Job {
  id: number;
  title: string;
  category: string;
  budget: number;
  clientName: string;
  jobImage?: string | null;
  status: JobStatus;
}

export interface JobFilterPayload {
  search?: string;
  category?: string;
  status?: JobStatus | "";
  page?: number;
  size?: number;
}

// --- API Functions ---

/**
 * Fetch jobs for freelancers with optional filters
 * @param filters - filter options like search, category, status, pagination
 */
export const fetchJobsApi = async (filters: JobFilterPayload = {}): Promise<Job[]> => {
  const params: Record<string, string | number> = {
    search: filters.search || "",
    category: filters.category || "",
    status: filters.status || "",
    page: filters.page ?? 0,
    size: filters.size ?? 20,
  };

  // Backend endpoint returns { data: Job[] } for consistency
  const res = await api.get<{ data: Job[] }>("/jobs/open", { params });
  return res.data.data;
};

/**
 * Fetch job detail by ID
 * @param jobId - ID of the job
 */
export const fetchJobDetailApi = async (jobId: number): Promise<Job> => {
  const res = await api.get<{ data: Job }>(`/jobs/${jobId}`);
  return res.data.data;
};