import { Login } from "@/features/auth/components/Login"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login — Boekerello Admin",
  description: "Sign in to access your Boekerello admin dashboard.",
}

export default function LoginPage() {
  return <Login />
}