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
    <div className="w-full lg:w-80 bg-white rounded-2xl p-4 border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col gap-3 font-['Nunito_Sans']">
      {/* Settings Header with border-b matching snippet */}
      <div className="w-full pb-3 border-b border-slate-200/80 flex items-center justify-between">
        <div className="text-2xl font-medium text-gray-900 px-1">
          Settings
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              style={
                isActive
                  ? {
                      borderRadius: "8px",
                      background: "#E88DA0",
                    }
                  : undefined
              }
              className={`w-full h-11 px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-colors text-base font-medium cursor-pointer ${
                isActive
                  ? "text-white shadow-xs"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "text-white" : "text-stone-800"
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
