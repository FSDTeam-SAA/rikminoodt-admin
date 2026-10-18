"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authApi } from "@/features/auth/api"

export function Login() {
    const router = useRouter()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [rememberMe, setRememberMe] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in both email and password.")
            return
        }

        try {
            setIsLoading(true)
            const res = await authApi
                .loginWithCredentials({ email, password })
                .catch(() => null)

            if (res?.error) {
                toast.error(res.error || "Failed to sign in. Please verify your credentials.")
            } else {
                toast.success("Welcome back! Signing in...")
                router.push("/")
            }
        } catch (err: unknown) {
            console.error("Login error:", err)
            toast.error("An unexpected error occurred. Please try again.")
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

            {/* Right side: Login Form */}
            <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-white">
                <div className="w-full max-w-[552px] p-2 sm:p-6 rounded-xl flex flex-col justify-start items-start gap-9">
                    {/* Back button */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex justify-start items-center gap-3 text-gray-900 hover:text-black transition-colors group cursor-pointer focus:outline-none"
                    >
                        <div className="size-6 relative flex items-center justify-center">
                            <ArrowLeft className="w-5 h-5 text-gray-900 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <span className="text-gray-900 text-base font-normal font-['Nunito_Sans']">
                            Back to website
                        </span>
                    </button>

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
                                    Welcome back
                                </h1>
                                <p className="self-stretch text-center text-black text-base font-normal font-['Nunito_Sans']">
                                    Please enter your email & password to access your account.
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

                            {/* Password field */}
                            <div className="self-stretch flex flex-col justify-center items-start gap-3">
                                <label
                                    htmlFor="password-input"
                                    className="self-stretch text-stone-900 text-base font-semibold font-['Nunito_Sans']"
                                >
                                    Password
                                </label>
                                <div className="self-stretch h-12 px-3 py-2 bg-white rounded-lg outline outline-1 outline-orange-500/20 focus-within:outline-2 focus-within:outline-orange-500 transition-all inline-flex justify-start items-center gap-2">
                                    <div className="flex-1 flex justify-start items-center gap-2.5">
                                        <input
                                            id="password-input"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="********************"
                                            required
                                            className="w-full bg-transparent border-0 outline-none text-base text-stone-900 placeholder:text-zinc-400 font-normal font-['Nunito_Sans']"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="size-6 relative flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer shrink-0"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <Eye className="w-5 h-5 text-neutral-500" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-neutral-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me & Forgot Password */}
                            <div className="self-stretch inline-flex justify-between items-center pt-1">
                                <label className="flex justify-start items-center gap-1.5 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="size-4 rounded-sm border border-black accent-orange-500 cursor-pointer"
                                    />
                                    <span className="text-center text-black text-base font-normal font-['Nunito_Sans']">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-right text-orange-500 hover:text-orange-600 text-lg font-bold font-['Nunito_Sans'] transition-colors"
                                >
                                    Forgot Password
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="self-stretch h-14 px-6 py-4 bg-[#E88DA0] hover:bg-[#de7b8f] active:scale-[0.99] rounded-2xl shadow-[1px_1px_8px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2.5 text-white text-lg font-bold font-['Nunito_Sans'] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <span>Login</span>
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
