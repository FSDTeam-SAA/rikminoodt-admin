"use client"

import * as React from "react"
import {
  DollarSign,
  Building,
  Users2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function KpiCards() {
  const metrics = [
    {
      title: "Portfolio Valuation",
      value: "$428.5M",
      change: "+14.2%",
      trend: "up",
      period: "vs last quarter",
      icon: DollarSign,
      subtext: "24 prime assets under management",
      badgeColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      title: "Active Developments",
      value: "24",
      change: "+3 new",
      trend: "up",
      period: "this month",
      icon: Building,
      subtext: "18 available, 4 under contract",
      badgeColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
    },
    {
      title: "Qualified Inquiries",
      value: "1,428",
      change: "+28.4%",
      trend: "up",
      period: "vs previous 30 days",
      icon: Users2,
      subtext: "84 VIP priority investors",
      badgeColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      title: "Average Deal Volume",
      value: "$3.85M",
      change: "+6.7%",
      trend: "up",
      period: "closing average",
      icon: TrendingUp,
      subtext: "19.2% close conversion rate",
      badgeColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon
        return (
          <Card
            key={idx}
            className="overflow-hidden border-border/80 shadow-xs hover:shadow-md transition-all hover:border-primary/40 group"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {m.title}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {m.value}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${m.badgeColor}`}
                >
                  {m.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {m.change}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">{m.subtext}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
