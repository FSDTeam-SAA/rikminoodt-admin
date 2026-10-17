"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronDown,
  Printer,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  CheckCircle2,
  Clock,
  Truck,
  Download,
} from "lucide-react"
import { useOrder } from "../hooks"
import { OrderItem } from "../types"
import { findOrderById } from "../api"
import { toast } from "sonner"

interface OrderDetailsViewProps {
  orderId?: string
}

export function OrderDetailsView({ orderId = "ORD-258" }: OrderDetailsViewProps) {
  const { data: order } = useOrder(orderId)

  const fallbackOrder = React.useMemo(() => findOrderById(orderId), [orderId])
  const activeOrder: OrderItem = order || fallbackOrder

  const [currentStatus, setCurrentStatus] = React.useState<OrderItem["status"]>(
    activeOrder.status
  )

  React.useEffect(() => {
    if (activeOrder.status) {
      setCurrentStatus(activeOrder.status)
    }
  }, [activeOrder.status])

  const handleUpdateStatus = () => {
    const nextStatusMap: Record<OrderItem["status"], OrderItem["status"]> = {
      Pending: "Printing",
      Printing: "Shipped",
      Shipped: "Delivered",
      Delivered: "Pending",
    }
    const next = nextStatusMap[currentStatus] || "Delivered"
    setCurrentStatus(next)
    toast.success("Order status updated", {
      description: `Order ${activeOrder.id} status changed to ${next}.`,
    })
  }

  const handleDownloadInvoice = () => {
    toast.info("Invoice Generated", {
      description: `Invoice for ${activeOrder.id} (${activeOrder.amount}) downloaded.`,
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
    }
  }

  const timelineSteps = [
    { title: "Order Placed", date: activeOrder.orderDate, done: true, icon: CheckCircle2 },
    {
      title: "Printing Started",
      date: activeOrder.orderDate,
      done: currentStatus === "Printing" || currentStatus === "Shipped" || currentStatus === "Delivered",
      icon: Printer,
    },
    {
      title: "Shipped",
      date: "9/01/2027",
      done: currentStatus === "Shipped" || currentStatus === "Delivered",
      icon: Truck,
    },
    {
      title: "Delivered",
      date: "9/04/2027",
      done: currentStatus === "Delivered",
      icon: Package,
    },
  ]

  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Title & Subtitle + Back Navigation */}
      <div className="flex flex-col justify-start items-start gap-1">
        <Link
          href="/orders-management"
          className="flex items-center gap-1.5 text-xs text-[#E88DA0] hover:text-[#DE778C] font-semibold mb-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Orders Management</span>
        </Link>
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
              Order Details
            </h1>
            <p className="text-slate-400 text-base font-medium">
              Comprehensive information about Order #{activeOrder.id}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadInvoice}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-gray-700 text-sm font-semibold rounded-lg flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download Invoice</span>
            </button>
            <button
              onClick={handleUpdateStatus}
              className="px-4 py-2 bg-[#E88DA0] hover:bg-[#DE778C] text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <span>Update Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Order Info */}
        <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
              Order Overview
            </div>
            {getStatusBadge(currentStatus)}
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-gray-900 text-2xl font-bold">{activeOrder.id}</div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Placed on {activeOrder.orderDate}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>{activeOrder.paymentMethod || "Credit Card (Visa ending 4242)"}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-400 text-sm">Total Paid</span>
            <span className="text-gray-900 text-xl font-bold text-[#E88DA0]">
              {activeOrder.amount}
            </span>
          </div>
        </div>

        {/* Card 2: Customer Details */}
        <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col justify-between gap-4">
          <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Customer Information
          </div>

          <div className="flex items-center gap-3">
            <img
              src={activeOrder.customerAvatar}
              alt={activeOrder.customerName}
              className="w-12 h-12 rounded-full object-cover border border-slate-100 shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 text-lg font-semibold">
                {activeOrder.customerName}
              </span>
              <span className="text-slate-500 text-sm">{activeOrder.email}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-slate-600 text-sm">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {activeOrder.shippingAddress?.street},{" "}
              {activeOrder.shippingAddress?.city},{" "}
              {activeOrder.shippingAddress?.state} {activeOrder.shippingAddress?.zip},{" "}
              {activeOrder.shippingAddress?.country}
            </span>
          </div>
        </div>

        {/* Card 3: Print Production Details */}
        <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col justify-between gap-4">
          <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Print Production
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-16 rounded-sm bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
              <img
                src={activeOrder.bookCover || "/books/ben.jpg"}
                alt={activeOrder.bookTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-base font-semibold line-clamp-1">
                {activeOrder.bookTitle}
              </span>
              <span className="text-slate-500 text-sm">
                Quantity:{" "}
                <strong className="text-gray-900 font-semibold">
                  {activeOrder.booksPrinted}
                </strong>
              </span>
              <span className="text-slate-500 text-xs">
                Hardcover • Premium Glossy 150gsm
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-400">Estimated Delivery:</span>
            <span className="text-gray-800 font-semibold">3-5 Business Days</span>
          </div>
        </div>
      </div>

      {/* Order Progress Tracker */}
      <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-stone-900 text-xl font-bold">Order Tracking</h2>
          <p className="text-slate-400 text-sm">
            Live delivery and printing workflow status
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border flex flex-col items-center text-center gap-2 transition-all ${
                  step.done
                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-800"
                    : "bg-slate-50/60 border-slate-200/60 text-slate-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.done
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-base font-semibold">{step.title}</div>
                <div className="text-xs text-slate-500">{step.date}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Order Items Table & Invoice Breakdown */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-stone-900 text-xl font-bold">Invoice Breakdown</h2>
          <span className="text-sm text-slate-400">Currency: USD ($)</span>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-base py-2 border-b border-slate-100">
            <span className="text-gray-700 font-medium">
              {activeOrder.bookTitle} ({activeOrder.booksPrinted})
            </span>
            <span className="text-gray-900 font-semibold">{activeOrder.amount}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 py-1">
            <span>Printing & Binding Cost</span>
            <span>Included</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 py-1">
            <span>Standard Tracked Shipping</span>
            <span>$0.00 (Free)</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 py-1">
            <span>Sales Tax (0%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-3 border-t border-slate-200">
            <span>Total Paid</span>
            <span className="text-[#E88DA0]">{activeOrder.amount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsView
