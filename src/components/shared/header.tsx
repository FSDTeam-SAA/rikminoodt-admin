"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SharedSidebar } from "./sidebar"
import { useUIStore } from "@/store/ui.store"
import { authApi } from "@/features/auth/api"
import { AdminUser } from "@/features/auth/types"
import { toast } from "sonner"

export function SharedHeader() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)
  const [user, setUser] = React.useState<AdminUser | null>(null)

  React.useEffect(() => {
    const syncUser = () => setUser(authApi.getCurrentUser())
    syncUser()
    window.addEventListener("admin_user_updated", syncUser)
    return () => window.removeEventListener("admin_user_updated", syncUser)
  }, [])

  const handleProfileClick = () => {
    toast.info("Admin Account", {
      description: `${user?.name || "Administrator"} (${user?.email || "admin@boekerello.com"})`,
    })
  }

  const defaultAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white px-6 font-['Nunito_Sans'] shadow-xs">
      {/* Left side: Mobile Hamburger + Dashboard Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden h-9 w-9 rounded-lg border-slate-200"
                aria-label="Open sidebar menu"
              />
            }
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r border-slate-100">
            <SharedSidebar onCloseMobile={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Dashboard Title */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Right side: User Profile Pill */}
      <div className="flex items-center gap-3">
        {/* User Pill */}
        <div
          onClick={handleProfileClick}
          className="px-2.5 py-1.5 bg-violet-50/70 hover:bg-violet-100/70 transition-colors rounded-lg flex items-center gap-2.5 cursor-pointer border border-violet-100/40"
        >
          <img
            src={user?.profileImage || defaultAvatar}
            alt={user?.name || "Admin"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-xs font-semibold text-gray-900 font-['Nunito_Sans'] max-w-[120px] truncate">
            {user?.name || "Rikminoodt"}
          </span>
        </div>
      </div>
    </header>
  )
}

export default SharedHeader
