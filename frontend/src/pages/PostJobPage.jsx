import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PlusIcon } from "../components/icons/Icons";

const CATEGORY_OPTIONS = ["Frontend", "Backend", "Design", "Mobile", "DevOps"];

export default function PostJobPage({ onNavigate, onToast }) {
  const [form, setForm] = useState({
    title: "", category: "Frontend", budget: "", description: "", requirements: "",
  });

  const update = field => e => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.title || !form.budget || !form.description) return;
    onToast("Job posted successfully!");
    setTimeout(() => onNavigate("jobs"), 1400);
  };

  return (
    <div>
      <Navbar active="post-job" onNavigate={onNavigate} />

      <section className="section bg-gray">
        <div className="section-header">
          <h2>Post a Job</h2>
          <p>Describe your project and start receiving proposals from talented freelancers</p>
        </div>

        <div className="post-job-wrapper">
          <h3>Job Details</h3>
          <p className="sub">
            Sends a request to <span className="api-tag">POST /api/jobs</span> on your backend
          </p>

          <div className="form-grid">
            <div className="field full">
              <label>Job Title</label>
              <input placeholder="e.g. Build a REST API with Node.js" value={form.title} onChange={update("title")} />
            </div>

            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={update("category")}>
                {CATEGORY_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Budget (USD)</label>
              <div className="budget-wrap">
                <span className="budget-sym">$</span>
                <input type="number" placeholder="500" value={form.budget} onChange={update("budget")} />
              </div>
            </div>

            <div className="field full">
              <label>Description</label>
              <textarea placeholder="Describe your project in detail..." value={form.description} onChange={update("description")} />
            </div>

            <div className="field full">
              <label>Requirements</label>
              <textarea
                placeholder="Skills, experience, or tools required..."
                value={form.requirements}
                onChange={update("requirements")}
                style={{ minHeight: 80 }}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-cancel" onClick={() => onNavigate("jobs")}>Cancel</button>
            <button className="btn-submit" onClick={handleSubmit}>
              <PlusIcon /> Post Job
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
