export type OrderStatus = "All" | "Delivered" | "Shipped" | "Printing" | "Pending"

export interface OrderBookPage {
  pageNumber: number
  text: string
  imageUrl: string
  kind?: string
  storyPageNumber?: number
  title?: string
}

export interface OrderItem {
  id: string
  _id?: string
  customerName: string
  name?: string
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
  createdAt?: string
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
  bookCreatorName?: string
  bookForeword?: string
  bookBackCoverText?: string
  bookFont?: string
  bookTitlePosition?: "Top" | "Middle" | "Bottom"
  bookLanguage?: string
  pdfUrl?: string
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
