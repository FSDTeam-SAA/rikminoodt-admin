"use client"

import * as React from "react"
import { DashboardSidebar } from "./sidebar"
import { DashboardHeader } from "./header"
import { KpiCards } from "./kpi-cards"
import { ProjectsTable } from "./projects-table"
import { LeadsCard } from "./leads-card"
import { RecentActivity } from "./recent-activity"
import { NewProjectDialog, ProjectData } from "./new-project-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Download,
  Plus,
  RefreshCw,
  Sparkles,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"

const initialProjects: ProjectData[] = [
  {
    id: "RM-901",
    name: "The Sovereign Penthouse at Biscayne",
    category: "Sky Penthouse",
    location: "Biscayne Bay, Miami FL",
    price: "$14,800,000",
    units: 1,
    status: "Active",
    inquiries: 28,
    roi: "14.2%",
  },
  {
    id: "RM-902",
    name: "Azure Horizon Residences",
    category: "Luxury Villa",
    location: "Sunny Isles Beach, FL",
    price: "$4,200,000",
    units: 16,
    status: "Active",
    inquiries: 64,
    roi: "11.8%",
  },
  {
    id: "RM-903",
    name: "One Island Marina Towers",
    category: "Commercial Tower",
    location: "Brickell Financial District",
    price: "$6,950,000",
    units: 8,
    status: "Under Contract",
    inquiries: 42,
    roi: "15.4%",
  },
  {
    id: "RM-904",
    name: "Miramar Bay Palms Estate",
    category: "Waterfront Estate",
    location: "Key Biscayne, FL",
    price: "$8,750,000",
    units: 4,
    status: "Upcoming",
    inquiries: 19,
    roi: "13.0%",
  },
  {
    id: "RM-905",
    name: "Elysian Sky Mansions",
    category: "Sky Penthouse",
    location: "Downtown Miami Skyline",
    price: "$18,500,000",
    units: 2,
    status: "Active",
    inquiries: 37,
    roi: "16.1%",
  },
]

export function AdminDashboard() {
  const [currentTab, setCurrentTab] = React.useState("overview")
  const [projects, setProjects] = React.useState<ProjectData[]>(initialProjects)
  const [newProjectOpen, setNewProjectOpen] = React.useState(false)
  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleAddProject = (project: ProjectData) => {
    setProjects((prev) => [project, ...prev])
  }

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const handleStatusChange = (id: string, status: ProjectData["status"]) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    )
  }

  const handleSyncData = () => {
    setIsSyncing(true)
    const promise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          setIsSyncing(false)
          resolve({ count: projects.length })
        }, 1200)
      })

    toast.promise(promise, {
      loading: "Connecting to Rikminoodt MLS & Asset feed...",
      success: (data: any) =>
        `Synced ${data.count} properties with live server!`,
      error: "Sync failed. Retry shortly.",
    })
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
          <DashboardSidebar
            currentTab={currentTab}
            onTabChange={setCurrentTab}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardHeader
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenNewProject={() => setNewProjectOpen(true)}
        />

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
                className="h-9 gap-1.5 rounded-lg text-xs font-medium"
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
                className="h-9 gap-1.5 rounded-lg text-xs font-medium"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </Button>

              <Button
                size="sm"
                onClick={() => setNewProjectOpen(true)}
                className="h-9 gap-1.5 rounded-lg text-xs font-semibold shadow-sm"
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
                <TabsTrigger value="overview" className="text-xs rounded-lg">
                  Portfolio Overview
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs rounded-lg">
                  Projects ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="leads" className="text-xs rounded-lg">
                  Investor Leads (4)
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs rounded-lg">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Last updated: Just now</span>
              </div>
            </div>

            {/* TAB: Overview */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Projects Table */}
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

                <ProjectsTable
                  projects={projects}
                  onDeleteProject={handleDeleteProject}
                  onStatusChange={handleStatusChange}
                />
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
                  className="gap-1.5 text-xs h-8"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Project</span>
                </Button>
              </div>

              <ProjectsTable
                projects={projects}
                onDeleteProject={handleDeleteProject}
                onStatusChange={handleStatusChange}
              />
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
        onAddProject={handleAddProject}
      />
    </div>
  )
}
