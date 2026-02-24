import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import AuthLayout from "../layouts/AuthLayout"

const AuthRoute: React.FC = () => {
  const { user } = useAuth()

  // Only redirect if user is logged in
  if (user) return <Navigate to="/" replace />

  return (
    <AuthLayout>
      <Outlet /> {/* renders /login or /register */}
    </AuthLayout>
  )
}

export default AuthRoute