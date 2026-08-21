export type Page =
  // Public
  | "home"
  | "about"
  | "blog"
  | "pricing"
  | "careers"
  | "contact"
  | "how-it-works"

  // Auth
  | "login"
  | "signup"

  // Freelancer
  | "dashboard"
  | "browse-jobs"
  | "my-proposals"
  | "profile"

  // Client
  | "post-job"
  | "my-jobs"
  | "job-detail"
  | "edit_job";

export interface NavItem {
  key: Page;
  label: string;
  path: string;
}

//
// 🌐 PUBLIC PAGES
//
export const publicPages: NavItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "how-it-works", label: "How It Works", path: "/how-it-works" },
  { key: "pricing", label: "Pricing", path: "/pricing" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "about", label: "About", path: "/about" },
  { key: "careers", label: "Careers", path: "/careers" },
  { key: "contact", label: "Contact", path: "/contact" },

  // Auth
  { key: "login", label: "Log in", path: "/auth/login" },
  { key: "signup", label: "Sign Up", path: "/auth/register" },
];

//
// 👨‍💻 FREELANCER PAGES
//
export const freelancerPages: NavItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/freelancer/dashboard" },
  { key: "browse-jobs", label: "Browse Jobs", path: "/freelancer/browse-jobs" },
  { key: "my-proposals", label: "My Proposals", path: "/freelancer/proposals" },
  { key: "profile", label: "Profile", path: "/freelancer/profile" },
];

//
// 🧑‍💼 CLIENT PAGES
//
export const clientPages: NavItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/client/dashboard" },
  { key: "post-job", label: "Post Job", path: "/client/jobs/create" },
  { key: "my-jobs", label: "My Jobs", path: "/client/jobs" },
  { key: "profile", label: "Profile", path: "/client/profile" },
];

//
// 📄 INTERNAL ROUTES (not shown in navbar)
//
export const hiddenRoutes: NavItem[] = [
  { key: "job-detail", label: "Job Detail", path: "/client/jobs/:id" },
  { key: "edit_job", label: "Edit Job", path: "/client/jobs/:id/edit" },
];