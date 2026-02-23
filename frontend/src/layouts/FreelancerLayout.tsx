import React from "react";
import Sidebar from "../components/Sidebar/SidebarFreelancer";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface FreelancerLayoutProps {
  children: React.ReactNode;
}

const FreelancerLayout: React.FC<FreelancerLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default FreelancerLayout;