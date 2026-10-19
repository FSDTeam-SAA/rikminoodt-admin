"use client"

import * as React from "react"
import { ChevronDown, Calendar } from "lucide-react"
import { useOverviewGraph } from "../hooks/use-dashboard"

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function RevenueChart() {
  const [selectedYear, setSelectedYear] = React.useState<number>(2026)
  const [availableYears, setAvailableYears] = React.useState<number[]>([2026, 2025, 2024])
  const [isYearDropdownOpen, setIsYearDropdownOpen] = React.useState(false)

  React.useEffect(() => {
    const yr = new Date().getFullYear()
    setSelectedYear(yr)
    setAvailableYears([yr, yr - 1, yr - 2])
  }, [])

  const { data: graphData, isLoading } = useOverviewGraph(selectedYear)

  const [hoveredData, setHoveredData] = React.useState<{
    month: string
    type: "generation" | "printing"
    value: number
  } | null>(null)

  // Map backend 1..12 data to months with fallbacks
  const monthlyData = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthNum = i + 1
      const item = graphData?.find((d) => d.month === monthNum)
      return {
        month: MONTH_NAMES[i],
        generation: item?.generationRevenue ?? 0,
        printing: item?.printingRevenue ?? 0,
      }
    })
  }, [graphData])

  // Calculate dynamic max Y for chart scale
  const maxY = React.useMemo(() => {
    let max = 0
    for (const item of monthlyData) {
      if (item.generation > max) max = item.generation
      if (item.printing > max) max = item.printing
    }
    if (max <= 0) return 400
    // Round up to nice number
    const step = max > 1000 ? 500 : 100
    return Math.ceil(max / step) * step
  }, [monthlyData])

  const yAxisTicks = React.useMemo(() => {
    return [
      maxY,
      Math.round(maxY * 0.75),
      Math.round(maxY * 0.5),
      Math.round(maxY * 0.25),
      0,
    ]
  }, [maxY])

  return (
    <div className="w-full p-6 bg-white rounded-lg border border-slate-100 shadow-xs flex flex-col justify-start items-start font-['Nunito_Sans']">
      {/* Header with Title and Year Selector */}
      <div className="self-stretch pb-4 border-b border-violet-50 flex justify-between items-center relative">
        <h2 className="text-gray-900 text-lg font-semibold tracking-tight">
          Overview (Printing Revenue vs Generation Revenue)
        </h2>

        {/* Year Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            className="px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-neutral-600 hover:text-gray-900 cursor-pointer transition-colors bg-slate-50/80 hover:bg-slate-100 border border-slate-200/60 shadow-2xs text-sm font-semibold"
          >
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>Year {selectedYear}</span>
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          </button>

          {isYearDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => {
                    setSelectedYear(yr)
                    setIsYearDropdownOpen(false)
                  }}
                  className={`w-full px-3 py-1.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                    selectedYear === yr
                      ? "bg-[#E88DA0]/10 text-[#E88DA0] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="w-full pt-8 pb-4 relative overflow-x-auto">
        <div className="min-w-[760px] h-96 relative">
          {/* Horizontal Gridlines & Y-Axis Labels */}
          {yAxisTicks.map((tick) => {
            const topPercent = ((maxY - tick) / maxY) * 85
            return (
              <div
                key={tick}
                className="absolute left-0 right-0 flex items-center gap-2 pointer-events-none"
                style={{ top: `${topPercent}%` }}
              >
                <span className="w-12 text-right text-slate-400 text-xs font-normal">
                  ${tick.toLocaleString()}
                </span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>
            )
          })}

          {/* Bars & X-Axis Columns */}
          <div className="absolute inset-0 pl-16 pr-4 flex items-end justify-between">
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
                      style={{ height: `${Math.max(genHeightPercent, 1.5)}%` }}
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
                            Generation: ${item.generation.toLocaleString()}
                          </div>
                        )}
                    </div>

                    {/* Printing Bar (Lavender/Purple) */}
                    <div
                      className="w-5 sm:w-6 lg:w-7 bg-[#B794F6] hover:bg-[#A374F5] rounded-t-xs transition-all duration-300 relative cursor-pointer"
                      style={{ height: `${Math.max(printHeightPercent, 1.5)}%` }}
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
                            Printing: ${item.printing.toLocaleString()}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* X-Axis Month Label */}
                  <span className="text-zinc-600 text-xs sm:text-sm font-normal select-none">
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
              <span className="text-xs font-semibold text-slate-400">Loading chart data...</span>
            </div>
          )}
        </div>
      </div>

      {/* Legend Container */}
      <div className="self-stretch pt-4 flex justify-center items-center gap-8 border-t border-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-[#E88DA0] rounded-sm" />
          <span className="text-gray-900 text-sm sm:text-base font-semibold">
            Generation Revenue
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-[#B794F6] rounded-sm" />
          <span className="text-gray-900 text-sm sm:text-base font-semibold">
            Printing Revenue
          </span>
        </div>
      </div>
    </div>
  )
}

export default RevenueChart
