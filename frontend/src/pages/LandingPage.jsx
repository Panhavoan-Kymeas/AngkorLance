import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { UsersIcon, SearchIcon, ArrowRight, FileIcon, CheckCircle, ClockIcon } from "../components/icons/Icons";

const HOW_IT_WORKS = [
  { icon: <FileIcon />,    title: "Post Jobs Easily",     desc: "Create detailed job listings with categories, budgets, and requirements in minutes." },
  { icon: <CheckCircle />, title: "Receive Proposals",    desc: "Get tailored proposals from skilled freelancers ready to bring your vision to life." },
  { icon: <UsersIcon />,   title: "Choose & Collaborate", desc: "Review proposals, select the best fit, and work together to complete your project." },
  { icon: <ClockIcon />,   title: "Track Progress",       desc: "Monitor job status from open to in-progress to completed — all in one place." },
];

export default function LandingPage({ onNavigate }) {
  return (
    <div>
      <Navbar active="home" onNavigate={onNavigate} />

      <section className="hero">
        <h1>Connect with top talent.<br /><span>Get work done.</span></h1>
        <p>The simplest way to find freelancers and get projects completed. Post jobs, receive proposals, and collaborate seamlessly.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => onNavigate("signup")}>
            <UsersIcon /> Hire Talent <ArrowRight />
          </button>
          <button className="btn-outline" onClick={() => onNavigate("jobs")}>
            <SearchIcon /> Find Work
          </button>
        </div>
      </section>

      <section className="section bg-gray">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>A simple, streamlined process to connect clients with freelancers</p>
        </div>
        <div className="cards-grid">
          {HOW_IT_WORKS.map((c, i) => (
            <div className="card" key={i}>
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Join thousands of clients and freelancers already using FreelanceHub to work together.</p>
        <button className="btn-primary" onClick={() => onNavigate("signup")}>
          Create Your Account <ArrowRight />
        </button>
      </section>

      <Footer />
    </div>
  );
}
