import * as React from "react"
import { ResetPassword } from "@/features/auth/components/ResetPassword"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password — Boekerello Admin",
  description: "Reset your Boekerello account password.",
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ResetPassword />
    </React.Suspense>
  )
}
