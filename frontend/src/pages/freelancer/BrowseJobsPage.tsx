import { useState, useEffect } from "react";
import JobList from "../../components/Jobs/JobList";
import JobFilter from "../../components/Jobs/JobFilter";
import type { Job, JobFilterPayload } from "../../types/jobs";
import { fetchOpenJobsApi } from "../../api/jobs";

export default function BrowseJobsPage() {
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
  });

  // Available categories (can later fetch from backend)
  const categories = ["Design", "Development", "Marketing"];

  // Fetch jobs whenever filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetchOpenJobsApi(filters);

        // If backend returns an object with content/totalPages
        if ("content" in res && "totalPages" in res) {
          setJobs(res.content);
          setTotalPages(res.totalPages);
          setPage(res.number);
        } else {
          // If backend returns array directly
          setJobs(res as Job[]);
          setTotalPages(1);
          setPage(0);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: JobFilterPayload) => {
    setFilters({ ...newFilters, page: 0 });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Jobs</h1>

      <JobFilter
        categories={categories}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
        showStatus={false} // Freelancers only see OPEN jobs
      />

      <JobList jobs={jobs} loading={loading} />

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