import api from "@/lib/api"
import { OrderItem, OrdersFilter, OrdersResponse, OrderMetrics } from "../types"

export const initialOrderMetrics: OrderMetrics = {
  totalOrders: "0",
  totalPendingOrders: "0",
  totalBooksDelivered: "0",
  printingRevenue: "$ 0",
}

export const TANVIR_ORDERS: OrderItem[] = [
  {
    id: "ORD-B257",
    _id: "6ad730133e9c3b785729b257",
    customerName: "Tanvir Ahmmed",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "tanvir@gmail.com",
    memberSince: "10/19/2026",
    bookId: "6ad6f23bcf4d2d6b6a782f78",
    bookTitle: "Rishad's Mountain Adventure",
    bookCover:
      "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
    bookPages: [
      {
        pageNumber: 1,
        text: "Today is Rishad's birthday, and his friends Tanvir and Jishad have a special plan! They decide to celebrate by going on a mountain trip to relax and have fun together in nature.",
        imageUrl:
          "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
      },
      {
        pageNumber: 2,
        text: "With backpacks full and spirits high, the three friends begin their adventure up the mountain path. The air is fresh, and every step brings new excitement!",
        imageUrl:
          "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471839/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-2-23e38333ada0456d8ecb2e8fc3040d7c.png",
      },
      {
        pageNumber: 3,
        text: "They set up camp under tall trees. Tanvir cooks a delicious meal with fresh ingredients, while Rishad shares thrilling hunting stories and Jishad talks about their next travel plans.",
        imageUrl:
          "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471932/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-3-6961910320204b88b7f5430dcbe592b5.png",
      },
      {
        pageNumber: 4,
        text: "The next day, they explore the mountain's beautiful trails. Helping each other over rocks and roots, their friendship grows stronger with every step.",
        imageUrl:
          "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792472023/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-4-12b7314f7e3a40ab97d2f682ba8072d9.png",
      },
      {
        pageNumber: 5,
        text: "Evening falls and they gather around a glowing campfire. Sharing stories and laughter, they feel thankful for the day and the magic of true friendship.",
        imageUrl:
          "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792472114/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-5-f70b982c0d5545c7a8eb6a5d0dfbee54.png",
      },
      {
        pageNumber: 6,
        text: "Ready to go home, the friends pack up with happy hearts. They return feeling refreshed and grateful for their wonderful mountain adventure and lasting friendship.",
        imageUrl:
          "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792472295/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-6-354bff01c28f491584fe8389762d4060.png",
      },
    ],
    booksPrinted: "3 Copy",
    amount: "$103.80",
    status: "Printing",
    rawStatus: "PRINTING",
    orderDate: "10/20/2026",
    paymentMethod: "Credit Card (Stripe)",
    copies: 3,
    pricePerCopy: 34.6,
    shippingAddress: {
      street: "sdfasfas, asdfasdfas",
      city: "asdfasf",
      state: "asdfasf",
      zip: "1235",
      country: "Netherlands",
    },
  },
  {
    id: "ORD-557E",
    _id: "6ad71110db2784a67c59557e",
    customerName: "Tanvir Ahmmed",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "tanvir@gmail.com",
    memberSince: "10/19/2026",
    bookId: "6ad6f23bcf4d2d6b6a782f78",
    bookTitle: "Rishad's Mountain Adventure",
    bookCover:
      "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
    booksPrinted: "2 Copy",
    amount: "$69.20",
    status: "Printing",
    rawStatus: "PRINTING",
    orderDate: "10/20/2026",
    paymentMethod: "Credit Card (Stripe)",
    copies: 2,
    pricePerCopy: 34.6,
    shippingAddress: {
      street: "In dolore in ea Nam, Aliquip rerum laboru",
      city: "Delectus rerum quia",
      state: "Voluptatem Dolore p",
      zip: "Rerum ullamco tempor",
      country: "Quis officia dolorem",
    },
  },
  {
    id: "ORD-5517",
    _id: "6ad70debdb2784a67c595517",
    customerName: "Tanvir Ahmmed",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "tanvir@gmail.com",
    memberSince: "10/19/2026",
    bookId: "6ad6f23bcf4d2d6b6a782f78",
    bookTitle: "Rishad's Mountain Adventure",
    bookCover:
      "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
    booksPrinted: "2 Copy",
    amount: "$69.20",
    status: "Printing",
    rawStatus: "PRINTING",
    orderDate: "10/20/2026",
    paymentMethod: "Credit Card (Stripe)",
    copies: 2,
    pricePerCopy: 34.6,
    shippingAddress: {
      street: "Quasi obcaecati nece, Rerum suscipit volup",
      city: "Libero rerum natus d",
      state: "North holand",
      zip: "1222",
      country: "Netherlands",
    },
  },
]

