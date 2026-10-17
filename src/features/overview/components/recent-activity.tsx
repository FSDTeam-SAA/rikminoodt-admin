"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, Image as ImageIcon, FileText, UserPlus } from "lucide-react"
import { toast } from "sonner"

interface ActivityItem {
  id: string
  title: string
  description: string
  time: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  type: string
}

const activities: ActivityItem[] = [
  {
    id: "act-1",
    title: "Escrow Deposit Confirmed ($450,000)",
    description: "Funds received for Marina Bay Horizon Unit 14B.",
    time: "24m ago",
    icon: DollarSign,
    iconColor: "text-emerald-500 bg-emerald-500/10",
    type: "Financial",
  },
  {
    id: "act-2",
    title: "Architectural Dossier Published",
    description: "4K renders & floorplans updated for Villa Bel-Air Sovereign.",
    time: "1h 10m ago",
    icon: ImageIcon,
    iconColor: "text-blue-500 bg-blue-500/10",
    type: "Media",
  },
  {
    id: "act-3",
    title: "Exclusive Agency Agreement Signed",
    description: "Contract executed with Zurich International Realty.",
    time: "3h ago",
    icon: FileText,
    iconColor: "text-purple-500 bg-purple-500/10",
    type: "Legal",
  },
  {
    id: "act-4",
    title: "New Institutional Investor Onboarded",
    description: "Silverstone Capital granted access to Private Deals portal.",
    time: "5h ago",
    icon: UserPlus,
    iconColor: "text-amber-500 bg-amber-500/10",
    type: "Investor",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              Live Operations Feed
            </CardTitle>
            <CardDescription className="text-xs">
              System transactions, contract events & updates.
            </CardDescription>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon
          return (
            <div
              key={act.id}
              onClick={() => {
                toast.info(act.title, {
                  description: act.description,
                })
              }}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer group"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${act.iconColor}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {act.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                    {act.time}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                  {act.description}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
