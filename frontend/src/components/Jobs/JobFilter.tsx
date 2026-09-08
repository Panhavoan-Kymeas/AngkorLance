import type { JobFilterPayload } from "../../types/jobs";
import { JOB_CATEGORIES } from "../../lib/categories";

interface JobFilterProps {
  currentFilters: JobFilterPayload;
  onFilterChange: (filters: JobFilterPayload) => void;
  showStatus?: boolean;
}

export default function JobFilter({
  currentFilters,
  onFilterChange,
  showStatus = false,
}: JobFilterProps) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <input
        type="text"
        placeholder="Search jobs..."
        value={currentFilters.search ?? ""}
        onChange={(e) => onFilterChange({ ...currentFilters, search: e.target.value })}
        className="border rounded p-2 flex-1 min-w-[150px]"
      />

      <select
        value={currentFilters.category ?? ""}
        onChange={(e) => onFilterChange({ ...currentFilters, category: e.target.value })}
        className="border rounded p-2 min-w-[160px]"
      >
        <option value="">All Categories</option>
        {JOB_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {showStatus && (
        <select
          value={currentFilters.status ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...currentFilters,
              status: e.target.value as typeof currentFilters.status,
            })
          }
          className="border rounded p-2 min-w-[120px]"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      )}
    </div>
  );
}
