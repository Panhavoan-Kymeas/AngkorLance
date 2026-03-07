import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler (optional)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Remove token but do NOT redirect
      localStorage.removeItem("token");
      // Leave the user on the current page (LoginPage)
      // Optionally you can log or handle errors here
      console.warn("Unauthorized request, token removed.");
    }
    return Promise.reject(err);
  }
);

export default api;