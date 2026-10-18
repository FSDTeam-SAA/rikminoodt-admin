import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { reviewsApi } from "../api"
import { ReviewsFilter } from "../types"

export const REVIEWS_QUERY_KEY = ["reviews"]

export function useReviews(filter?: ReviewsFilter) {
  return useQuery({
    queryKey: [...REVIEWS_QUERY_KEY, filter],
    queryFn: () => reviewsApi.getReviews(filter),
  })
}

export function useUpdateReviewStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: "Published" | "Pending" | "Flagged"
    }) => reviewsApi.updateReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY })
    },
  })
}

export function useReplyToReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reply }: { id: string; reply: string }) =>
      reviewsApi.replyToReview(id, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY })
    },
  })
}

export function useDeleteReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => reviewsApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY })
    },
  })
}
