import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "../api"
import { OrdersFilter, OrderItem } from "../types"

export const ORDERS_QUERY_KEY = ["orders"]
export const ORDER_CARDS_QUERY_KEY = ["orders", "cards"]

export function useOrderCards() {
  return useQuery({
    queryKey: ORDER_CARDS_QUERY_KEY,
    queryFn: () => ordersApi.getOrderCards(),
    staleTime: 30 * 1000,
  })
}

export function useOrders(filter?: OrdersFilter) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, filter],
    queryFn: () => ordersApi.getOrders(filter),
    staleTime: 30 * 1000,
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
    staleTime: 30 * 1000,
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string
      status: OrderItem["status"]
    }) => ordersApi.updateOrderStatus(orderId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ORDER_CARDS_QUERY_KEY })
      queryClient.invalidateQueries({
        queryKey: [...ORDERS_QUERY_KEY, variables.orderId],
      })
    },
  })
}

export function useDeleteOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ordersApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ORDER_CARDS_QUERY_KEY })
    },
  })
}
