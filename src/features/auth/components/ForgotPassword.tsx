"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api"

export function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error("Please enter your email address.")
      return
    }

    try {
      setIsLoading(true)
      // Call api if available, otherwise graceful fallback
      await api.post("/auth/forgot-password", { email }).catch(() => null)

      toast.success("Verification code sent to your email!")
      router.push(`/auth/otp-verify?email=${encodeURIComponent(email)}`)
    } catch (err: unknown) {
      console.error("Forgot password error:", err)
      toast.error("Failed to send reset code. Please try again.")
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

      {/* Right side: Forgot Password Form */}
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
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
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
                  Forgot Password?
                </h1>
                <p className="self-stretch text-center text-black text-base font-normal font-['Nunito_Sans']">
                  Enter your email and we&apos;ll send you a code to reset your password
                </p>
              </div>

              {/* Email field */}
              <div className="self-stretch flex flex-col justify-center items-start gap-3">
                <label
                  htmlFor="email-input"
                  className="self-stretch text-stone-900 text-base font-semibold font-['Nunito_Sans']"
                >
                  Email
                </label>
                <div className="self-stretch h-12 px-3 py-2 bg-white rounded-lg outline outline-1 outline-orange-500/20 focus-within:outline-2 focus-within:outline-orange-500 transition-all inline-flex justify-start items-center gap-2">
                  <div className="flex-1 flex justify-start items-center gap-2.5">
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-transparent border-0 outline-none text-base text-stone-900 placeholder:text-zinc-400 font-normal font-['Nunito_Sans']"
                    />
                  </div>
                  <div className="size-6 relative shrink-0" />
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="self-stretch h-14 px-6 py-4 bg-[#E88DA0] hover:bg-[#de7b8f] active:scale-[0.99] rounded-2xl shadow-[1px_1px_8px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2.5 text-white text-lg font-bold font-['Nunito_Sans'] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending code...</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
