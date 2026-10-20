export type OrderStatus = "All" | "Delivered" | "Shipped" | "Printing" | "Pending"

export interface OrderBookPage {
  pageNumber: number
  text: string
  imageUrl: string
}

export interface OrderItem {
  id: string
  _id?: string
  customerName: string
  customerAvatar: string
  email: string
  memberSince?: string
  bookId?: string
  bookTitle: string
  bookCover?: string
  bookPages?: OrderBookPage[]
  booksPrinted: string
  amount: string
  status: "Delivered" | "Pending" | "Shipped" | "Printing"
  rawStatus?: string
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
  pricePerCopy?: number
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
