"use client"

import * as React from "react"
import { SharedSidebar } from "@/components/shared/sidebar"
import { SharedHeader } from "@/components/shared/header"
import { SettingsView } from "@/features/settings/components"
import { useUIStore } from "@/store/ui.store"

export default function SettingsPage() {
  const setCurrentTab = useUIStore((s) => s.setCurrentTab)

  React.useEffect(() => {
    setCurrentTab("settings")
  }, [setCurrentTab])

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-['Nunito_Sans']">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="fixed top-0 bottom-0 left-0 w-64 z-20">
          <SharedSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <SharedHeader />

        <main className="flex-1 p-6 lg:p-8 space-y-6 w-full">
          <SettingsView />
        </main>
      </div>
    </div>
  )
}
