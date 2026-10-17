"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

interface MonthRevenue {
  month: string
  generation: number
  printing: number
}

const monthlyData: MonthRevenue[] = [
  { month: "Jan", generation: 390, printing: 330 },
  { month: "Feb", generation: 270, printing: 235 },
  { month: "Mar", generation: 340, printing: 258 },
  { month: "Apr", generation: 350, printing: 195 },
  { month: "May", generation: 270, printing: 375 },
  { month: "Jun", generation: 270, printing: 220 },
  { month: "Jul", generation: 300, printing: 202 },
  { month: "Aug", generation: 285, printing: 235 },
  { month: "Sep", generation: 390, printing: 300 },
  { month: "Oct", generation: 270, printing: 235 },
  { month: "Nov", generation: 252, printing: 205 },
  { month: "Dec", generation: 390, printing: 335 },
]

export function RevenueChart() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("Monthly")
  const [hoveredData, setHoveredData] = React.useState<{
    month: string
    type: "generation" | "printing"
    value: number
  } | null>(null)

  const maxY = 400
  const yAxisTicks = [400, 300, 200, 100, 0]

  return (
    <div className="w-full p-6 bg-white rounded-lg border border-slate-100 shadow-xs flex flex-col justify-start items-start font-['Nunito_Sans']">
      {/* Header with Title and Period Filter */}
      <div className="self-stretch pb-4 border-b border-violet-50 flex justify-between items-center">
        <h2 className="text-gray-900 text-lg font-semibold tracking-tight">
          Overview (Printing Revenue vs Generation Revenue)
        </h2>
        <div className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-neutral-500 hover:text-gray-900 cursor-pointer transition-colors bg-slate-50/60 hover:bg-slate-100/60 border border-slate-100">
          <span className="text-base font-semibold">{selectedPeriod}</span>
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="w-full pt-8 pb-4 relative overflow-x-auto">
        <div className="min-w-[760px] h-96 relative">
          {/* Horizontal Gridlines & Y-Axis Labels */}
          {yAxisTicks.map((tick) => {
            // Calculate top percentage: tick 400 is at top (0%), tick 0 is at bottom (100% of chart area)
            const topPercent = ((maxY - tick) / maxY) * 85
            return (
              <div
                key={tick}
                className="absolute left-0 right-0 flex items-center gap-2 pointer-events-none"
                style={{ top: `${topPercent}%` }}
              >
                <span className="w-10 text-right text-slate-400 text-sm font-normal">
                  {tick}$
                </span>
                <div className="flex-1 h-px bg-zinc-200" />
              </div>
            )
          })}

          {/* Bars & X-Axis Columns */}
          <div className="absolute inset-0 pl-14 pr-4 flex items-end justify-between">
            {monthlyData.map((item) => {
              const genHeightPercent = (item.generation / maxY) * 85
              const printHeightPercent = (item.printing / maxY) * 85

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center justify-end h-full px-1 group"
                >
                  {/* Tooltip on hover */}
                  <div className="h-full flex items-end justify-center gap-1.5 w-full pb-9">
                    {/* Generation Bar (Pink/Coral) */}
                    <div
                      className="w-5 sm:w-6 lg:w-7 bg-[#E88DA0] hover:bg-[#DE778C] rounded-t-xs transition-all duration-300 relative cursor-pointer"
                      style={{ height: `${genHeightPercent}%` }}
                      onMouseEnter={() =>
                        setHoveredData({
                          month: item.month,
                          type: "generation",
                          value: item.generation,
                        })
                      }
                      onMouseLeave={() => setHoveredData(null)}
                    >
                      {hoveredData?.month === item.month &&
                        hoveredData.type === "generation" && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md pointer-events-none whitespace-nowrap z-20">
                            ${item.generation}
                          </div>
                        )}
                    </div>

                    {/* Printing Bar (Lavender/Purple) */}
                    <div
                      className="w-5 sm:w-6 lg:w-7 bg-[#B794F6] hover:bg-[#A374F5] rounded-t-xs transition-all duration-300 relative cursor-pointer"
                      style={{ height: `${printHeightPercent}%` }}
                      onMouseEnter={() =>
                        setHoveredData({
                          month: item.month,
                          type: "printing",
                          value: item.printing,
                        })
                      }
                      onMouseLeave={() => setHoveredData(null)}
                    >
                      {hoveredData?.month === item.month &&
                        hoveredData.type === "printing" && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md pointer-events-none whitespace-nowrap z-20">
                            ${item.printing}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* X-Axis Month Label */}
                  <span className="text-zinc-600 text-sm font-normal select-none">
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legend Container */}
      <div className="self-stretch pt-4 flex justify-center items-center gap-8 border-t border-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-[#E88DA0] rounded-sm" />
          <span className="text-gray-900 text-base font-semibold">
            Generation Revenue
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-[#B794F6] rounded-sm" />
          <span className="text-gray-900 text-base font-semibold">
            Printing Revenue
          </span>
        </div>
      </div>
    </div>
  )
}

export default RevenueChart
