
// Job as returned to freelancer in job list
export interface Job {
  id: number;
  title: string;
  category: string;
  budget: number;
  clientName: string;
  jobImage?: string | null;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS" | "COMPLETED";
}

// Job detail for single job page
export interface JobDetail extends Job {
  description: string;
  createdAt: string;
  clientId: number;
  proposalCount: number;
}

// Client's job in "my jobs" list
export interface ClientJob {
  id: number;
  title: string;
  category: string;
  budget: number;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS" | "COMPLETED";
  jobImage?: string | null;
  proposalCount: number;
}

// Filters sent to API
export interface JobFilterPayload {
  page?: number;
  size?: number;
  category?: string;
  search?: string;
  status?: "OPEN" | "CLOSED" | "IN_PROGRESS" | "COMPLETED" | "";
}

// Response type for /jobs/open paginated API
export interface BrowseJobsResponse {
  content: Job[];
  number: number;       // current page (0-based)
  totalPages: number;   // total number of pages
  totalElements: number; // total number of jobs
}