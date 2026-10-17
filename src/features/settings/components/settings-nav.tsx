"use client"

import * as React from "react"
import { User, Shield } from "lucide-react"
import { SettingsTab } from "../types"

interface SettingsNavProps {
  activeTab: SettingsTab
  onTabChange: (tab: SettingsTab) => void
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const tabs = [
    {
      key: "profile" as SettingsTab,
      label: "Profile",
      icon: User,
    },
    {
      key: "security" as SettingsTab,
      label: "Security",
      icon: Shield,
    },
  ]

  return (
    <div className="w-full lg:w-72 bg-white rounded-2xl p-4 border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col gap-4 font-['Nunito_Sans']">
      <div className="text-xl font-bold text-gray-900 px-3 py-1">
        Settings
      </div>

      <nav className="flex flex-col gap-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              style={
                isActive
                  ? {
                      borderRadius: "8px",
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
              <span className="truncate">{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default SettingsNav
