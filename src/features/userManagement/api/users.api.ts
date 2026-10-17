import api from "@/lib/api"
import { UserItem, UsersFilter, UsersResponse, GeneratedBook, UserOrder } from "../types"

export const sampleBooks: GeneratedBook[] = [
  { id: "b-1", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-2", title: "Mia's Magic Garden", cover: "/books/mia.jpg" },
  { id: "b-3", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-4", title: "Ben's Big Dream", cover: "/books/ben.jpg" },
  { id: "b-5", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-6", title: "Ben's Big Dream", cover: "/books/ben.jpg" },
  { id: "b-7", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-8", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-9", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-10", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-11", title: "Ben's Big Dream", cover: "/books/ben.jpg" },
  { id: "b-12", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-13", title: "Ben's Big Dream", cover: "/books/ben.jpg" },
  { id: "b-14", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
  { id: "b-15", title: "Mia's Magic Garden", cover: "/books/mia.jpg" },
  { id: "b-16", title: "Noah and the Ocean Friends", cover: "/books/noah.jpg" },
]

export const sampleOrders: UserOrder[] = [
  {
    id: "ORD-1234",
    bookTitle: "Ben’s Big Dream",
    orderDate: "8/25/2027",
    amount: "$50.99",
    copies: 10,
    status: "Delivered",
  },
  {
    id: "ORD-1234",
    bookTitle: "Ben’s Big Dream",
    orderDate: "8/25/2027",
    amount: "$50.99",
    copies: 10,
    status: "Delivered",
  },
  {
    id: "ORD-1234",
    bookTitle: "Ben’s Big Dream",
    orderDate: "8/25/2027",
    amount: "$50.99",
    copies: 10,
    status: "Delivered",
  },
]

export const mockUsers: UserItem[] = [
  {
    id: "usr-1",
    name: "Akah Larry",
    email: "Secretary@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/25/2027",
    booksGenerated: 50,
    booksPrinted: 10,
    status: "Active",
    memberSince: "9/16/2026",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-2",
    name: "Kevin Brown",
    email: "kevin.brown@hotmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    registrationDate: "2/2/2026",
    booksGenerated: 35,
    booksPrinted: 6,
    status: "Active",
    memberSince: "1/12/2026",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-3",
    name: "Isaac Johnson",
    email: "isaac.j@icloud.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    registrationDate: "5/5/2023",
    booksGenerated: 55,
    booksPrinted: 11,
    status: "Active",
    memberSince: "3/10/2023",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-4",
    name: "Lily Thompson",
    email: "lily.t@live.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/17/2025",
    booksGenerated: 50,
    booksPrinted: 14,
    status: "Active",
    memberSince: "6/01/2025",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-5",
    name: "David Nwosu",
    email: "david.n@example.com",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    registrationDate: "6/1/2025",
    booksGenerated: 30,
    booksPrinted: 12,
    status: "Active",
    memberSince: "4/15/2025",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-6",
    name: "Fiona Lin",
    email: "fiona.lin@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    registrationDate: "11/22/2028",
    booksGenerated: 60,
    booksPrinted: 15,
    status: "Active",
    memberSince: "10/05/2028",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-7",
    name: "Akah Larry",
    email: "Secretary@gmail.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/25/2027",
    booksGenerated: 50,
    booksPrinted: 10,
    status: "Active",
    memberSince: "9/16/2026",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-8",
    name: "Jasmine Wu",
    email: "jasmine.wu@gmail.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    registrationDate: "7/19/2028",
    booksGenerated: 40,
    booksPrinted: 9,
    status: "Active",
    memberSince: "5/20/2028",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-9",
    name: "Bethany Choi",
    email: "BethanyC@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    registrationDate: "3/14/2026",
    booksGenerated: 45,
    booksPrinted: 8,
    status: "Active",
    memberSince: "1/18/2026",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
  {
    id: "usr-10",
    name: "Hannah Patel",
    email: "hannah.patel@outlook.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    registrationDate: "9/12/2029",
    booksGenerated: 70,
    booksPrinted: 20,
    status: "Active",
    memberSince: "7/08/2029",
    generatedBooks: sampleBooks,
    orderHistory: sampleOrders,
  },
]

export function slugifyUsername(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export function findUserBySlugOrId(identifier: string): UserItem {
  const decoded = decodeURIComponent(identifier).toLowerCase()
  const found = mockUsers.find((u) => {
    const slug = slugifyUsername(u.name)
    const normalizedName = u.name.toLowerCase()
    return (
      u.id.toLowerCase() === decoded ||
      slug === decoded ||
      normalizedName === decoded ||
      normalizedName.replace(/\s+/g, "-") === decoded
    )
  })
  return found || mockUsers[0]
}

export const usersApi = {
  async getUsers(filter?: UsersFilter): Promise<UsersResponse> {
    try {
      const { data } = await api.get<UsersResponse>("/users", { params: filter })
      return data
    } catch {
      let list = [...mockUsers]
      if (filter?.search) {
        const q = filter.search.toLowerCase()
        list = list.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        )
      }
      return {
        users: list,
        total: 120,
        page: filter?.page || 1,
        totalPages: 17,
      }
    }
  },

  async getUserById(identifier: string): Promise<UserItem | undefined> {
    try {
      const { data } = await api.get<UserItem>(`/users/${identifier}`)
      return data
    } catch {
      return findUserBySlugOrId(identifier)
    }
  },
}

export default usersApi
