"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react"
import { useOrders, useDeleteOrder } from "../hooks"
import { OrderItem, OrderStatus } from "../types"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "sonner"

const statusTabs: OrderStatus[] = [
  "All",
  "Delivered",
  "Shipped",
  "Printing",
  "Pending",
]

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<OrderStatus>("All")
  const [currentPage, setCurrentPage] = React.useState(1)

  const debouncedSearch = useDebounce(searchTerm, 250)

  const { data, isLoading } = useOrders({
    search: debouncedSearch,
    status: selectedStatus,
    page: currentPage,
  })

  const deleteOrderMutation = useDeleteOrder()

  const orders = data?.orders || []
  const totalResults = data?.total || 120

  const handleDelete = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    toast.warning("Delete Order", {
      description: `Are you sure you want to remove ${orderId}?`,
      action: {
        label: "Confirm",
        onClick: () => {
          deleteOrderMutation.mutate(orderId, {
            onSuccess: () => {
              toast.success(`Order ${orderId} removed successfully`)
            },
          })
        },
      },
    })
  }

  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-sm font-normal border border-emerald-500/20">
            Delivered
          </span>
        )
      case "Pending":
        return (
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-normal border border-amber-500/20">
            Pending
          </span>
        )
      case "Shipped":
        return (
          <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-sm font-normal border border-blue-500/20">
            Shipped
          </span>
        )
      case "Printing":
        return (
          <span className="px-2.5 py-1 bg-purple-500/10 text-purple-500 rounded-lg text-sm font-normal border border-purple-500/20">
            Printing
          </span>
        )
      default:
        return (
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-normal">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full font-['Nunito_Sans']">
      {/* Search Bar & Status Tabs Row */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full sm:w-80 px-3.5 py-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-2.5 transition-all focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-slate-400 outline-none font-normal"
          />
        </div>

        {/* Status Filter Tabs matching Figma snippet */}
        <div className="bg-white rounded-lg p-1 border border-slate-200/60 shadow-2xs flex items-center gap-1.5 overflow-x-auto">
          {statusTabs.map((tab) => {
            const isActive = selectedStatus === tab
            return (
              <button
                key={tab}
                onClick={() => {
                  setSelectedStatus(tab)
                  setCurrentPage(1)
                }}
                className={`px-3 py-1.5 rounded-lg text-base font-medium transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#E88DA0] text-white shadow-xs font-semibold"
                    : "text-neutral-500 hover:text-gray-900 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* Table Container matching Figma snippet and screenshot */}
      <div className="w-full bg-white rounded-lg border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] overflow-hidden">
        {/* Table Header */}
        <div className="w-full p-4 bg-white border-b border-[#E4EAF8] grid grid-cols-12 items-center text-stone-900 text-base lg:text-lg font-bold">
          <div className="col-span-1 text-left pl-2">Order Id</div>
          <div className="col-span-2 text-left pl-2">Customer Name</div>
          <div className="col-span-2 text-center">Email Address</div>
          <div className="col-span-2 text-center">Book Title</div>
          <div className="col-span-1 text-center">Books Printed</div>
          <div className="col-span-1 text-center">Amount</div>
          <div className="col-span-2 text-center">Order Status</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-slate-100/70">
          {isLoading ? (
            <div className="py-16 flex items-center justify-center gap-2 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin text-[#E88DA0]" />
              <span>Loading orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-base">
              No orders found matching &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            orders.map((order) => {
              const orderLink = `/orders-management/${order.id.toLowerCase()}`
              return (
                <div
                  key={order.id}
                  className="w-full px-4 py-3.5 hover:bg-slate-50/60 transition-colors grid grid-cols-12 items-center text-base"
                >
                  {/* Order Id */}
                  <div className="col-span-1 text-left pl-2">
                    <Link
                      href={orderLink}
                      className="text-slate-900 font-semibold hover:text-[#E88DA0] transition-colors"
                    >
                      {order.id}
                    </Link>
                  </div>

                  {/* Customer Name with Avatar */}
                  <Link
                    href={orderLink}
                    className="col-span-2 flex items-center gap-3 pl-2 group cursor-pointer"
                  >
                    <img
                      src={order.customerAvatar}
                      alt={order.customerName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-100 group-hover:ring-2 group-hover:ring-[#E88DA0]/50 transition-all"
                    />
                    <span className="text-zinc-800 font-normal truncate group-hover:text-[#E88DA0] transition-colors">
                      {order.customerName}
                    </span>
                  </Link>

                  {/* Email Address */}
                  <div className="col-span-2 text-center text-slate-900 font-normal truncate px-2">
                    {order.email}
                  </div>

                  {/* Book Title */}
                  <div className="col-span-2 text-center text-slate-900 font-normal truncate px-2">
                    {order.bookTitle}
                  </div>

                  {/* Books Printed */}
                  <div className="col-span-1 text-center text-slate-900 font-normal">
                    {order.booksPrinted}
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 text-center text-slate-900 font-normal">
                    {order.amount}
                  </div>

                  {/* Order Status */}
                  <div className="col-span-2 flex justify-center items-center">
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Action Icons */}
                  <div className="col-span-1 flex justify-center items-center gap-2">
                    {/* View / Eye Action Icon (blue) */}
                    <Link
                      href={orderLink}
                      className="w-6 h-6 bg-blue-400/10 hover:bg-blue-400/25 rounded-full flex items-center justify-center transition-all cursor-pointer group"
                      title={`View details of ${order.id}`}
                    >
                      {/* Concentric circles target action icon from Figma */}
                      <svg
                        className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="2.5"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>

                    {/* Delete / Trash Action Icon (red) */}
                    <button
                      onClick={(e) => handleDelete(order.id, e)}
                      className="w-6 h-6 bg-red-500/10 hover:bg-red-500/25 rounded-full flex items-center justify-center transition-all cursor-pointer group"
                      title={`Delete order ${order.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Pagination Container matching Figma snippet */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-neutral-400 text-base font-normal">
          Showing 1 to {orders.length} of {totalResults} results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-sm border border-neutral-300 hover:border-neutral-400 bg-white flex items-center justify-center text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page 1 (Active) */}
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 1
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            onClick={() => setCurrentPage(2)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 2
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            2
          </button>

          {/* Page 3 */}
          <button
            onClick={() => setCurrentPage(3)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 3
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            3
          </button>

          {/* Ellipsis */}
          <div className="w-10 h-10 rounded-sm border border-neutral-300 bg-white flex items-center justify-center text-neutral-400 select-none">
            ...
          </div>

          {/* Page 17 */}
          <button
            onClick={() => setCurrentPage(17)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 17
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            17
          </button>

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(17, p + 1))}
            disabled={currentPage === 17}
            className="w-10 h-10 rounded-sm border border-neutral-300 hover:border-neutral-400 bg-white flex items-center justify-center text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdersTable
