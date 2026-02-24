import { BriefcaseIcon } from "../icons/Icons";

export default function Navbar({ active, onNavigate }) {
  return (
    <nav className="nav">
      <div className="logo" onClick={() => onNavigate("home")}>
        <BriefcaseIcon /> FreelanceHub
      </div>
      <div className="nav-actions">
        <div className="page-tabs">
          {[["home", "Home"], ["jobs", "Browse Jobs"], ["post-job", "Post a Job"]].map(([key, label]) => (
            <button
              key={key}
              className={`page-tab ${active === key ? "active" : ""}`}
              onClick={() => onNavigate(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="btn-ghost" onClick={() => onNavigate("login")}>Log in</button>
        <button className="btn-primary" onClick={() => onNavigate("signup")}>Get Started</button>
      </div>
    </nav>
  );
}
