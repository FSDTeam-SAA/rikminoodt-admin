"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronDown, Check, Save } from "lucide-react"
import { useOrder, useUpdateOrderStatus } from "../hooks"
import { OrderItem } from "../types"
import { findOrderById } from "../api"
import { toast } from "sonner"

interface OrderDetailsViewProps {
  orderId?: string
}

const statusOptions: Array<OrderItem["status"]> = [
  "Pending",
  "Printing",
  "Shipped",
  "Delivered",
]

export function OrderDetailsView({ orderId = "ORD-258" }: OrderDetailsViewProps) {
  const { data: order } = useOrder(orderId)

  const fallbackOrder = React.useMemo(() => findOrderById(orderId), [orderId])
  const activeOrder: OrderItem = order || fallbackOrder

  const [currentStatus, setCurrentStatus] = React.useState<OrderItem["status"]>(
    activeOrder.status || "Printing"
  )
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  React.useEffect(() => {
    if (activeOrder.status) {
      setCurrentStatus(activeOrder.status)
    }
  }, [activeOrder.status])

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const updateStatusMutation = useUpdateOrderStatus()

  const handleStatusSelect = (status: OrderItem["status"]) => {
    setCurrentStatus(status)
    setDropdownOpen(false)
  }

  const handleUpdateStatus = () => {
    updateStatusMutation.mutate(
      { orderId: activeOrder.id, status: currentStatus },
      {
        onSuccess: () => {
          toast.success("Order Status Updated", {
            description: `Order ${activeOrder.id} status is now ${currentStatus}.`,
          })
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to update order status on backend"
          )
        },
      }
    )
  }

  // 8 sample pages for Book Preview matching Figma snippet & screenshot
  const previewPages = Array(8).fill(activeOrder.bookCover || "/books/noah.jpg")

  // Tracking Order Progress configuration
  const steps = [
    { key: "Pending", label: "Payment pending", widthPercent: 0 },
    { key: "Printing", label: "Printing", widthPercent: 33 },
    { key: "Shipped", label: "Shipped", widthPercent: 66 },
    { key: "Delivered", label: "Delivered", widthPercent: 100 },
  ]

  const activeIndex = steps.findIndex((s) => s.key === currentStatus)
  const currentStepIndex = activeIndex >= 0 ? activeIndex : 1

  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Top Header: Back Arrow + Order Details */}
      <div className="flex items-center gap-1">
        <Link
          href="/orders-management"
          className="w-9 h-9 -ml-1 rounded-lg flex items-center justify-center text-gray-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Back to Orders Management"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </Link>
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          Order Details
        </h1>
      </div>

      {/* Customer Information Card */}
      <div className="w-full bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-2xs flex flex-col gap-4">
        <div className="text-stone-900 text-lg font-bold">
          Customer Information
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Avatar + Customer Name + Email */}
          <div className="flex items-center gap-4">
            <img
              src={activeOrder.customerAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={activeOrder.customerName}
              className="w-14 h-14 rounded-full object-cover border border-slate-100 shrink-0"
            />
            <div className="flex flex-col justify-start items-start gap-0.5">
              <span className="text-gray-900 text-2xl font-semibold">
                {activeOrder.customerName || "Akah Larry"}
              </span>
              <span className="text-slate-400 text-sm font-normal">
                {activeOrder.email || "Secretary@gmail.com"}
              </span>
            </div>
          </div>

          {/* Member Since info */}
          <div className="flex items-center gap-2 text-base">
            <span className="text-slate-400 font-normal">Member Since:</span>
            <span className="text-gray-900 font-semibold">9/16/2026</span>
          </div>
        </div>
      </div>

      {/* Tracking Order Container */}
      <div className="w-full bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-2xs flex flex-col gap-6">
        <div className="text-gray-900 text-xl font-semibold">
          Tracking Order
        </div>

        {/* Progress Timeline Tracker */}
        <div className="w-full flex flex-col gap-3 py-2 px-4 sm:px-8">
          {/* Tracker Nodes & Connecting Line */}
          <div className="relative w-full flex items-center justify-between">
            {/* Background Base Bar */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full z-0" />

            {/* Filled Progress Bar */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#A3E7C9] rounded-full z-0 transition-all duration-300"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            />

            {/* Step Nodes */}
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex
              const isCurrent = idx === currentStepIndex

              return (
                <div
                  key={step.key}
                  className="relative z-10 flex flex-col items-center"
                >
                  {isCurrent ? (
                    /* Active Glowing Blue Concentric Ring from Figma */
                    <div className="w-7 h-7 p-1 bg-blue-400/20 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 p-1 bg-blue-400 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-[#38BDF8] rounded-full" />
                      </div>
                    </div>
                  ) : isPast ? (
                    /* Completed Step */
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xs">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  ) : (
                    /* Inactive Step */
                    <div className="w-5 h-5 bg-neutral-300 rounded-full" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Step Labels below */}
          <div className="w-full flex items-center justify-between text-xs pt-1">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex
              return (
                <div
                  key={`label-${step.key}`}
                  className={`text-center font-normal transition-colors ${
                    isCurrent
                      ? "text-blue-500 font-semibold"
                      : "text-slate-400"
                  }`}
                  style={{ width: "90px" }}
                >
                  {step.label}
                </div>
              )
            })}
          </div>
        </div>

        {/* Inner Panel: Book Display + Order Details */}
        <div className="w-full p-4 sm:p-6 bg-neutral-50 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-neutral-100">
          {/* Left Book Display on Wooden Shelf */}
          <div className="w-full lg:w-72 flex flex-col items-center justify-center shrink-0">
            <div className="relative flex items-center justify-center">
              {/* 3D Spine Gradient on left */}
              <div className="w-2.5 h-72 bg-gradient-to-l from-gray-200 to-stone-400 border border-slate-300/60 rounded-l-[2px] shadow-sm shrink-0" />
              {/* Book Cover Image */}
              <img
                src={activeOrder.bookCover || "/books/noah.jpg"}
                alt={activeOrder.bookTitle || "Noah and the Ocean Friends"}
                className="w-52 h-72 object-cover rounded-r-[3px] shadow-md border-y border-r border-slate-300/60"
              />
            </div>
            {/* Wooden Shelf Ledge matching snippet */}
            <div className="w-64 h-2.5 bg-[#D99B69] rounded-[3px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] border-t border-[#C08552] mt-0.5" />
          </div>

          {/* Right White Details Box */}
          <div className="w-full flex-1 px-6 py-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col gap-4">
            {/* Current Status selector & Update Status Button */}
            <div className="flex flex-col gap-2.5">
              <div className="text-stone-900 text-base font-semibold">
                Current Status
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Dropdown Container */}
                <div ref={dropdownRef} className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-full h-12 px-3.5 py-2 bg-white rounded-lg border border-orange-500/20 hover:border-orange-500/40 focus:border-[#E88DA0] flex items-center justify-between text-stone-900 text-base font-normal transition-colors cursor-pointer"
                  >
                    <span>{currentStatus}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-900 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu matching Figma screenshot */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full sm:w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-30 flex flex-col gap-1">
                      {statusOptions.map((option) => {
                        const isSelected = currentStatus === option
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleStatusSelect(option)}
                            className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors cursor-pointer font-medium ${
                              isSelected
                                ? "bg-[#E88DA0] text-white shadow-xs font-semibold"
                                : "text-gray-700 hover:bg-slate-50 hover:text-gray-900"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Update Status Button matching Figma snippet */}
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  className="h-12 px-5 bg-[#E88DA0] hover:bg-[#DE778C] text-white rounded-lg border-l-2 border-[#E88DA0] font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] shrink-0"
                >
                  <Save className="w-5 h-5 text-white" />
                  <span>Update Status</span>
                </button>
              </div>
            </div>

            {/* Order Details Key-Value Rows */}
            <div className="flex flex-col divide-y divide-stone-200/80 pt-1">
              {/* Order ID */}
              <div className="py-3 flex items-center justify-between text-base">
                <span className="text-stone-900 font-semibold">Order ID:</span>
                <span className="text-slate-600 font-normal">
                  {activeOrder.id || "R34F34A23"}
                </span>
              </div>

              {/* Order Date */}
              <div className="py-3 flex items-center justify-between text-base">
                <span className="text-stone-900 font-semibold">Order date:</span>
                <span className="text-slate-600 font-normal">
                  {activeOrder.orderDate || "3 Jan, 2026"}
                </span>
              </div>

              {/* Delivery Address */}
              <div className="py-3 flex items-start justify-between text-base gap-4">
                <span className="text-stone-900 font-semibold shrink-0">
                  Delivery address:
                </span>
                <span className="text-slate-600 font-normal text-right">
                  {activeOrder.shippingAddress
                    ? `${activeOrder.shippingAddress.street}, ${activeOrder.shippingAddress.city}, ${activeOrder.shippingAddress.state} ${activeOrder.shippingAddress.zip}, ${activeOrder.shippingAddress.country}`
                    : "123 Main Street Apartment 4B, New York, NY 10001, United States"}
                </span>
              </div>

              {/* Quantity */}
              <div className="py-3 flex items-center justify-between text-base">
                <span className="text-stone-900 font-semibold">Quantity:</span>
                <span className="text-slate-600 font-normal">
                  {activeOrder.copies || 2}
                </span>
              </div>

              {/* Total Amount */}
              <div className="py-3 flex items-center justify-between text-base">
                <span className="text-stone-900 font-semibold">Total amount:</span>
                <span className="text-stone-900 font-semibold text-lg">
                  {activeOrder.amount || "$45.56"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Preview Section matching Figma snippet and screenshot */}
      <div className="w-full p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col gap-4">
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="text-stone-900 text-lg font-bold">Book Preview</div>
          <div className="text-slate-400 text-sm font-normal">
            Sample pages from the book
          </div>
        </div>

        {/* 8 Book Preview Pages in a responsive row */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {previewPages.map((cover, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group cursor-pointer"
              title={`Page ${idx + 1}`}
              onClick={() =>
                toast.info(`Page ${idx + 1}`, {
                  description: "Viewing high-resolution sample page",
                })
              }
            >
              <img
                src={cover}
                alt={`Sample page ${idx + 1}`}
                className="w-full h-40 object-cover rounded-[3px] shadow-2xs border border-slate-200/70 group-hover:-translate-y-1.5 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsView
