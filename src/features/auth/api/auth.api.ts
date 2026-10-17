import api from "@/lib/api"
import { signIn, signOut } from "next-auth/react"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "viewer"
}

export const authApi = {
  async loginWithCredentials(credentials: LoginCredentials) {
    return signIn("credentials", {
      ...credentials,
      redirect: false,
    })
  },

  async logout() {
    return signOut({ redirect: true, callbackUrl: "/login" })
  },

  async getCurrentUser(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser>("/auth/me")
    return data
  },
}

export default authApi
