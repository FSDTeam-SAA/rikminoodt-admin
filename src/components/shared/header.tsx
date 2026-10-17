"use client"

import * as React from "react"
import {
  Bell,
  Search,
  Plus,
  Menu,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { SharedSidebar } from "./sidebar"
import { useUIStore } from "@/store/ui.store"
import { toast } from "sonner"

interface SharedHeaderProps {
  onOpenNewProject: () => void
}

export function SharedHeader({ onOpenNewProject }: SharedHeaderProps) {
  const currentTab = useUIStore((s) => s.currentTab)
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)
  const unreadNotifications = useUIStore((s) => s.unreadNotifications)
  const clearNotifications = useUIStore((s) => s.clearNotifications)

  const triggerToastDemo = (type: "success" | "error" | "info" | "promise") => {
    switch (type) {
      case "success":
        toast.success("Project updated successfully!", {
          description: "All changes synced to Rikminoodt live database.",
          action: {
            label: "Undo",
            onClick: () => toast.info("Undo action triggered"),
          },
        })
        break
      case "error":
        toast.error("Failed to connect to MLS feeder", {
          description: "Please check your network credentials or retry.",
        })
        break
      case "info":
        toast.info("Scheduled maintenance notice", {
          description: "Analytics system scheduled for sync tonight at 02:00 AM.",
        })
        break
      case "promise":
        const promise = () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: "Portfolio Summary" }), 1800)
          )
        toast.promise(promise, {
          loading: "Exporting portfolio metrics...",
          success: (data: any) => `${data.name} export completed!`,
          error: "Could not export report",
        })
        break
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/95 px-4 backdrop-blur-md sm:px-6">
      {/* Left side: Mobile Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden h-9 w-9 rounded-lg"
                aria-label="Open sidebar menu"
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SharedSidebar onCloseMobile={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Breadcrumb Path */}
        <div className="hidden sm:flex items-center text-sm font-medium">
          <span className="text-muted-foreground">Rikminoodt</span>
          <span className="mx-2 text-muted-foreground/60">/</span>
          <span className="capitalize font-semibold text-foreground">
            {currentTab}
          </span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, leads, transactions... (⌘K)"
            className="pl-9 pr-12 h-9 text-xs bg-muted/40 focus-visible:bg-background transition-colors rounded-lg border-border"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toast.info("Search query submitted", {
                  description: `Showing top results for "${e.currentTarget.value}"`,
                })
              }
            }}
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 flex">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side: Actions, Toast Quick Tester, Notifications, Theme, New Project */}
      <div className="flex items-center gap-2">
        {/* Toast demo dropdown to highlight Sonner capabilities */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="hidden xl:flex items-center gap-1.5 h-9 rounded-lg text-xs font-medium cursor-pointer"
              />
            }
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Test Sonner Toast</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs">
              Sonner Toast Examples
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => triggerToastDemo("success")}>
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
              <span>Success Toast + Undo</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => triggerToastDemo("error")}>
              <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
              <span>Error Alert Toast</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => triggerToastDemo("info")}>
              <Info className="mr-2 h-4 w-4 text-blue-500" />
              <span>Info Notice Toast</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => triggerToastDemo("promise")}>
              <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
              <span>Async Promise Toast</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="relative h-9 w-9 rounded-lg cursor-pointer"
                aria-label="View notifications"
              />
            }
          >
            <Bell className="h-4 w-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadNotifications}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
              <span className="text-xs font-semibold">Notifications</span>
              <Badge variant="secondary" className="text-[10px]">
                {unreadNotifications} new
              </Badge>
            </div>
            <div className="py-1">
              <DropdownMenuItem
                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                onClick={() =>
                  toast.success("Lead #402 contacted", {
                    description: "Lead opened in CRM viewer.",
                  })
                }
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-foreground">
                    New High-Priority Inquiry
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  Investor David Vance inquired about Marina Bay Horizon Penthouse ($4.2M).
                </p>
                <span className="text-[10px] text-muted-foreground/70">
                  5 minutes ago
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                onClick={() =>
                  toast.info("Contract signed", {
                    description: "Escrow deposit confirmed.",
                  })
                }
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-foreground">
                    Contract Executed
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  Unit 1804 at Azure Palms Villa signed and under deposit.
                </p>
                <span className="text-[10px] text-muted-foreground/70">
                  1 hour ago
                </span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <div className="p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs justify-center text-primary"
                onClick={() => {
                  clearNotifications()
                  toast.info("All notifications marked as read")
                }}
              >
                Mark all as read
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Add Project CTA */}
        <Button
          onClick={onOpenNewProject}
          size="sm"
          className="h-9 gap-1.5 rounded-lg px-3.5 shadow-sm font-medium cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Project</span>
        </Button>
      </div>
    </header>
  )
}

export default SharedHeader
