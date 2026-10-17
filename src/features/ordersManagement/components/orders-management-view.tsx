"use client"

import * as React from "react"
import { OrdersMetricCards } from "./orders-metric-cards"
import { OrdersTable } from "./orders-table"

export function OrdersManagementView() {
  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Title & Subtitle */}
      <div className="flex flex-col justify-start items-start gap-1">
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          Orders Management
        </h1>
        <p className="text-slate-400 text-base font-medium">
          Manage all print orders and their status
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <OrdersMetricCards />

      {/* Orders Data Table with Search and Status Filter Tabs */}
      <OrdersTable />
    </div>
  )
}

export default OrdersManagementView
