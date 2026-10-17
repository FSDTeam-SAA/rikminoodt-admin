"use client"

import * as React from "react"
import { Lock } from "lucide-react"
import { toast } from "sonner"

export function SecurityForm() {
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [twoFactor, setTwoFactor] = React.useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please ensure your new password and confirmation match.",
      })
      return
    }
    toast.success("Security Settings Saved", {
      description: "Password and authentication settings have been updated.",
    })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col font-['Nunito_Sans'] overflow-hidden">
      {/* Card Header */}
      <div className="w-full p-6 border-b border-slate-200/80 flex items-center justify-between">
        <h2 className="text-gray-900 text-2xl font-medium">Security Settings</h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-6 max-w-xl">
          {/* Current Password */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Current Password
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="password"
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              New Password
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Confirm New Password
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>

          {/* Two-Factor Authentication Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold text-base">
                Two-Factor Authentication (2FA)
              </span>
              <span className="text-slate-500 text-sm">
                Add an extra layer of security to your admin account.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactor((p) => !p)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                twoFactor ? "bg-[#E88DA0]" : "bg-slate-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  twoFactor ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Card Footer with Save Changes Button */}
        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-start">
          <button
            type="submit"
            className="w-full sm:w-80 h-12 px-4 py-3 bg-[#E88DA0] hover:bg-[#DE778C] text-white text-lg font-semibold rounded-lg border-l-2 border-[#E88DA0] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default SecurityForm
