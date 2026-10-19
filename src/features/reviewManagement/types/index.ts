export type ReviewStatus = "All" | "Published" | "Pending" | "Flagged"
export type RatingFilter = "All" | "5" | "4" | "3" | "2" | "1"

export interface ReviewItem {
  id: string
  customerName: string
  customerAvatar: string
  email: string
  bookTitle: string
  bookCover?: string
  rating: number // 1 to 5
  comment: string
  status: "Published" | "Pending" | "Flagged"
  createdAt: string
  orderId?: string
  photoUrl?: string
  adminReply?: string
  repliedAt?: string
  verifiedPurchase?: boolean
}

export interface ReviewMetrics {
  totalReviews: string
  averageRating: string
  positiveReviews: string
  pendingReviews: string
}

export interface ReviewsFilter {
  search?: string
  status?: ReviewStatus
  rating?: RatingFilter
  page?: number
  limit?: number
}

export interface ReviewsResponse {
  reviews: ReviewItem[]
  total: number
  page: number
  totalPages: number
  metrics: ReviewMetrics
}
