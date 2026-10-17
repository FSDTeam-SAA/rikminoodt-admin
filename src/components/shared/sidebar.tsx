"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react"
import { useUIStore } from "@/store/ui.store"
import { toast } from "sonner"

import Image from "next/image"

export interface NavItem {
  title: string
  key: string
  icon: React.ComponentType<{ className?: string }>
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { title: "User Management", key: "users", icon: Users },
  { title: "Orders Management", key: "orders", icon: ShoppingCart },
]

interface SidebarProps {
  onCloseMobile?: () => void
}

export function SharedSidebar({ onCloseMobile }: SidebarProps) {
  const currentTab = useUIStore((s) => s.currentTab)
  const setCurrentTab = useUIStore((s) => s.setCurrentTab)

  const handleItemClick = (key: string, title: string) => {
    setCurrentTab(key)
    if (onCloseMobile) onCloseMobile()
    toast.info(`Navigated to ${title}`, {
      description: `Viewing ${title} section`,
    })
  }

  const handleLogout = () => {
    toast.info("Logged out", {
      description: "Admin session ended securely.",
    })
  }

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-slate-100 bg-white px-4 py-6 font-['Nunito_Sans'] shadow-xs select-none">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Brand / Logo Area */}
        <div className="px-2 py-1 flex items-center">
          <Image
            src="/logo.png"
            alt="Boekerello"
            width={208}
            height={57}
            priority
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive =
              currentTab === item.key ||
              (currentTab === "overview" && item.key === "dashboard")

            return (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.key, item.title)}
                style={
                  isActive
                    ? {
                        borderRadius: "8px",
                        borderLeft: "2px solid #E88DA0",
                        background: "#E88DA0",
                      }
                    : undefined
                }
                className={`w-full h-12 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-base font-semibold cursor-pointer ${
                  isActive
                    ? "text-white shadow-xs"
                    : "text-neutral-500 hover:bg-slate-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-white" : "text-neutral-500"
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </button>
            )
          })}
        </nav>

        {/* Separator Line */}
        <div className="h-0 border-b border-violet-50/80 my-1" />

        {/* Settings item */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleItemClick("settings", "Settings")}
            className={`w-full h-12 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-base font-semibold cursor-pointer ${
              currentTab === "settings"
                ? "bg-[#E88DA0] text-white"
                : "text-neutral-500 hover:bg-slate-50 hover:text-gray-900"
            }`}
          >
            <Settings className="w-5 h-5 shrink-0 text-neutral-500" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Logout Button */}
      <div className="pt-4">
        <button
          onClick={handleLogout}
          className="w-full h-12 px-4 py-3 bg-[#F43F5E] hover:bg-[#E11D48] text-white rounded-lg flex items-center gap-3 text-base font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <LogOut className="w-5 h-5 shrink-0 text-white" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default SharedSidebar
