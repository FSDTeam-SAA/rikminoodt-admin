"use client"

import * as React from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Star,
  Trash2,
  Filter,
} from "lucide-react"
import { useReviews, useDeleteReview } from "../hooks"
import { ReviewItem, ReviewStatus, RatingFilter } from "../types"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "sonner"
import { ReviewDetailsModal } from "./review-details-modal"

const statusTabs: ReviewStatus[] = ["All", "Published", "Pending", "Flagged"]
const ratingOptions: { label: string; value: RatingFilter }[] = [
  { label: "All Ratings", value: "All" },
  { label: "5 Stars", value: "5" },
  { label: "4 Stars", value: "4" },
  { label: "3 Stars", value: "3" },
  { label: "2 Stars", value: "2" },
  { label: "1 Star", value: "1" },
]

export function ReviewsTable() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<ReviewStatus>("All")
  const [selectedRating, setSelectedRating] = React.useState<RatingFilter>("All")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedReview, setSelectedReview] = React.useState<ReviewItem | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const debouncedSearch = useDebounce(searchTerm, 250)

  const { data, isLoading } = useReviews({
    search: debouncedSearch,
    status: selectedStatus,
    rating: selectedRating,
    page: currentPage,
  })

  const deleteReviewMutation = useDeleteReview()

  const reviews = data?.reviews || []
  const totalResults = data?.total || 120

  const handleOpenReview = (review: ReviewItem) => {
    setSelectedReview(review)
    setIsModalOpen(true)
  }

  const handleDelete = (reviewId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    toast.warning("Delete Review", {
      description: `Are you sure you want to delete ${reviewId}?`,
      action: {
        label: "Confirm",
        onClick: () => {
          deleteReviewMutation.mutate(reviewId, {
            onSuccess: () => {
              toast.success(`Review ${reviewId} removed successfully`)
            },
          })
        },
      },
    })
  }

  const getStatusBadge = (status: ReviewItem["status"]) => {
    switch (status) {
      case "Published":
        return (
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-sm font-semibold border border-emerald-500/20">
            Published
          </span>
        )
      case "Pending":
        return (
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 rounded-lg text-sm font-semibold border border-amber-500/20">
            Pending
          </span>
        )
      case "Flagged":
        return (
          <span className="px-2.5 py-1 bg-rose-500/10 text-rose-600 rounded-lg text-sm font-semibold border border-rose-500/20">
            Flagged
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center justify-center gap-1">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
        <span className="text-slate-800 font-bold text-sm">{rating}.0</span>
      </div>
    )
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
            placeholder="Search by customer, book, review..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-slate-400 outline-none font-normal"
          />
        </div>

        {/* Filters Group: Status Tabs + Rating Select */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating Filter Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value as RatingFilter)
                setCurrentPage(1)
              }}
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer"
            >
              {ratingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Tabs */}
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
      </div>

      {/* Table Container */}
      <div className="w-full bg-white rounded-lg border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] overflow-hidden">
        {/* Table Header */}
        <div className="w-full p-4 bg-white border-b border-[#E4EAF8] grid grid-cols-12 items-center text-stone-900 text-base lg:text-lg font-bold">
          <div className="col-span-2 text-left pl-2">Review ID & Date</div>
          <div className="col-span-3 text-left pl-2">Customer</div>
          <div className="col-span-2 text-left px-2">Book Title</div>
          <div className="col-span-1 text-center">Rating</div>
          <div className="col-span-2 text-left px-2">Feedback</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-slate-100/70">
          {isLoading ? (
            <div className="py-16 flex items-center justify-center gap-2 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin text-[#E88DA0]" />
              <span>Loading reviews...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-base">
              No reviews found matching &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                onClick={() => handleOpenReview(review)}
                className="w-full px-4 py-3.5 hover:bg-slate-50/70 transition-colors grid grid-cols-12 items-center text-base cursor-pointer"
              >
                {/* Review ID & Date */}
                <div className="col-span-2 text-left pl-2 flex flex-col justify-center">
                  <span className="text-slate-900 font-semibold hover:text-[#E88DA0] transition-colors">
                    {review.id}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {review.createdAt}
                  </span>
                </div>

                {/* Customer with Avatar */}
                <div className="col-span-3 flex items-center gap-3 pl-2 group">
                  <img
                    src={review.customerAvatar}
                    alt={review.customerName}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-100 group-hover:ring-2 group-hover:ring-[#E88DA0]/50 transition-all"
                  />
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-zinc-800 font-semibold truncate group-hover:text-[#E88DA0] transition-colors">
                      {review.customerName}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      {review.email}
                    </span>
                  </div>
                </div>

                {/* Book Title */}
                <div className="col-span-2 text-left px-2 text-slate-900 font-medium truncate">
                  {review.bookTitle}
                </div>

                {/* Rating */}
                <div className="col-span-1 text-center">
                  {renderStars(review.rating)}
                </div>

                {/* Review Comment Snippet */}
                <div className="col-span-2 text-left px-2 text-slate-600 text-sm truncate font-normal">
                  &ldquo;{review.comment}&rdquo;
                </div>

                {/* Status Badge */}
                <div className="col-span-1 flex justify-center items-center">
                  {getStatusBadge(review.status)}
                </div>

                {/* Action Icons */}
                <div
                  className="col-span-1 flex justify-center items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* View / Modal Button */}
                  <button
                    onClick={() => handleOpenReview(review)}
                    className="w-6 h-6 bg-blue-400/10 hover:bg-blue-400/25 rounded-full flex items-center justify-center transition-all cursor-pointer group"
                    title={`View review ${review.id}`}
                  >
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
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(review.id, e)}
                    className="w-6 h-6 bg-rose-400/10 hover:bg-rose-400/25 rounded-full flex items-center justify-center transition-all cursor-pointer group"
                    title={`Delete review ${review.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-neutral-400 text-base font-normal">
          Showing 1 to {reviews.length} of {totalResults} results
        </div>

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

          {/* Page 1 */}
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

          {/* Page 12 */}
          <button
            onClick={() => setCurrentPage(12)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 12
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            12
          </button>

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
            disabled={currentPage === 12}
            className="w-10 h-10 rounded-sm border border-neutral-300 hover:border-neutral-400 bg-white flex items-center justify-center text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Review Details Interactive Modal */}
      {selectedReview && (
        <ReviewDetailsModal
          key={selectedReview.id}
          review={selectedReview}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedReview(null)
          }}
        />
      )}
    </div>
  )
}

export default ReviewsTable
