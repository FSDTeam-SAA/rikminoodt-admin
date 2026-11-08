"use client"

import * as React from "react"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { OrderItem } from "../types"
import { CustomerAvatar } from "@/components/shared/customer-avatar"

interface DeleteOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: OrderItem | null
  onConfirm: () => void
  isDeleting?: boolean
}

export function DeleteOrderModal({
  open,
  onOpenChange,
  order,
  onConfirm,
  isDeleting = false,
}: DeleteOrderModalProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-6 rounded-2xl bg-white border border-slate-100 shadow-2xl font-['Nunito_Sans']">
        <DialogHeader className="flex flex-col items-center text-center gap-3">
          {/* Circular Rose Badge with Trash Icon */}
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-xs">
            <Trash2 className="w-6 h-6 text-rose-500" />
          </div>

          <DialogTitle className="text-xl font-bold text-gray-900">
            Delete Order
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm font-normal max-w-[360px]">
            Are you sure you want to permanently remove this order? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Order Preview Card */}
        <div className="my-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Order ID</span>
            <span className="text-gray-900 font-bold">{order.id}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Customer</span>
            <div className="flex items-center gap-2 max-w-[220px]">
              <CustomerAvatar
                src={order.customerAvatar}
                name={order.customerName}
                size="sm"
              />
              <span className="text-gray-900 font-semibold truncate">
                {order.customerName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Book Title</span>
            <span className="text-slate-700 font-normal truncate max-w-[200px]">
              {order.bookTitle}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm pt-1 border-t border-slate-200/60">
            <span className="text-slate-500 font-medium">Total Amount</span>
            <span className="text-rose-600 font-bold">{order.amount}</span>
          </div>
        </div>

        {/* Warning Note */}
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-700">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>The customer will no longer see this order in printing queue.</span>
        </div>

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row gap-2.5 sm:justify-center border-t-0 bg-transparent p-0">
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-1/2 h-11 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="w-full sm:w-1/2 h-11 px-4 bg-[#F43F5E] hover:bg-[#E11D48] text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Yes, Delete</span>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteOrderModal

