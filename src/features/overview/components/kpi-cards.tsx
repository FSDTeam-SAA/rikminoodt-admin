"use client"

import * as React from "react"
import { Users, BookOpen, Printer, DollarSign } from "lucide-react"
import { useDashboardCards } from "../hooks/use-dashboard"

export interface KpiCardConfig {
  id: string
  title: string
  getValue: (data?: any) => string
  icon: React.ComponentType<{ className?: string }>
  iconBoxBg: string
  iconColor: string
  borderColor: string
}

const kpiConfigs: KpiCardConfig[] = [
  {
    id: "total-users",
    title: "Total Users",
    getValue: (data) =>
      data?.totalUsers != null ? data.totalUsers.toLocaleString() : "0",
    icon: Users,
    iconBoxBg: "bg-pink-400/10",
    iconColor: "text-[#E88DA0]",
    borderColor: "border-pink-200/50",
  },
  {
    id: "total-books",
    title: "Total Books Generated",
    getValue: (data) =>
      data?.totalBooksGenerated != null
        ? data.totalBooksGenerated.toLocaleString()
        : "0",
    icon: BookOpen,
    iconBoxBg: "bg-orange-400/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-200/50",
  },
  {
    id: "total-print-orders",
    title: "Total Print Orders",
    getValue: (data) =>
      data?.totalPrintOrders != null
        ? data.totalPrintOrders.toLocaleString()
        : "0",
    icon: Printer,
    iconBoxBg: "bg-blue-400/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-200/50",
  },
  {
    id: "total-revenue",
    title: "Total Revenue",
    getValue: (data) =>
      data?.totalRevenue != null
        ? `$ ${data.totalRevenue.toLocaleString()}`
        : "$ 0",
    icon: DollarSign,
    iconBoxBg: "bg-sky-400/10",
    iconColor: "text-sky-400",
    borderColor: "border-sky-200/50",
  },
  {
    id: "generation-revenue",
    title: "Generation Revenue",
    getValue: (data) =>
      data?.generationRevenue != null
        ? `$ ${data.generationRevenue.toLocaleString()}`
        : "$ 0",
    icon: DollarSign,
    iconBoxBg: "bg-emerald-400/10",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-200/50",
  },
  {
    id: "printing-revenue",
    title: "Printing Revenue",
    getValue: (data) =>
      data?.printingRevenue != null
        ? `$ ${data.printingRevenue.toLocaleString()}`
        : "$ 0",
    icon: Printer,
    iconBoxBg: "bg-purple-400/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-200/50",
  },
]

export function KpiCards() {
  const { data, isLoading } = useDashboardCards()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {kpiConfigs.map((config) => {
        const Icon = config.icon
        const value = config.getValue(data)

        return (
          <div
            key={config.id}
            className="bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col justify-start gap-3 transition-all hover:shadow-sm hover:border-slate-200"
          >
            {/* Card Title */}
            <div className="text-slate-400 text-base font-semibold font-['Nunito_Sans']">
              {config.title}
            </div>

            {/* Icon Box */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-xl ${config.iconBoxBg} ${config.borderColor} border flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${config.iconColor}`} />
              </div>
            </div>

            {/* Value */}
            {isLoading ? (
              <div className="h-8 w-28 bg-slate-100 rounded-md animate-pulse" />
            ) : (
              <div className="text-gray-900 text-2xl font-bold font-['Nunito_Sans'] tracking-tight">
                {value}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default KpiCards
