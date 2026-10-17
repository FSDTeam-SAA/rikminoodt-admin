"use client"

import * as React from "react"
import { SharedSidebar } from "@/components/shared/sidebar"
import { SharedHeader } from "@/components/shared/header"
import {
  KpiCards,
  ProjectList,
  LeadsCard,
  RecentActivity,
  NewProjectDialog,
} from "@/features/sample-feature/components"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useUIStore } from "@/store/ui.store"
import { RefreshCw, FileSpreadsheet, Plus } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { PROJECTS_QUERY_KEY } from "@/features/sample-feature/hooks"

export default function Home() {
  const currentTab = useUIStore((s) => s.currentTab)
  const setCurrentTab = useUIStore((s) => s.setCurrentTab)
  const [newProjectOpen, setNewProjectOpen] = React.useState(false)
  const [isSyncing, setIsSyncing] = React.useState(false)

  const queryClient = useQueryClient()

  const handleSyncData = () => {
    setIsSyncing(true)
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
      setIsSyncing(false)
      toast.success("Synchronized with Rikminoodt MLS & Asset feed!", {
        description: "All client records and project inventories updated.",
      })
    }, 1200)
  }

  const handleExportCSV = () => {
    toast.success("CSV export generated!", {
      description: "rikminoodt_portfolio_q4.csv ready for download.",
      action: {
        label: "Download",
        onClick: () => toast.info("Downloading file..."),
      },
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="fixed top-0 bottom-0 left-0 w-64 z-20">
          <SharedSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <SharedHeader onOpenNewProject={() => setNewProjectOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Welcome & Quick Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 p-6 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Rikminoodt Executive Portal
                </h1>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Live Operations
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Overview of portfolio valuation, development pipelines, and qualified investor leads.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSyncData}
                disabled={isSyncing}
                className="h-9 gap-1.5 rounded-lg text-xs font-medium cursor-pointer"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`}
                />
                <span>Sync MLS</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="h-9 gap-1.5 rounded-lg text-xs font-medium cursor-pointer"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </Button>

              <Button
                size="sm"
                onClick={() => setNewProjectOpen(true)}
                className="h-9 gap-1.5 rounded-lg text-xs font-semibold shadow-sm cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Project</span>
              </Button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <KpiCards />

          {/* Interactive Navigation Tabs */}
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={setCurrentTab}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
              <TabsList className="bg-muted/70 p-1 rounded-xl">
                <TabsTrigger value="overview" className="text-xs rounded-lg cursor-pointer">
                  Portfolio Overview
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs rounded-lg cursor-pointer">
                  Projects (TanStack Query)
                </TabsTrigger>
                <TabsTrigger value="leads" className="text-xs rounded-lg cursor-pointer">
                  Investor Leads (4)
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs rounded-lg cursor-pointer">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Last updated: Just now</span>
              </div>
            </div>

            {/* TAB: Overview */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Projects Table via TanStack Query */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-foreground">
                      Featured Rikminoodt Developments
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Active luxury assets, pricing tiers, and direct inquiries.
                    </p>
                  </div>
                </div>

                <ProjectList />
              </div>

              {/* Grid with Leads & Live Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                <LeadsCard />
                <RecentActivity />
              </div>
            </TabsContent>

            {/* TAB: Projects */}
            <TabsContent value="projects" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    All Property Listings
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Manage full inventory, unit availability, and pricing tiers.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setNewProjectOpen(true)}
                  className="gap-1.5 text-xs h-8 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Project</span>
                </Button>
              </div>

              <ProjectList />
            </TabsContent>

            {/* TAB: Leads */}
            <TabsContent value="leads" className="space-y-4 mt-0">
              <LeadsCard />
            </TabsContent>

            {/* TAB: Analytics */}
            <TabsContent value="analytics" className="space-y-4 mt-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-5 border-border/80">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                    Pipeline Velocity
                  </h3>
                  <div className="text-2xl font-bold mt-2">$78.2M</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Deals currently in closing stage
                  </p>
                </Card>
                <Card className="p-5 border-border/80">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                    Lead Response Time
                  </h3>
                  <div className="text-2xl font-bold mt-2">14 Minutes</div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    42% faster than industry benchmark
                  </p>
                </Card>
                <Card className="p-5 border-border/80">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                    Avg Contract Margin
                  </h3>
                  <div className="text-2xl font-bold mt-2">24.8%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maintained across luxury developments
                  </p>
                </Card>
              </div>
              <RecentActivity />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* New Project Dialog */}
      <NewProjectDialog
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
      />
    </div>
  )
}
