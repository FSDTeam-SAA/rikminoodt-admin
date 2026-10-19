"use client"

import * as React from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useChangePassword } from "../hooks"

export function SecurityForm() {
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const [showCurrent, setShowCurrent] = React.useState(false)
  const [showNew, setShowNew] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  const changePasswordMutation = useChangePassword()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword) {
      toast.error("Current password required", {
        description: "Please enter your current password to proceed.",
      })
      return
    }

    if (!newPassword) {
      toast.error("New password required", {
        description: "Please provide a new password.",
      })
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password too short", {
        description: "New password must be at least 6 characters long.",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please ensure your new password and confirmation match.",
      })
      return
    }

    changePasswordMutation.mutate(
      {
        oldPassword: currentPassword,
        newPassword,
      },
      {
        onSuccess: (message) => {
          toast.success("Password Changed Successfully", {
            description: message || "Your account credentials have been updated securely.",
          })
          setCurrentPassword("")
          setNewPassword("")
          setConfirmPassword("")
        },
        onError: (err: any) => {
          toast.error("Password Change Failed", {
            description:
              err.response?.data?.message ||
              err.message ||
              "Invalid old password or failed request.",
          })
        },
      }
    )
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col font-['Nunito_Sans'] overflow-hidden">
      {/* Card Header matching Figma snippet */}
      <div className="w-full p-6 border-b border-slate-200/80 flex items-center justify-between">
        <h2 className="text-gray-900 text-2xl font-medium">
          Change Password
        </h2>
      </div>

      {/* Form Body matching Figma snippet */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          {/* Current Password Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Current Password
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="******************"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none placeholder:text-stone-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="text-slate-600 hover:text-gray-900 ml-2 cursor-pointer transition-colors"
                title={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              New Password
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type={showNew ? "text" : "password"}
                placeholder="******************"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none placeholder:text-stone-500"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="text-slate-600 hover:text-gray-900 ml-2 cursor-pointer transition-colors"
                title={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Confirm New Password Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Confirm New Password
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none placeholder:text-stone-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="text-slate-600 hover:text-gray-900 ml-2 cursor-pointer transition-colors"
                title={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card Footer with Save Changes Button matching Figma snippet */}
        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-start">
          <button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="w-full sm:w-80 h-12 px-4 py-3 bg-[#E88DA0] hover:bg-[#DE778C] text-white text-lg font-semibold rounded-lg border-l-2 border-[#E88DA0] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SecurityForm
