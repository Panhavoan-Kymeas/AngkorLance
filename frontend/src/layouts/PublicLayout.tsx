import { useState } from "react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

// Define pages your Navbar supports
type Page = "home" | "jobs" | "post-job" | "login" | "signup"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Track the currently active page
  const [activePage, setActivePage] = useState<Page>("home")

  // Handle navigation from the Navbar
  const handleNavigate = (page: Page) => {
    setActivePage(page)
    // Optional: Add router navigation here
    // e.g., navigate(`/${page}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar at the top */}
      <Navbar active={activePage} onNavigate={handleNavigate} />

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}

export default MainLayout