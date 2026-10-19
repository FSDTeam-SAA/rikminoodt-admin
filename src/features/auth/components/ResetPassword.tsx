"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authApi } from "@/features/auth/api"

export function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || ""

  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailParam) {
      toast.error("Email address is missing. Please start from the forgot password page.")
      return
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields.")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.")
      return
    }

    try {
      setIsLoading(true)
      const res = await authApi.resetPassword({
        email: emailParam,
        newPassword: newPassword,
      })

      toast.success(res.message || "Password reset successfully! Please log in.")
      router.push("/auth/login")
    } catch (err: any) {
      console.error("Reset password error:", err)
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.errorSources?.[0]?.message ||
        err?.message ||
        "Failed to reset password. Please try again."
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

      {/* Right side: Reset Password Form */}
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
            <div className="self-stretch flex flex-col justify-start items-start gap-5">
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
                  Reset Password?
                </h1>
                <p className="self-stretch text-center text-black text-base font-normal font-['Nunito_Sans']">
                  Please enter a new password for your account. Use a strong password to keep your account secure.
                </p>
              </div>

              {/* New Password field */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
                <label
                  htmlFor="new-password"
                  className="self-stretch text-stone-900 text-base font-semibold font-['Nunito_Sans']"
                >
                  New Password
                </label>
                <div className="self-stretch h-12 px-3 py-2 bg-white rounded-lg outline outline-1 outline-orange-500/20 focus-within:outline-2 focus-within:outline-orange-500 transition-all inline-flex justify-start items-center gap-2">
                  <div className="flex-1 flex justify-start items-center gap-2.5">
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="********************"
                      required
                      className="w-full bg-transparent border-0 outline-none text-base text-stone-900 placeholder:text-zinc-400 font-normal font-['Nunito_Sans']"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="size-6 relative flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer shrink-0"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <Eye className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-neutral-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password field */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
                <label
                  htmlFor="confirm-password"
                  className="self-stretch text-stone-900 text-base font-semibold font-['Nunito_Sans']"
                >
                  Confirm Password
                </label>
                <div className="self-stretch h-12 px-3 py-2 bg-white rounded-lg outline outline-1 outline-orange-500/20 focus-within:outline-2 focus-within:outline-orange-500 transition-all inline-flex justify-start items-center gap-2">
                  <div className="flex-1 flex justify-start items-center gap-2.5">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="********************"
                      required
                      className="w-full bg-transparent border-0 outline-none text-base text-stone-900 placeholder:text-zinc-400 font-normal font-['Nunito_Sans']"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="size-6 relative flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer shrink-0"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-neutral-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="self-stretch h-14 px-6 py-4 bg-[#E88DA0] hover:bg-[#de7b8f] active:scale-[0.99] rounded-2xl shadow-[1px_1px_8px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2.5 text-white text-lg font-bold font-['Nunito_Sans'] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Changing Password...</span>
                </>
              ) : (
                <span>Change Password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
