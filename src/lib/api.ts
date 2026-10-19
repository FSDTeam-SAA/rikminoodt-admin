import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { getAccessToken, clearAuthSession } from "./auth-storage"

const getBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api/v1"
  )
}

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

// Request interceptor: Attach JWT token from cookie / localStorage
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      if (typeof window !== "undefined") {
        const token = getAccessToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch {
      // In case storage fetch fails
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        clearAuthSession()
        const currentPath = window.location.pathname
        if (!currentPath.startsWith("/auth")) {
          window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
