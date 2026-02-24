import { useState, useEffect } from "react";
import { JobList } from "../../components/Jobs/JobList";
import JobFilter from "../../components/Jobs/JobFilter";
import { fetchJobsApi, type Job, type JobFilterPayload } from "../../api/jobs";

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<JobFilterPayload>({
    search: "",
    category: "",
    status: "",
  });

  const categories = ["Design", "Development", "Marketing"];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetchJobsApi(filters);
        setJobs(res);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Jobs</h1>
      <JobFilter
        categories={categories}
        currentFilters={filters}
        onFilterChange={setFilters}
      />
      <JobList jobs={jobs} loading={loading} />
    </div>
  );
}