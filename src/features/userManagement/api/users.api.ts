import api from "@/lib/api"
import {
  UserItem,
  UsersFilter,
  UsersResponse,
  GeneratedBook,
  UserOrder,
} from "../types"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"

export function slugifyUsername(name: string): string {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const mockUsers: any[] = [
  { id: "usr-1", name: "Akah Larry" },
  { id: "usr-2", name: "Kevin Brown" },
]

export function findUserBySlugOrId(identifier: string): UserItem {
  return {
    id: identifier,
    name: "Customer User",
    email: "user@example.com",
    avatar: DEFAULT_AVATAR,
    registrationDate: "N/A",
    booksGenerated: 0,
    booksPrinted: 0,
    status: "Active",
    memberSince: "N/A",
    generatedBooks: [],
    orderHistory: [],
  }
}

export const usersApi = {
  /**
   * Fetch paginated users from backend
   * Calls /admin/users or /user/all-users as primary
   */
  async getUsers(filter?: UsersFilter): Promise<UsersResponse> {
    try {
      const page = filter?.page || 1
      const limit = filter?.limit || 9
      const search = filter?.search || ""

      // 1. Try GET /admin/users first
      let rawUsers: any[] = []
      let total = 0
      let totalPages = 1

      const adminRes = await api
        .get<any>("/admin/users", {
          params: { page, limit, search: search || undefined },
        })
        .catch(() => null)

      if (adminRes?.data?.data?.rows && Array.isArray(adminRes.data.data.rows)) {
        rawUsers = adminRes.data.data.rows
        total = adminRes.data.meta?.totalData ?? rawUsers.length
        totalPages = adminRes.data.meta?.totalPages ?? 1
      } else {
        // Fallback to /user/all-users which returns { data: { users, paginationInfo } }
        const allUsersRes = await api.get<any>("/user/all-users", {
          params: { page, limit, search: search || undefined },
        })

        const payload = allUsersRes.data?.data
        rawUsers = payload?.users || []
        total =
          allUsersRes.data?.meta?.total ??
          payload?.paginationInfo?.totalData ??
          rawUsers.length
        totalPages =
          allUsersRes.data?.meta?.totalPages ??
          payload?.paginationInfo?.totalPages ??
          1
      }

      const users: UserItem[] = rawUsers.map((u: any) => ({
        id: u._id || u.id,
        name: u.name || "Customer User",
        email: u.email,
        avatar: u.profileImage || DEFAULT_AVATAR,
        registrationDate: u.registrationDate
          ? new Date(u.registrationDate).toLocaleDateString("en-US")
          : u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US")
          : "N/A",
        booksGenerated: u.booksGenerated ?? 0,
        booksPrinted: u.booksPrinted ?? 0,
        status: (u.status || "ACTIVE").toUpperCase() === "ACTIVE" ? "Active" : "Inactive",
        memberSince: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US")
          : "N/A",
      }))

      return {
        users,
        total,
        page,
        totalPages: Math.max(totalPages, 1),
      }
    } catch (err) {
      console.error("Failed to fetch users from backend:", err)
      return {
        users: [],
        total: 0,
        page: 1,
        totalPages: 1,
      }
    }
  },

  /**
   * Fetch single user details including generated books and print orders
   * Endpoint: GET /admin/users/:id
   */
  async getUserById(identifier: string): Promise<UserItem | undefined> {
    try {
      // If identifier is not a 24-char ObjectId, first find the user by slug/name
      let targetId = identifier
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)

      if (!isObjectId) {
        const listRes = await usersApi.getUsers({ limit: 50 })
        const found = listRes.users.find(
          (u) =>
            u.id === identifier ||
            slugifyUsername(u.name) === identifier.toLowerCase()
        )
        if (found) {
          targetId = found.id
        }
      }

      const res = await api.get<any>(`/admin/users/${targetId}`)
      const payload = res.data?.data

      if (!payload?.user) {
        return undefined
      }

      const u = payload.user

      const generatedBooks: GeneratedBook[] = (payload.generatedBooks || []).map(
        (b: any) => ({
          id: b._id,
          title: b.theme ? b.theme.replace(/_/g, " ") : "Custom Storybook",
          cover:
            b.coverImageUrl ||
            "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792299096/books/6ad44fc3b897710f4ee69fbf/illustrations/page-1-3c9ae49926a744178c5e1023b6c51949.png",
        })
      )

      const orderHistory: UserOrder[] = (payload.orderHistory || []).map(
        (o: any) => ({
          id: o._id ? `ORD-${o._id.toString().slice(-4).toUpperCase()}` : "ORD-0000",
          bookTitle: o.book?.theme ? o.book.theme.replace(/_/g, " ") : "Storybook Print",
          orderDate: o.createdAt
            ? new Date(o.createdAt).toLocaleDateString("en-US")
            : "N/A",
          amount: `$${o.totalAmount || (o.quantity * o.pricePerCopy) || 0}`,
          copies: o.quantity || 1,
          status:
            o.status === "DELIVERED"
              ? "Delivered"
              : o.status === "PRINTING"
              ? "Processing"
              : "Processing",
        })
      )

      return {
        id: u._id,
        name: u.name || "Customer User",
        email: u.email,
        avatar: u.profileImage || DEFAULT_AVATAR,
        registrationDate: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US")
          : "N/A",
        booksGenerated: payload.totalBooksGenerated ?? generatedBooks.length,
        booksPrinted: payload.totalPrintOrders ?? orderHistory.length,
        status: (u.status || "ACTIVE").toUpperCase() === "ACTIVE" ? "Active" : "Inactive",
        memberSince: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US")
          : "N/A",
        generatedBooks,
        orderHistory,
      }
    } catch (err) {
      console.error(`Failed to fetch user ${identifier}:`, err)
      return undefined
    }
  },

  /**
   * Update user status (Active vs Suspended)
   * Endpoint: PATCH /admin/users/:id/status
   */
  async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "SUSPENDED"
  ): Promise<boolean> {
    try {
      await api.patch(`/admin/users/${userId}/status`, { status })
      return true
    } catch (err) {
      console.error("Failed to update user status:", err)
      throw err
    }
  },
}

export default usersApi
