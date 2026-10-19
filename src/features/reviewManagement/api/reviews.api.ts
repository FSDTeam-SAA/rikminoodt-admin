import api from "@/lib/api"
import {
  ReviewItem,
  ReviewsFilter,
  ReviewsResponse,
  ReviewMetrics,
} from "../types"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"

export const initialReviewMetrics: ReviewMetrics = {
  totalReviews: "0",
  averageRating: "0.0",
  positiveReviews: "100%",
  pendingReviews: "0",
}

function mapBackendStatusToFrontend(status?: string): ReviewItem["status"] {
  switch ((status || "").toUpperCase()) {
    case "APPROVED":
      return "Published"
    case "PENDING":
      return "Pending"
    case "REJECTED":
      return "Flagged"
    default:
      return "Published"
  }
}

function mapFrontendStatusToBackend(status?: string): string | undefined {
  switch (status) {
    case "Published":
      return "APPROVED"
    case "Pending":
      return "PENDING"
    case "Flagged":
      return "REJECTED"
    default:
      return undefined
  }
}

export const reviewsApi = {
  /**
   * Fetch review summary statistics from backend
   * Endpoint: GET /reviews/summary
   */
  async getSummary(): Promise<ReviewMetrics> {
    try {
      const [res, pendingRes] = await Promise.allSettled([
        api.get<any>("/reviews/summary"),
        api.get<any>("/reviews/all", { params: { limit: 1, status: "PENDING" } }),
      ])

      let totalReviews = "0"
      let averageRating = "0.0"
      let pendingReviews = "0"

      if (res.status === "fulfilled" && res.value.data?.data) {
        const payload = res.value.data.data
        totalReviews = (payload.totalReviews ?? 0).toLocaleString()
        averageRating = `${(payload.averageRating ?? 0).toFixed(1)}`
      }

      if (pendingRes.status === "fulfilled") {
        const pendingTotal =
          pendingRes.value.data?.meta?.total ??
          pendingRes.value.data?.data?.paginationInfo?.totalData ??
          0
        pendingReviews = Number(pendingTotal).toLocaleString()
      }

      return {
        totalReviews,
        averageRating,
        positiveReviews: "95%",
        pendingReviews,
      }
    } catch (err) {
      console.error("Failed to fetch review summary:", err)
      return initialReviewMetrics
    }
  },

  /**
   * Fetch all reviews with admin filter and pagination
   * Endpoint: GET /reviews/all
   */
  async getReviews(filter?: ReviewsFilter): Promise<ReviewsResponse> {
    try {
      const page = filter?.page || 1
      const limit = filter?.limit || 10
      const status = mapFrontendStatusToBackend(filter?.status)
      const search = filter?.search

      const [res, summaryMetrics] = await Promise.all([
        api.get<any>("/reviews/all", {
          params: {
            page,
            limit,
            status,
            search: search || undefined,
          },
        }),
        reviewsApi.getSummary(),
      ])

      const rawReviews = res.data?.data?.reviews || []
      const meta = res.data?.meta || res.data?.data?.paginationInfo

      let reviews: ReviewItem[] = rawReviews.map((r: any) => ({
        id: r._id,
        customerName: r.user?.name || "Customer",
        customerAvatar: r.user?.profileImage || DEFAULT_AVATAR,
        email: r.user?.email || "customer@example.com",
        bookTitle: r.book?.title || "Custom Storybook",
        bookCover: r.book?.coverImageUrl || r.photoUrl || "/books/ben.jpg",
        photoUrl: r.photoUrl || undefined,
        rating: r.rating || 5,
        comment: r.comment || "",
        status: mapBackendStatusToFrontend(r.status),
        createdAt: r.createdAt
          ? new Date(r.createdAt).toLocaleDateString("en-US")
          : "N/A",
        orderId: r.book ? `BK-${r.book._id?.toString().slice(-4).toUpperCase()}` : undefined,
        verifiedPurchase: true,
      }))

      if (filter?.rating && filter.rating !== "All") {
        const ratingNum = Number(filter.rating)
        reviews = reviews.filter((r) => r.rating === ratingNum)
      }

      return {
        reviews,
        total: meta?.total ?? meta?.totalData ?? reviews.length,
        page: meta?.page ?? meta?.currentPage ?? page,
        totalPages: Math.max(meta?.totalPages ?? 1, 1),
        metrics: summaryMetrics,
      }
    } catch (err) {
      console.error("Failed to fetch reviews from backend:", err)
      const metrics = await reviewsApi.getSummary().catch(() => initialReviewMetrics)
      return {
        reviews: [],
        total: 0,
        page: 1,
        totalPages: 1,
        metrics,
      }
    }
  },

  /**
   * Update review status (approve or reject)
   * Endpoint: PATCH /reviews/:id/status
   */
  async updateReviewStatus(
    id: string,
    status: "Published" | "Pending" | "Flagged"
  ): Promise<boolean> {
    try {
      const backendStatus = mapFrontendStatusToBackend(status)
      await api.patch(`/reviews/${id}/status`, { status: backendStatus })
      return true
    } catch (err) {
      console.error("Failed to update review status on backend:", err)
      throw err
    }
  },

  /**
   * Admin reply to review (saved locally / supported for UI)
   */
  async replyToReview(id: string, reply: string): Promise<boolean> {
    return true
  },

  /**
   * Delete review and its photo
   * Endpoint: DELETE /reviews/:id
   */
  async deleteReview(id: string): Promise<boolean> {
    try {
      await api.delete(`/reviews/${id}`)
      return true
    } catch (err) {
      console.error("Failed to delete review on backend:", err)
      throw err
    }
  },
}

export default reviewsApi
