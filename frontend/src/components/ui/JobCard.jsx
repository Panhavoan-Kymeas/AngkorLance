import { ArrowRight } from "../icons/Icons";

export default function JobCard({ job, onApply }) {
  const statusLabel = job.status === "open" ? "Open" : job.status === "progress" ? "In Progress" : "Completed";

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div>
          <div className="job-title">{job.title}</div>
          <span className="job-category">{job.category}</span>
        </div>
        <span className={`status-badge status-${job.status}`}>{statusLabel}</span>
      </div>
      <p className="job-desc">{job.desc}</p>
      <div className="job-footer">
        <div>
          <div className="job-budget">${job.budget} <span>/ project</span></div>
          <div className="job-poster">
            <div className="avatar-sm">{job.initials}</div>
            {job.poster}
          </div>
        </div>
        {job.status === "open" && (
          <button
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 9 }}
            onClick={onApply}
          >
            Apply <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
