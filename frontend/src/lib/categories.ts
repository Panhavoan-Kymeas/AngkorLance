// Single source of truth for job categories. The `value` is what gets stored on
// the job and what the browse filter matches against, so create/edit/browse must
// all use these exact values.
export interface JobCategory {
  value: string;
  label: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "design", label: "Design" },
  { value: "writing", label: "Writing" },
  { value: "marketing", label: "Marketing" },
  { value: "data", label: "Data & Analytics" },
  { value: "other", label: "Other" },
];

export function categoryLabel(value: string): string {
  return JOB_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
