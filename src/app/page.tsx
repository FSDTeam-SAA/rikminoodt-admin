"use client"

import * as React from "react"
import { SharedSidebar } from "@/components/shared/sidebar"
import { SharedHeader } from "@/components/shared/header"
import {
  KpiCards,
  RevenueChart,
} from "@/features/overview/components"
import { UserManagementView } from "@/features/userManagement/components"
import { useUIStore } from "@/store/ui.store"

export default function Home() {
  const currentTab = useUIStore((s) => s.currentTab)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-['Nunito_Sans']">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="fixed top-0 bottom-0 left-0 w-64 z-20">
          <SharedSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <SharedHeader />

        <main className="flex-1 p-6 lg:p-8 space-y-6 w-full">
          {currentTab === "users" ? (
            <UserManagementView />
          ) : (
            <>
              {/* Dashboard Overview Greeting Section */}
              <div className="flex flex-col justify-start items-start gap-1">
                <h1 className="text-gray-900 text-2xl font-bold font-['Nunito_Sans'] tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-slate-400 text-base font-medium font-['Nunito_Sans']">
                  Welcome back, Admin. Here is your platform overview.
                </p>
              </div>

              {/* 6 Metric KPI Cards (3 columns x 2 rows) */}
              <KpiCards />

              {/* Overview Bar Chart: Printing Revenue vs Generation Revenue */}
              <RevenueChart />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
