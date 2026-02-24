import { useState } from "react";
import { BriefcaseIcon } from "../components/icons/Icons";
import Input from "../components/ui/Input";

export default function LoginPage({ onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const update = f => e => setForm({ ...form, [f]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo" onClick={() => onNavigate("home")}>
          <BriefcaseIcon /> FreelanceHub
        </div>
        <h2>Welcome back</h2>
        <p className="sub">
          Sends to{" "}
          <span style={{ fontFamily: "monospace", background: "var(--blue-light)", color: "var(--blue-dark)", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>
            POST /api/auth/login
          </span>
        </p>

        <Input label="Email"    type="email"    placeholder="john@example.com" value={form.email}    onChange={update("email")} />
        <Input label="Password" type="password" placeholder="••••••••"         value={form.password} onChange={update("password")} />

        <button className="btn-full">Log in</button>
        <p className="auth-switch">
          Don't have an account? <a onClick={() => onNavigate("signup")}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
