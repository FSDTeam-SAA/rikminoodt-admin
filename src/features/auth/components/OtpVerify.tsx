"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authApi } from "@/features/auth/api"

export function OtpVerify() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || ""

  const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isResending, setIsResending] = React.useState(false)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const cleanValue = value.replace(/\D/g, "")

    if (!cleanValue) {
      const newOtp = [...otp]
      newOtp[index] = ""
      setOtp(newOtp)
      return
    }

    // If pasted or multiple digits entered
    if (cleanValue.length > 1) {
      const pastedDigits = cleanValue.slice(0, 6).split("")
      const newOtp = [...otp]
      pastedDigits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit
        }
      })
      setOtp(newOtp)
      const nextIndex = Math.min(index + pastedDigits.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const newOtp = [...otp]
    newOtp[index] = cleanValue.slice(-1)
    setOtp(newOtp)

    // Automatically focus next input
    if (index < 5 && cleanValue) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pastedData) return

    const newOtp = [...otp]
    pastedData.split("").forEach((digit, i) => {
      newOtp[i] = digit
    })
    setOtp(newOtp)
    const focusIdx = Math.min(pastedData.length, 5)
    inputRefs.current[focusIdx]?.focus()
  }

  const handleResend = async () => {
    if (!emailParam) {
      toast.error("Email address missing. Please request a new code.")
      return
    }

    try {
      setIsResending(true)
      await authApi.forgetPassword({ email: emailParam })
      toast.success("A new 6-digit code has been sent to your email!")
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to resend verification code."
      toast.error(errMsg)
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = otp.join("")

    if (fullCode.length < 6) {
      toast.error("Please enter the complete 6-digit verification code.")
      return
    }

    if (!emailParam) {
      toast.error("Email address missing. Please request a new code.")
      return
    }

    try {
      setIsLoading(true)
      const res = await authApi.verifyCode({
        email: emailParam,
        otp: fullCode,
      })

      toast.success(res.message || "Email verified successfully!")
      router.push(`/auth/reset-password?email=${encodeURIComponent(emailParam)}`)
    } catch (err: any) {
      console.error("Verification error:", err)
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.errorSources?.[0]?.message ||
        err?.message ||
        "Invalid or expired verification code."
      toast.error(errMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-['Nunito_Sans']">
      {/* Left side: Graphic / illustration background */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-screen bg-slate-100 select-none">
        <Image
          src="/auth.png"
          alt="Boekerello Auth Illustration"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Right side: Verify email Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-white">
        <div className="w-full max-w-[552px] p-2 sm:p-6 rounded-xl flex flex-col justify-start items-start gap-9">
          {/* Back button */}
          <Link
            href="/auth/login"
            className="inline-flex justify-start items-center gap-3 text-gray-900 hover:text-black transition-colors group cursor-pointer focus:outline-none"
          >
            <div className="size-6 relative flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-gray-900 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-gray-900 text-base font-normal font-['Nunito_Sans']">
              Back to sign In
            </span>
          </Link>

          {/* Form container */}
          <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-9 w-full">
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              {/* Header: Logo, title, subtitle */}
              <div className="self-stretch flex flex-col justify-center items-center gap-3">
                <div className="h-20 sm:h-24 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Boekerello"
                    width={280}
                    height={77}
                    priority
                    className="h-16 sm:h-20 w-auto object-contain select-none"
                  />
                </div>
                <h1 className="self-stretch text-center text-black text-2xl font-bold font-['Nunito_Sans']">
                  Verify your email
                </h1>
                <p className="self-stretch text-center text-black text-base font-normal font-['Nunito_Sans']">
                  We sent a 6-digit code to <span className="font-semibold text-gray-900">{emailParam}</span>
                </p>
              </div>

              {/* 6-Digit OTP Input Boxes */}
              <div className="self-stretch flex justify-between items-center gap-2 sm:gap-3 py-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-semibold text-[#4B6B94] bg-[#F1F5FA] hover:bg-[#EBF1F9] focus:bg-white rounded-xl sm:rounded-2xl outline outline-1 outline-transparent focus:outline-2 focus:outline-orange-400 transition-all shadow-xs"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Resend code row */}
              <div className="self-stretch flex justify-end items-center gap-1.5 pt-1">
                <span className="text-black text-sm sm:text-base font-normal font-['Nunito_Sans']">
                  Didn&apos;t receive it ?
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-right text-orange-500 hover:text-orange-600 text-sm sm:text-base font-bold font-['Nunito_Sans'] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isResending ? "Resending..." : "Resend code"}
                </button>
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="self-stretch h-14 px-6 py-4 bg-[#E88DA0] hover:bg-[#de7b8f] active:scale-[0.99] rounded-2xl shadow-[1px_1px_8px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2.5 text-white text-lg font-bold font-['Nunito_Sans'] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OtpVerify
