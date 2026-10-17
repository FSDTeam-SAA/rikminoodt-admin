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
        <div className="px-2 py-1 flex items-center gap-2">
          {/* Rocket Icon */}
          <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              {/* Thrust Flame */}
              <path
                d="M10 24L7 30C7 30 11 29 13 27L10 24Z"
                fill="#38BDF8"
              />
              <path
                d="M8 26L6 29C6 29 8.5 28.5 9.5 27.5L8 26Z"
                fill="#FBBF24"
              />
              {/* Fins */}
              <path
                d="M9 22L4 21C4 21 5 15 11 16L12 19L9 22Z"
                fill="#F59E0B"
              />
              <path
                d="M21 16L22 11C22 11 28 12 27 18L24 19L21 16Z"
                fill="#F59E0B"
              />
              {/* Rocket Main Body */}
              <path
                d="M28 8C28 8 26 3 20 5C14 7 11 15 11 20L17 26C22 26 30 23 32 17C34 11 28 8 28 8Z"
                fill="#E88DA0"
              />
              {/* Porthole Window */}
              <circle cx="21" cy="14" r="3.2" fill="#FFFFFF" />
              <circle cx="21" cy="14" r="2.2" fill="#60A5FA" />
              {/* Nose Cone Accent */}
              <path
                d="M26 6.5C26 6.5 27 8 28 8C29 8 30.5 7.5 30.5 7.5C30.5 7.5 28.5 5 26 6.5Z"
                fill="#FB7185"
              />
            </svg>
          </div>

          {/* Boekerello Text Logo with multi-colored letters as in user snippet */}
          <div className="h-9 flex items-center font-bold text-2xl font-['Inter'] tracking-tight">
            <span className="text-[#E88DA0]">B</span>
            <span className="text-orange-400">o</span>
            <span className="text-blue-400">e</span>
            <span className="text-green-500">k</span>
            <span className="text-slate-400">e</span>
            <span className="text-[#E88DA0]">r</span>
            <span className="text-orange-400">e</span>
            <span className="text-blue-400">l</span>
            <span className="text-green-500">l</span>
            <span className="text-[#E88DA0]">o</span>
          </div>
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
