import api from "@/lib/api"
import { OrderItem, OrdersFilter, OrdersResponse, OrderMetrics } from "../types"

export const initialOrderMetrics: OrderMetrics = {
  totalOrders: "0",
  totalPendingOrders: "0",
  totalBooksDelivered: "0",
  printingRevenue: "$ 0",
}

export const mockOrders: OrderItem[] = [
  {
    id: "ORD-258",
    customerName: "Akah Larry",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Ben’s Big Dream...",
    bookCover: "/books/ben.jpg",
    booksPrinted: "10 Copy",
    amount: "$655.00",
    status: "Delivered",
    orderDate: "8/25/2027",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    copies: 10,
    shippingAddress: {
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zip: "97477",
      country: "United States",
    },
  },
  {
    id: "ORD-259",
    customerName: "Wang Mei",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Journey to the Un...",
    bookCover: "/books/mia.jpg",
    booksPrinted: "5 Copy",
    amount: "$320.00",
    status: "Pending",
    orderDate: "8/26/2027",
    paymentMethod: "PayPal (wang.m@live.com)",
    copies: 5,
    shippingAddress: {
      street: "88 Market Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
  },
  {
    id: "ORD-262",
    customerName: "Garcia Luis",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Tech Innovations...",
    bookCover: "/books/noah.jpg",
    booksPrinted: "30 Copy",
    amount: "$1,500.00",
    status: "Delivered",
    orderDate: "8/27/2027",
    paymentMethod: "Apple Pay",
    copies: 30,
    shippingAddress: {
      street: "124 Conch Street",
      city: "Bikini Bottom",
      state: "HI",
      zip: "96815",
      country: "United States",
    },
  },
]

export function slugifyOrderId(id: string): string {
  return id.toLowerCase().trim()
}

export function findOrderById(identifier: string): OrderItem {
  const decoded = decodeURIComponent(identifier).toLowerCase()
  const found = mockOrders.find(
    (o) => o.id.toLowerCase() === decoded || slugifyOrderId(o.id) === decoded
  )
  return found || mockOrders[0]
}

function mapBackendStatusToFrontend(
  status?: string
): OrderItem["status"] {
  switch ((status || "").toUpperCase()) {
    case "PAYMENT_PENDING":
    case "PENDING":
      return "Pending"
    case "PRINTING":
      return "Printing"
    case "SHIPPED":
      return "Shipped"
    case "DELIVERED":
      return "Delivered"
    default:
      return "Pending"
  }
}

function mapFrontendStatusToBackend(status?: string): string | undefined {
  switch (status) {
    case "Pending":
      return "PAYMENT_PENDING"
    case "Printing":
      return "PRINTING"
    case "Shipped":
      return "SHIPPED"
    case "Delivered":
      return "DELIVERED"
    default:
      return undefined
  }
}

export const ordersApi = {
  /**
   * Fetch 4 order summary cards from backend
   * Endpoint: GET /admin/orders/cards
   */
  async getOrderCards(): Promise<OrderMetrics> {
    try {
      const res = await api.get<any>("/admin/orders/cards")
      const payload = res.data?.data
      if (payload) {
        return {
          totalOrders: (payload.totalOrder ?? 0).toLocaleString(),
          totalPendingOrders: (payload.totalPendingOrder ?? 0).toLocaleString(),
          totalBooksDelivered: (payload.totalBooksDelivered ?? 0).toLocaleString(),
          printingRevenue: `$ ${(payload.printingRevenue ?? 0).toLocaleString()}`,
        }
      }
      return initialOrderMetrics
    } catch (err) {
      console.error("Failed to fetch order cards from backend:", err)
      return initialOrderMetrics
    }
  },

  /**
   * Fetch paginated orders from backend
   * Endpoint: GET /admin/orders
   */
  async getOrders(filter?: OrdersFilter): Promise<OrdersResponse> {
    try {
      const page = filter?.page || 1
      const limit = filter?.limit || 9
      const status = mapFrontendStatusToBackend(filter?.status)
      const search = filter?.search

      const [ordersRes, metrics] = await Promise.all([
        api.get<any>("/admin/orders", {
          params: {
            page,
            limit,
            status,
            search: search || undefined,
          },
        }),
        ordersApi.getOrderCards(),
      ])

      const rawRows = ordersRes.data?.data?.rows || ordersRes.data?.rows || []
      const meta = ordersRes.data?.meta || ordersRes.data?.data?.meta

      if (rawRows.length > 0) {
        const orders: OrderItem[] = rawRows.map((o: any) => ({
          id: o._id ? `ORD-${o._id.toString().slice(-4).toUpperCase()}` : "ORD-000",
          customerName: o.user?.name || "Customer",
          customerAvatar:
            o.user?.profileImage ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          email: o.user?.email || "customer@example.com",
          bookTitle: o.book?.theme ? o.book.theme.replace(/_/g, " ") : "Custom Storybook",
          bookCover: o.book?.coverImageUrl || "/books/ben.jpg",
          booksPrinted: `${o.quantity || 1} Copy`,
          amount: `$${(o.totalAmount || (o.quantity * o.pricePerCopy) || 0).toFixed(2)}`,
          status: mapBackendStatusToFrontend(o.status),
          orderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-US") : "N/A",
          copies: o.quantity || 1,
          shippingAddress: {
            street: o.shippingAddress?.line1 || "742 Evergreen Terrace",
            city: o.shippingAddress?.city || "Springfield",
            state: o.shippingAddress?.state || "OR",
            zip: o.shippingAddress?.zip || "97477",
            country: o.shippingAddress?.country || "United States",
          },
        }))

        return {
          orders,
          total: meta?.totalData ?? orders.length,
          page: meta?.currentPage ?? page,
          totalPages: Math.max(meta?.totalPages ?? 1, 1),
          metrics,
        }
      }

      // If backend has 0 orders in database, return empty array with real cards metrics
      return {
        orders: [],
        total: 0,
        page,
        totalPages: 1,
        metrics,
      }
    } catch (err) {
      console.error("Failed to fetch orders from backend:", err)
      const metrics = await ordersApi.getOrderCards().catch(() => initialOrderMetrics)
      return {
        orders: [],
        total: 0,
        page: 1,
        totalPages: 1,
        metrics,
      }
    }
  },

  /**
   * Fetch single order detail
   * Endpoint: GET /admin/orders/:id
   */
  async getOrderById(identifier: string): Promise<OrderItem> {
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)
      if (isObjectId) {
        const res = await api.get<any>(`/admin/orders/${identifier}`)
        const o = res.data?.data
        if (o) {
          return {
            id: o._id ? `ORD-${o._id.toString().slice(-4).toUpperCase()}` : identifier,
            customerName: o.user?.name || "Customer",
            customerAvatar:
              o.user?.profileImage ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            email: o.user?.email || "customer@example.com",
            bookTitle: o.book?.theme ? o.book.theme.replace(/_/g, " ") : "Custom Storybook",
            bookCover: o.book?.coverImageUrl || "/books/ben.jpg",
            booksPrinted: `${o.quantity || 1} Copy`,
            amount: `$${(o.totalAmount || (o.quantity * o.pricePerCopy) || 0).toFixed(2)}`,
            status: mapBackendStatusToFrontend(o.status),
            orderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-US") : "N/A",
            paymentMethod: "Credit Card (Stripe)",
            copies: o.quantity || 1,
            shippingAddress: {
              street: o.shippingAddress?.line1 || "N/A",
              city: o.shippingAddress?.city || "N/A",
              state: o.shippingAddress?.state || "N/A",
              zip: o.shippingAddress?.zip || "N/A",
              country: o.shippingAddress?.country || "N/A",
            },
          }
        }
      }
      return findOrderById(identifier)
    } catch (err) {
      console.error(`Failed to fetch order ${identifier}:`, err)
      return findOrderById(identifier)
    }
  },

  /**
   * Update order tracking status
   * Endpoint: PATCH /admin/orders/:id/status
   */
  async updateOrderStatus(
    orderId: string,
    status: OrderItem["status"]
  ): Promise<boolean> {
    try {
      const backendStatus = mapFrontendStatusToBackend(status)
      if (backendStatus) {
        await api.patch(`/admin/orders/${orderId}/status`, {
          status: backendStatus,
        })
      }
      return true
    } catch (err) {
      console.error("Failed to update order status on backend:", err)
      throw err
    }
  },

  async deleteOrder(id: string): Promise<boolean> {
    try {
      await api.delete(`/admin/orders/${id}`)
      return true
    } catch {
      return true
    }
  },
}

export default ordersApi
