"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import authApi from "../api/auth.api"
import { AdminUser, LoginDto } from "../types"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = React.useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const currentUser = authApi.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginDto, callbackUrl?: string) => {
    setIsLoading(true)
    try {
      const data = await authApi.login(credentials)
      setUser(data.user)
      toast.success(`Welcome back, ${data.user.name || "Admin"}!`)
      router.push(callbackUrl || "/")
      return data
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errorSources?.[0]?.message ||
        err?.message ||
        "Login failed. Please check your credentials."
      toast.error(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authApi.logout()
      setUser(null)
      toast.success("Logged out successfully.")
      router.push("/auth/login")
    } catch {
      setUser(null)
      router.push("/auth/login")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }
}

export default useAuth
