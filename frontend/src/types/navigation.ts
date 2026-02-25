export type Page =
  | "home"
  | "jobs"
  | "post-job"
  | "my-jobs"
  | "job-detail"
  | "edit_job"
  | "proposals"
  | "login"
  | "signup"
  | "dashboard"
  | "browse-jobs"
  | "my-proposals"
  | "profile";

export interface NavItem {
  key: Page;
  label: string;
  path: string;
}

// Public pages
export const publicPages: NavItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "jobs", label: "Browse Jobs", path: "/freelancer/jobs" },
  { key: "login", label: "Log in", path: "/auth/login" },
  { key: "signup", label: "Sign Up", path: "/auth/register" },
];

// Freelancer pages
export const freelancerPages: NavItem[] = [
  { key: "home", label: "Home", path: "/freelancer" },
  { key: "dashboard", label: "Dashboard", path: "/freelancer/dashboard" },
  { key: "browse-jobs", label: "Browse Jobs", path: "/freelancer/browse-jobs" },
  { key: "my-proposals", label: "My Proposals", path: "/freelancer/proposals" },
  { key: "profile", label: "Profile", path: "/freelancer/profile" },
];

// Client pages
export const clientPages: NavItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/client/dashboard" },
  { key: "post-job", label: "Post Job", path: "/client/jobs/create" },
  { key: "my-jobs", label: "My Jobs", path: "/client/jobs" },
  { key: "job-detail", label: "Job Detail", path: "/client/jobs/:id" },
  { key: "proposals", label: "Proposals", path: "/client/proposals" },
  { key: "edit_job", label: "Edit Job", path: "/client/jobs/:id/edit"},
  { key: "profile", label: "Profile", path: "/client/profile" },
];