export type Page =
  | "home"
  | "jobs"
  | "post-job"
  | "login"
  | "signup"
  | "dashboard"
  | "browse-jobs"
  | "profile";

export interface NavItem {
  key: Page;
  label: string;
  path: string;
}

// Public pages
export const publicPages: NavItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "jobs", label: "Browse Jobs", path: "/jobs" },
  { key: "login", label: "Log in", path: "/auth/login" },
  { key: "signup", label: "Sign Up", path: "/auth/register" },
];

// Freelancer pages
export const freelancerPages: NavItem[] = [
  { key: "home", label: "Home", path: "/freelancer" },
  { key: "dashboard", label: "Dashboard", path: "/freelancer/dashboard" },
  { key: "browse-jobs", label: "Browse Jobs", path: "/freelancer/browse-jobs" },
  { key: "profile", label: "Profile", path: "/freelancer/profile" },
];

// Client pages
export const clientPages: NavItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/client/dashboard" },
  { key: "post-job", label: "Post Job", path: "/client/post-job" },
  { key: "profile", label: "Profile", path: "/client/profile" },
];