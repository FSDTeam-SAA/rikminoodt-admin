import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "../api"
import { OrdersFilter } from "../types"

export const ORDERS_QUERY_KEY = ["orders"]

export function useOrders(filter?: OrdersFilter) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, filter],
    queryFn: () => ordersApi.getOrders(filter),
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  })
}

export function useDeleteOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ordersApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
    },
  })
}
