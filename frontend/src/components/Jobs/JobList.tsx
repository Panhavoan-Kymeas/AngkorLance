import type { Job } from "../../api/jobs";
import JobCard from "./JobCard";
import { JobCardSkeleton } from "./JobCardSkeleton";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
}

export default function JobList({ jobs, loading }: JobListProps) {
  if (loading) {
    // Show 5 skeletons while loading
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No jobs found</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}