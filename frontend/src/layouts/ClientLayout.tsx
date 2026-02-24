import { useState } from "react"
import Sidebar from "../components/Sidebar/SidebarClient"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

// Define the pages your Navbar supports
type Page = "home" | "jobs" | "post-job" | "login" | "signup"

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  // Track the currently active page for the Navbar
  const [activePage, setActivePage] = useState<Page>("home")

  // Handler for navigation from Navbar
  const handleNavigate = (page: Page) => {
    setActivePage(page)
    // Optional: Add router navigation here if using react-router
    // e.g., navigate(`/${page}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <Navbar active={activePage} onNavigate={handleNavigate} />

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </div>
  )
}

export default ClientLayout