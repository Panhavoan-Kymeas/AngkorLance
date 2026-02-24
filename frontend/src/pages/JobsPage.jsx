import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobCard from "../components/ui/JobCard";
import { SearchIcon } from "../components/icons/Icons";
import { MOCK_JOBS, CATEGORIES } from "../data/jobs";

export default function JobsPage({ onNavigate }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_JOBS.filter(j =>
    (filter === "All" || j.category === filter) &&
    (j.title.toLowerCase().includes(search.toLowerCase()) ||
     j.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <Navbar active="jobs" onNavigate={onNavigate} />

      <section className="section bg-gray">
        <div className="section-header">
          <h2>Browse Jobs</h2>
          <p>Find your next freelance project from our growing list of opportunities</p>
        </div>

        <div className="search-bar">
          <SearchIcon />
          <input
            placeholder="Search jobs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-row">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? "active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="jobs-grid">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} onApply={() => onNavigate("signup")} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
