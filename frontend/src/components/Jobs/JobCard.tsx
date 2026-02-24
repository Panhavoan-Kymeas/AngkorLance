import type { Job } from "../../api/jobs";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const statusColors: Record<string, string> = {
    OPEN: "bg-green-100 text-green-800",
    CLOSED: "bg-red-100 text-red-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition flex gap-4">
      {job.jobImage && (
        <img
          src={job.jobImage}
          alt={job.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
      )}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </div>
        <p className="text-gray-500">{job.category}</p>
        <p className="mt-2 font-medium">${job.budget}</p>
        <p className="text-sm text-gray-600 mt-1">Client: {job.clientName}</p>
      </div>
    </div>
  );
}