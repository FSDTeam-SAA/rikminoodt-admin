"use client"

import * as React from "react"
import { BookOpen, DollarSign } from "lucide-react"
import { OrderMetrics } from "../types"

interface OrdersMetricCardsProps {
  metrics?: OrderMetrics
}

export function OrdersMetricCards({
  metrics = {
    totalOrders: "1,450",
    totalPendingOrders: "1,200",
    totalBooksDelivered: "1,200",
    printingRevenue: "$ 24,650",
  },
}: OrdersMetricCardsProps) {
  const cards = [
    {
      title: "Total Order",
      value: metrics.totalOrders,
      iconBg: "bg-emerald-600/10",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-600/20",
      icon: BookOpen,
    },
    {
      title: "Total Pending Order",
      value: metrics.totalPendingOrders,
      iconBg: "bg-orange-400/10",
      iconColor: "text-orange-400",
      borderColor: "border-orange-400/20",
      icon: BookOpen,
    },
    {
      title: "Total Books Delivered",
      value: metrics.totalBooksDelivered,
      iconBg: "bg-emerald-600/10",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-600/20",
      icon: BookOpen,
    },
    {
      title: "Printing Revenue",
      value: metrics.printingRevenue,
      iconBg: "bg-purple-400/10",
      iconColor: "text-purple-400",
      borderColor: "border-purple-400/20",
      icon: DollarSign,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full font-['Nunito_Sans']">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className="w-full p-4 bg-white rounded-lg border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col justify-start items-start gap-2 hover:shadow-md transition-shadow"
          >
            <div className="w-full text-slate-400 text-base font-semibold">
              {card.title}
            </div>

            <div className="w-full flex items-center gap-2">
              <div
                className={`w-10 h-10 ${card.iconBg} rounded-xl border ${card.borderColor} flex justify-center items-center shrink-0`}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>

            <div className="w-full flex items-center gap-2">
              <div className="flex-1 text-gray-900 text-2xl font-bold tracking-tight">
                {card.value}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrdersMetricCards
