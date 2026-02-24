import type { JobFilterPayload, JobStatus } from "../../api/jobs";

interface JobFilterProps {
  categories: string[];
  currentFilters: JobFilterPayload;
  onFilterChange: (filters: JobFilterPayload) => void;
}

export default function JobFilter({ categories, currentFilters, onFilterChange }: JobFilterProps) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      {/* Search */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={currentFilters.search}
        onChange={(e) =>
          onFilterChange({ ...currentFilters, search: e.target.value })
        }
        className="border rounded p-2 flex-1 min-w-[150px]"
      />

      {/* Category */}
      <select
        value={currentFilters.category}
        onChange={(e) =>
          onFilterChange({ ...currentFilters, category: e.target.value })
        }
        className="border rounded p-2 min-w-[120px]"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Status */}
      <select
        value={currentFilters.status}
        onChange={(e) =>
          onFilterChange({
            ...currentFilters,
            status: e.target.value as JobStatus | "",
          })
        }
        className="border rounded p-2 min-w-[120px]"
      >
        <option value="">All Status</option>
        <option value="OPEN">Open</option>
        <option value="CLOSED">Closed</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </div>
  );
}