import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { getSession } from "next-auth/react"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

// Request interceptor: Attach JWT token from NextAuth session
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      if (typeof window !== "undefined") {
        const session = await getSession()
        const token = (session as any)?.accessToken || (session?.user as any)?.token
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch {
      // In case session fetch fails during SSR or network issue
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
        // Handle redirect or logout if unauthorized
      }
    }
    return Promise.reject(error)
  }
)

export default api
