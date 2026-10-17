"use client"

import * as React from "react"
import { SettingsNav } from "./settings-nav"
import { PersonalInformationForm } from "./personal-information-form"
import { SecurityForm } from "./security-form"
import { SettingsTab } from "../types"

export function SettingsView() {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("profile")

  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Title & Subtitle matching Figma snippet */}
      <div className="flex flex-col justify-start items-start gap-1">
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-slate-400 text-base font-medium">
          Manage your admin account and preferences
        </p>
      </div>

      {/* Main Settings 2-Column Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "profile" ? (
          <PersonalInformationForm />
        ) : (
          <SecurityForm />
        )}
      </div>
    </div>
  )
}

export default SettingsView
