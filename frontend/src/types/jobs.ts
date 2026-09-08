export type JobStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";

// Job as returned to a freelancer in the open-jobs list
export interface Job {
  id: number;
  title: string;
  category: string;
  budget: number;
  clientName: string;
  imageUrl?: string | null;
  status?: JobStatus;
}

// Job detail for the single-job page
export interface JobDetail extends Job {
  description: string;
  createdAt: string;
  clientId: number;
  proposalCount: number;
}

// A client's own job in the "my jobs" list
export interface ClientJob {
  id: number;
  title: string;
  category: string;
  budget: number;
  status: JobStatus;
  imageUrl?: string | null;
  proposalCount: number;
  createdAt?: string;
}

// Partial update payload for PATCH /api/jobs/{id}
export interface UpdateJobPayload {
  title?: string;
  description?: string;
  category?: string;
  budget?: number;
}

// Filters sent to GET /api/jobs/open
export interface JobFilterPayload {
  page?: number;
  size?: number;
  category?: string;
  search?: string;
  status?: JobStatus | "";
}

// Response shape of the paginated GET /api/jobs/open (raw Spring Page)
export interface BrowseJobsResponse {
  content: Job[];
  number: number; // current page (0-based)
  totalPages: number; // total number of pages
  totalElements: number; // total number of jobs
}
