import * as React from "react"
import { OtpVerify } from "@/features/auth/components/OtpVerify"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify Email — Boekerello Admin",
  description: "Verify your email to reset your Boekerello password.",
}

export default function OtpVerifyPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
      <OtpVerify />
    </React.Suspense>
  )
}
