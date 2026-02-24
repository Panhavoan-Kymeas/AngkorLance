import { useState } from "react";
import { BriefcaseIcon, UsersIcon, SearchIcon } from "../components/icons/Icons";
import Input from "../components/ui/Input";

export default function SignupPage({ onNavigate }) {
  const [role, setRole] = useState("freelancer");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const update = f => e => setForm({ ...form, [f]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo" onClick={() => onNavigate("home")}>
          <BriefcaseIcon /> FreelanceHub
        </div>
        <h2>Create your account</h2>
        <p className="sub">
          Sends to{" "}
          <span style={{ fontFamily: "monospace", background: "var(--blue-light)", color: "var(--blue-dark)", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>
            POST /api/auth/register
          </span>
        </p>

        <Input label="Full Name" type="text"     placeholder="John Doe"          value={form.name}     onChange={update("name")} />
        <Input label="Email"     type="email"    placeholder="john@example.com"  value={form.email}    onChange={update("email")} />
        <Input label="Password"  type="password" placeholder="••••••••"          value={form.password} onChange={update("password")} />

        <p className="role-label">I want to...</p>
        <div className="role-grid">
          <div className={`role-card ${role === "client" ? "selected" : ""}`} onClick={() => setRole("client")}>
            <UsersIcon />
            <div className="role-name">Hire Talent</div>
            <div className="role-desc">Post jobs</div>
          </div>
          <div className={`role-card ${role === "freelancer" ? "selected" : ""}`} onClick={() => setRole("freelancer")}>
            <SearchIcon />
            <div className="role-name">Find Work</div>
            <div className="role-desc">Submit proposals</div>
          </div>
        </div>

        <button className="btn-full">Create Account</button>
        <p className="auth-switch">
          Already have an account? <a onClick={() => onNavigate("login")}>Log in</a>
        </p>
      </div>
    </div>
  );
}
