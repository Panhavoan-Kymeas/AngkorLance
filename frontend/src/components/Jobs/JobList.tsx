import type { Job } from "../../api/jobs";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
}

export function JobList({ jobs, loading }: JobListProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="border rounded-xl p-4 shadow animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}