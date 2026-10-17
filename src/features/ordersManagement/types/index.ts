export type OrderStatus = "All" | "Delivered" | "Shipped" | "Printing" | "Pending"

export interface OrderItem {
  id: string
  customerName: string
  customerAvatar: string
  email: string
  bookTitle: string
  bookCover?: string
  booksPrinted: string
  amount: string
  status: "Delivered" | "Pending" | "Shipped" | "Printing"
  orderDate: string
  shippingAddress?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod?: string
  copies?: number
}

export interface OrderMetrics {
  totalOrders: string
  totalPendingOrders: string
  totalBooksDelivered: string
  printingRevenue: string
}

export interface OrdersFilter {
  search?: string
  status?: OrderStatus
  page?: number
  limit?: number
}

export interface OrdersResponse {
  orders: OrderItem[]
  total: number
  page: number
  totalPages: number
  metrics: OrderMetrics
}
