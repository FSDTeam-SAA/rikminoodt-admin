import { ForgotPassword } from "@/features/auth/components/ForgotPassword"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password — Boekerello Admin",
  description: "Reset your Boekerello account password.",
}

export default function ForgotPasswordPage() {
  return <ForgotPassword />
}
