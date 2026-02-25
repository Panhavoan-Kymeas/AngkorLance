import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "../../components/Jobs/JobList";
import JobFilter from "../../components/Jobs/JobFilter";
import type { Job, JobFilterPayload, BrowseJobsResponse } from "../../types/jobs";
import { fetchOpenJobsApi } from "../../api/jobs";
import { useToast } from "../../hooks/use-toast";

export default function BrowseJobsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Jobs data
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [filters, setFilters] = useState<JobFilterPayload>({
    page: 0,
    size: 10,
    category: "",
    search: "",
    status: "OPEN", // Freelancers only see open jobs
  });

  // Available categories (can later fetch from backend)
  const categories = ["Design", "Development", "Marketing", "Marketing", "Writing", "Other"];

  // Fetch jobs whenever filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res: BrowseJobsResponse = await fetchOpenJobsApi(filters);

        // Check if backend returns content/totalPages or array
        if ("content" in res && "totalPages" in res) {
          setJobs(res.content);
          setTotalPages(res.totalPages);
          setPage(res.number);
        } else {
          setJobs(res as Job[]);
          setTotalPages(1);
          setPage(0);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
        toast({
          variant: "destructive",
          title: "Failed to fetch jobs",
          description: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, toast]);

  // Handle filter changes
  const handleFilterChange = (newFilters: JobFilterPayload) => {
    setFilters({ ...newFilters, page: 0 }); // reset to first page on filter change
  };

  // Handle clicking on a job to view details
  const handleJobClick = (jobId: number) => {
    navigate(`/freelancer/jobs/${jobId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Jobs</h1>

      {/* Filters */}
      <JobFilter
        categories={categories}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
        showStatus={false} // freelancers only see OPEN jobs
      />

      {/* Job list */}
      <JobList jobs={jobs} loading={loading} onJobClick={handleJobClick} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setFilters({ ...filters, page: page - 1 })}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setFilters({ ...filters, page: page + 1 })}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}