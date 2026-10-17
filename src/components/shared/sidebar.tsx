"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  FolderKanban,
  Settings,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useUIStore } from "@/store/ui.store"
import { toast } from "sonner"

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const mainNavItems: NavItem[] = [
  { title: "Overview", href: "#overview", icon: LayoutDashboard },
  { title: "Projects & Units", href: "#projects", icon: Building2, badge: "24" },
  { title: "Leads & Inquiries", href: "#leads", icon: Users, badge: "New 8" },
  { title: "Financials & Analytics", href: "#analytics", icon: TrendingUp },
  { title: "Portfolio Assets", href: "#portfolio", icon: FolderKanban },
  { title: "Investors & Clients", href: "#clients", icon: Briefcase },
]

const secondaryNavItems: NavItem[] = [
  { title: "Access & Roles", href: "#roles", icon: ShieldCheck },
  { title: "Settings", href: "#settings", icon: Settings },
  { title: "Support & Docs", href: "#docs", icon: HelpCircle },
]

interface SidebarProps {
  onCloseMobile?: () => void
}

export function SharedSidebar({ onCloseMobile }: SidebarProps) {
  const currentTab = useUIStore((s) => s.currentTab)
  const setCurrentTab = useUIStore((s) => s.setCurrentTab)

  const handleItemClick = (title: string) => {
    setCurrentTab(title.toLowerCase())
    if (onCloseMobile) onCloseMobile()
    toast.info(`Navigated to ${title}`, {
      description: `Viewing ${title} workspace section`,
    })
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/80 bg-sidebar text-sidebar-foreground">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground flex items-center gap-1.5">
              Rikminoodt
              <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                PRO
              </span>
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Admin Portal
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isSelected =
                currentTab === item.title.toLowerCase() ||
                (currentTab === "overview" && item.title === "Overview")

              return (
                <button
                  key={item.title}
                  onClick={() => handleItemClick(item.title)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-semibold"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${
                        isSelected
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant={isSelected ? "secondary" : "outline"}
                      className={`text-[10px] px-1.5 py-0 h-5 font-medium ${
                        isSelected
                          ? "bg-white/20 text-white border-transparent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <Separator className="opacity-50" />

        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Preferences & Security
          </div>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon
              const isSelected = currentTab === item.title.toLowerCase()

              return (
                <button
                  key={item.title}
                  onClick={() => handleItemClick(item.title)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${
                        isSelected
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="rounded-xl border border-border/80 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Real-Time Sync
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Connected to Rikminoodt Cloud. Changes sync across all endpoints.
          </p>
        </div>
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-border/60 bg-muted/20">
        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/60 transition-colors">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                RM
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-foreground">
                Rikminoodt Executive
              </span>
              <span className="text-[11px] text-muted-foreground">
                admin@rikminoodt.com
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={() => {
              toast.info("Logged out successfully", {
                description: "Session closed securely.",
              })
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default SharedSidebar
