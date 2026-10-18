"use client"

import * as React from "react"
import { ReviewsMetricCards } from "./reviews-metric-cards"
import { ReviewsTable } from "./reviews-table"

export function ReviewManagementView() {
  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Title & Subtitle */}
      <div className="flex flex-col justify-start items-start gap-1">
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          Review Management
        </h1>
        <p className="text-slate-400 text-base font-medium">
          Monitor customer ratings, approve feedback, and reply to book reviews
        </p>
      </div>

      {/* Top Metric Cards */}
      <ReviewsMetricCards />

      {/* Reviews Data Table with Search, Filter Tabs & Modal */}
      <ReviewsTable />
    </div>
  )
}

export default ReviewManagementView
