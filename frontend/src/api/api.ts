import axios, { type AxiosResponse, AxiosError, type InternalAxiosRequestConfig } from "axios";
import LoadingService from "@/contexts/loading/LoadingService";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Optional delay function for testing loading
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    LoadingService.show();

    // Ensure headers exist and are AxiosHeaders
    config.headers = config.headers || {};
    const token = localStorage.getItem("token");
    if (token) {
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

// Response interceptor
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    await delay(200); // simulate network delay
    LoadingService.hide();
    return response;
  },
  async (error: AxiosError) => {
    await delay(200);
    LoadingService.hide();

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      console.warn("Unauthorized request, token removed.");
    }

    return Promise.reject(error);
  }
);

export default api;