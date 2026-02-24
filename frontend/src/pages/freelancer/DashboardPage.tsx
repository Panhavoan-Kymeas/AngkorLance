// pages/freelancer/DashboardPage.tsx
import type { AuthUser } from "@/types/auth";

interface FreelancerDashboardPageProps {
  user: AuthUser;
  logout: () => void;
}

const FreelancerDashboardPage: React.FC<FreelancerDashboardPageProps> = ({ user, logout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default FreelancerDashboardPage;