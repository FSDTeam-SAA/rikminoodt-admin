"use client"

import * as React from "react"
import { Users, BookOpen, Printer, DollarSign } from "lucide-react"

export interface KpiCardItem {
  id: string
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  iconBoxBg: string
  iconColor: string
  borderColor: string
}

const kpiItems: KpiCardItem[] = [
  {
    id: "total-users",
    title: "Total Users",
    value: "450",
    icon: Users,
    iconBoxBg: "bg-pink-400/10",
    iconColor: "text-[#E88DA0]",
    borderColor: "border-pink-200/50",
  },
  {
    id: "total-books",
    title: "Total Books Generated",
    value: "1,200",
    icon: BookOpen,
    iconBoxBg: "bg-orange-400/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-200/50",
  },
  {
    id: "total-print-orders",
    title: "Total Print Orders",
    value: "180",
    icon: Printer,
    iconBoxBg: "bg-blue-400/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-200/50",
  },
  {
    id: "total-revenue",
    title: "Total Revenue",
    value: "$ 24,650",
    icon: DollarSign,
    iconBoxBg: "bg-sky-400/10",
    iconColor: "text-sky-400",
    borderColor: "border-sky-200/50",
  },
  {
    id: "generation-revenue",
    title: "Generation Revenue",
    value: "$ 24,650",
    icon: DollarSign,
    iconBoxBg: "bg-emerald-400/10",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-200/50",
  },
  {
    id: "printing-revenue",
    title: "Printing Revenue",
    value: "$ 24,650",
    icon: Printer,
    iconBoxBg: "bg-purple-400/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-200/50",
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {kpiItems.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.id}
            className="bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col justify-start gap-3 transition-all hover:shadow-sm hover:border-slate-200"
          >
            {/* Card Title */}
            <div className="text-slate-400 text-base font-semibold font-['Nunito_Sans']">
              {item.title}
            </div>

            {/* Icon Box */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-xl ${item.iconBoxBg} ${item.borderColor} border flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
            </div>

            {/* Value */}
            <div className="text-gray-900 text-2xl font-bold font-['Nunito_Sans'] tracking-tight">
              {item.value}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KpiCards
