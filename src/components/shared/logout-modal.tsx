"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authApi } from "@/features/auth/api"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface LogoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogoutModal({ open, onOpenChange }: LogoutModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirmLogout = async () => {
    try {
      setIsLoading(true)
      await authApi.logout()
      toast.success("You have been logged out successfully.")
      onOpenChange(false)
      router.push("/auth/login")
    } catch (err) {
      console.error("Logout error:", err)
      toast.error("Failed to log out. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-2xl bg-white border border-slate-100 shadow-xl font-['Nunito_Sans']">
        <DialogHeader className="flex flex-col items-center text-center gap-3">
          {/* Circular Red Badge */}
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-xs">
            <LogOut className="w-6 h-6 text-rose-500" />
          </div>

          <DialogTitle className="text-xl font-bold text-gray-900">
            Log Out Confirmation
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm font-normal max-w-[320px]">
            Are you sure you want to log out of the admin panel? You will need to log in again to access your dashboard.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row gap-2.5 sm:justify-center border-t-0 bg-transparent p-0">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-1/2 h-11 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleConfirmLogout}
            className="w-full sm:w-1/2 h-11 px-4 bg-[#F43F5E] hover:bg-[#E11D48] text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Logging out...</span>
              </>
            ) : (
              <span>Yes, Log Out</span>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutModal
