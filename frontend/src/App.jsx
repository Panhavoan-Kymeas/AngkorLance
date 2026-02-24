import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import JobsPage    from "./pages/JobsPage";
import PostJobPage from "./pages/PostJobPage";
import SignupPage  from "./pages/SignupPage";
import LoginPage   from "./pages/LoginPage";
import Toast       from "./components/ui/Toast";

export default function App() {
  const [page, setPage]   = useState("home");
  const [toast, setToast] = useState(null);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <>
      {page === "home"     && <LandingPage onNavigate={setPage} />}
      {page === "jobs"     && <JobsPage    onNavigate={setPage} />}
      {page === "post-job" && <PostJobPage onNavigate={setPage} onToast={showToast} />}
      {page === "signup"   && <SignupPage  onNavigate={setPage} />}
      {page === "login"    && <LoginPage   onNavigate={setPage} />}
      <Toast message={toast} />
    </>
  );
}