export const mockOrders: OrderItem[] = [...TANVIR_ORDERS]

export function slugifyOrderId(id: string): string {
  return id.toLowerCase().trim()
}

export function findOrderById(identifier: string): OrderItem {
  const decoded = decodeURIComponent(identifier).toLowerCase().trim()
  const cleanId = decoded.replace(/^ord-?/i, "")
  const found = mockOrders.find(
    (o) =>
      o.id.toLowerCase() === decoded ||
      slugifyOrderId(o.id) === decoded ||
      o.id.toLowerCase().endsWith(cleanId) ||
      o._id?.toLowerCase() === decoded ||
      o._id?.toLowerCase().endsWith(cleanId)
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
      let targetId = identifier
      const cleanSuffix = identifier.replace(/^ord-?/i, "").toLowerCase()
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)

      // 1. If identifier is a short code (e.g. "ord-b257"), resolve the 24-character ObjectId
      if (!isObjectId) {
        const localMatch = mockOrders.find(
          (o) =>
            o.id.toLowerCase() === identifier.toLowerCase() ||
            o.id.toLowerCase().endsWith(cleanSuffix) ||
            o._id?.toLowerCase().endsWith(cleanSuffix)
        )
        if (localMatch?._id) {
          targetId = localMatch._id
        } else {
          try {
            const listRes = await api.get<any>("/admin/orders", {
              params: { limit: 100 },
            })
            const rows = listRes.data?.data?.rows || listRes.data?.rows || []
            const found = rows.find(
              (r: any) =>
                r._id?.toString().toLowerCase().endsWith(cleanSuffix) ||
                r._id?.toString().toLowerCase() === identifier.toLowerCase()
            )
            if (found?._id) {
              targetId = found._id
            }
          } catch {
            // Ignore list query fallback
          }
        }
      }

      // 2. Real Backend Call: GET /admin/orders/:id
      const res = await api.get<any>(`/admin/orders/${targetId}`)
      const o = res.data?.data

      if (o) {
        const bookPages = (o.book?.pages || []).map((p: any, idx: number) => ({
          pageNumber: p.pageNumber || idx + 1,
          text: p.text || "",
          imageUrl: p.imageUrl || p.illustrationUrl || "",
        }))

        return {
          id: o._id ? `ORD-${o._id.toString().slice(-4).toUpperCase()}` : identifier,
          _id: o._id,
          customerName: o.user?.name || "Customer",
          customerAvatar:
            o.user?.profileImage ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          email: o.user?.email || "customer@example.com",
          memberSince: o.user?.createdAt
            ? new Date(o.user.createdAt).toLocaleDateString("en-US")
            : "N/A",
          bookId: o.book?._id,
          bookTitle:
            o.book?.title ||
            (o.book?.theme ? o.book.theme.replace(/_/g, " ") : "Custom Storybook"),
          bookCover:
            o.book?.coverImageUrl ||
            o.book?.pages?.[0]?.imageUrl ||
            "/books/ben.jpg",
          bookPages: bookPages.length > 0 ? bookPages : undefined,
          booksPrinted: `${o.quantity || 1} Copy`,
          amount: `$${Number(o.totalAmount || (o.quantity * o.pricePerCopy) || 0).toFixed(2)}`,
          status: mapBackendStatusToFrontend(o.status),
          rawStatus: o.status,
          orderDate: o.createdAt
            ? new Date(o.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          paymentMethod: o.stripeSessionId ? "Credit Card (Stripe)" : "Credit Card",
          copies: o.quantity || 1,
          pricePerCopy: o.pricePerCopy,
          shippingAddress: {
            street:
              [o.shippingAddress?.line1, o.shippingAddress?.line2]
                .filter(Boolean)
                .join(", ") || "N/A",
            city: o.shippingAddress?.city || "N/A",
            state: o.shippingAddress?.state || "N/A",
            zip: o.shippingAddress?.zip || "N/A",
            country: o.shippingAddress?.country || "N/A",
          },
        }
      }

      return findOrderById(identifier)
    } catch (err) {
      console.warn(`Backend order fetch for ${identifier} failed, falling back:`, err)
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
      let targetId = orderId
      const cleanSuffix = orderId.replace(/^ord-?/i, "").toLowerCase()
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(orderId)

      if (!isObjectId) {
        const localMatch = mockOrders.find(
          (o) =>
            o.id.toLowerCase() === orderId.toLowerCase() ||
            o.id.toLowerCase().endsWith(cleanSuffix) ||
            o._id?.toLowerCase().endsWith(cleanSuffix)
        )
        if (localMatch?._id) {
          targetId = localMatch._id
        }
      }

      const backendStatus = mapFrontendStatusToBackend(status)
      if (backendStatus) {
        await api.patch(`/admin/orders/${targetId}/status`, {
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
