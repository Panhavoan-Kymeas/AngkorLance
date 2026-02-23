import React from "react";
import Sidebar from "../components/Sidebar/SidebarClient.tsx";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.tsx";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
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

export default ClientLayout;