"use client"

import * as React from "react"
import {
  X,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CornerDownRight,
  Send,
  Trash2,
  BookOpen,
} from "lucide-react"
import { ReviewItem } from "../types"
import { useUpdateReviewStatus, useReplyToReview, useDeleteReview } from "../hooks"
import { toast } from "sonner"

interface ReviewDetailsModalProps {
  review: ReviewItem | null
  isOpen: boolean
  onClose: () => void
}

export function ReviewDetailsModal({
  review,
  isOpen,
  onClose,
}: ReviewDetailsModalProps) {
  const [replyText, setReplyText] = React.useState(review?.adminReply || "")
  const [isReplying, setIsReplying] = React.useState(false)

  const updateStatusMutation = useUpdateReviewStatus()
  const replyMutation = useReplyToReview()
  const deleteMutation = useDeleteReview()

  if (!isOpen || !review) return null

  const handleStatusChange = (newStatus: "Published" | "Pending" | "Flagged") => {
    updateStatusMutation.mutate(
      { id: review.id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Review status changed to ${newStatus}`)
          review.status = newStatus
        },
      }
    )
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    replyMutation.mutate(
      { id: review.id, reply: replyText.trim() },
      {
        onSuccess: () => {
          toast.success("Reply posted successfully")
          review.adminReply = replyText.trim()
          review.repliedAt = new Date().toLocaleDateString("en-US")
          setIsReplying(false)
        },
      }
    )
  }

  const handleDelete = () => {
    toast.warning("Delete Review", {
      description: `Are you sure you want to permanently delete review ${review.id}?`,
      action: {
        label: "Confirm",
        onClick: () => {
          deleteMutation.mutate(review.id, {
            onSuccess: () => {
              toast.success("Review deleted successfully")
              onClose()
            },
          })
        },
      },
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-bold text-slate-700">
          {rating}.0
        </span>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-['Nunito_Sans'] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#E88DA0] uppercase tracking-wider px-2 py-0.5 bg-[#E88DA0]/10 rounded-md">
              {review.id}
            </span>
            <h2 className="text-lg font-bold text-gray-900">Review Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Reviewer & Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3.5">
              <img
                src={review.customerAvatar}
                alt={review.customerName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {review.customerName}
                  </h3>
                  {review.verifiedPurchase && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-normal">
                  {review.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1">
              {renderStars(review.rating)}
              <span className="text-xs text-slate-400">
                Submitted on {review.createdAt}
              </span>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 text-[#E88DA0]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium">Reviewed Book</p>
              <p className="text-sm font-bold text-gray-900 truncate">
                {review.bookTitle}
              </p>
            </div>
            {review.orderId && (
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Order: {review.orderId}
              </span>
            )}
          </div>

          {/* Review Body */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Customer Feedback
            </label>
            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 text-slate-800 text-sm sm:text-base leading-relaxed">
              &ldquo;{review.comment}&rdquo;
            </div>
          </div>

          {/* Status Controls */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Review Status
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleStatusChange("Published")}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  review.status === "Published"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Published
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("Pending")}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  review.status === "Pending"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <Clock className="w-4 h-4" />
                Pending
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("Flagged")}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  review.status === "Flagged"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Flagged
              </button>
            </div>
          </div>

          {/* Admin Reply Section */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CornerDownRight className="w-3.5 h-3.5" />
                Official Admin Response
              </label>
              {!isReplying && review.adminReply && (
                <button
                  type="button"
                  onClick={() => setIsReplying(true)}
                  className="text-xs font-semibold text-[#E88DA0] hover:underline cursor-pointer"
                >
                  Edit Reply
                </button>
              )}
            </div>

            {review.adminReply && !isReplying ? (
              <div className="p-3.5 bg-violet-50/50 rounded-xl border border-violet-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-900">
                    Rikminoodt Team
                  </span>
                  {review.repliedAt && (
                    <span className="text-[11px] text-slate-400">
                      Replied on {review.repliedAt}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700">{review.adminReply}</p>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-2">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an official response to this customer review..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E88DA0] focus:ring-2 focus:ring-[#E88DA0]/20 resize-none font-normal"
                />
                <div className="flex items-center justify-end gap-2">
                  {isReplying && (
                    <button
                      type="button"
                      onClick={() => setIsReplying(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!replyText.trim() || replyMutation.isPending}
                    className="px-4 py-1.5 bg-[#E88DA0] hover:bg-[#d87c90] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Reply</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 p-2 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete Review
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewDetailsModal
