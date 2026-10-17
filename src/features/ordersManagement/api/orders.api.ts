import api from "@/lib/api"
import { OrderItem, OrdersFilter, OrdersResponse, OrderMetrics } from "../types"

export const initialOrderMetrics: OrderMetrics = {
  totalOrders: "1,450",
  totalPendingOrders: "1,200",
  totalBooksDelivered: "1,200",
  printingRevenue: "$ 24,650",
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
  {
    id: "ORD-263",
    customerName: "Patel Aisha",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Mindfulness and...",
    bookCover: "/books/ben.jpg",
    booksPrinted: "25 Copy",
    amount: "$850.00",
    status: "Pending",
    orderDate: "8/28/2027",
    paymentMethod: "Credit Card (Mastercard 8812)",
    copies: 25,
    shippingAddress: {
      street: "450 Serenity Way",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
    },
  },
  {
    id: "ORD-264",
    customerName: "Chen Yi",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Exploring the Cos...",
    bookCover: "/books/mia.jpg",
    booksPrinted: "12 Copy",
    amount: "$400.00",
    status: "Delivered",
    orderDate: "8/29/2027",
    paymentMethod: "Credit Card (Visa 1099)",
    copies: 12,
    shippingAddress: {
      street: "101 Galaxy Boulevard",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
  },
  {
    id: "ORD-261",
    customerName: "Jones Sarah",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "The Art of Cooking",
    bookCover: "/books/noah.jpg",
    booksPrinted: "20 Copy",
    amount: "$1,200.00",
    status: "Delivered",
    orderDate: "8/30/2027",
    paymentMethod: "Stripe",
    copies: 20,
    shippingAddress: {
      street: "14 Culinary Ave",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "United States",
    },
  },
  {
    id: "ORD-266",
    customerName: "Nguyen Tuan",
    customerAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Travel Around the...",
    bookCover: "/books/ben.jpg",
    booksPrinted: "10 Copy",
    amount: "$500.00",
    status: "Pending",
    orderDate: "9/01/2027",
    paymentMethod: "Credit Card (Amex 3004)",
    copies: 10,
    shippingAddress: {
      street: "55 Voyager Drive",
      city: "Denver",
      state: "CO",
      zip: "80202",
      country: "United States",
    },
  },
  {
    id: "ORD-267",
    customerName: "David Miller",
    customerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    email: "david.m@live.com",
    bookTitle: "Secrets of the Deep",
    bookCover: "/books/mia.jpg",
    booksPrinted: "15 Copy",
    amount: "$780.00",
    status: "Shipped",
    orderDate: "9/02/2027",
    paymentMethod: "Credit Card (Visa 7721)",
    copies: 15,
    shippingAddress: {
      street: "220 Harbor View",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      country: "United States",
    },
  },
  {
    id: "ORD-268",
    customerName: "Emma Watson",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    email: "emma.w@live.com",
    bookTitle: "Magical Fairy Tales",
    bookCover: "/books/noah.jpg",
    booksPrinted: "8 Copy",
    amount: "$420.00",
    status: "Printing",
    orderDate: "9/03/2027",
    paymentMethod: "PayPal (emma.w@live.com)",
    copies: 8,
    shippingAddress: {
      street: "78 Enchanted Lane",
      city: "Boston",
      state: "MA",
      zip: "02108",
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

export const ordersApi = {
  async getOrders(filter?: OrdersFilter): Promise<OrdersResponse> {
    try {
      const { data } = await api.get<OrdersResponse>("/orders", { params: filter })
      return data
    } catch {
      let list = [...mockOrders]

      if (filter?.status && filter.status !== "All") {
        list = list.filter((o) => o.status.toLowerCase() === filter.status?.toLowerCase())
      }

      if (filter?.search) {
        const q = filter.search.toLowerCase()
        list = list.filter(
          (o) =>
            o.id.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q) ||
            o.email.toLowerCase().includes(q) ||
            o.bookTitle.toLowerCase().includes(q)
        )
      }

      return {
        orders: list,
        total: 120,
        page: filter?.page || 1,
        totalPages: 17,
        metrics: initialOrderMetrics,
      }
    }
  },

  async getOrderById(identifier: string): Promise<OrderItem> {
    try {
      const { data } = await api.get<OrderItem>(`/orders/${identifier}`)
      return data
    } catch {
      return findOrderById(identifier)
    }
  },

  async deleteOrder(id: string): Promise<boolean> {
    try {
      await api.delete(`/orders/${id}`)
      return true
    } catch {
      return true
    }
  },
}

export default ordersApi
