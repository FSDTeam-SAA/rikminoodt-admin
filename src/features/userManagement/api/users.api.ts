import api from "@/lib/api"
import { UserItem, UsersFilter, UsersResponse } from "../types"

export const mockUsers: UserItem[] = [
  {
    id: "usr-1",
    name: "Akah Larry",
    email: "Secretary@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/25/2027",
    booksGenerated: 50,
    booksPrinted: 10,
  },
  {
    id: "usr-2",
    name: "Kevin Brown",
    email: "kevin.brown@hotmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    registrationDate: "2/2/2026",
    booksGenerated: 35,
    booksPrinted: 6,
  },
  {
    id: "usr-3",
    name: "Isaac Johnson",
    email: "isaac.j@icloud.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    registrationDate: "5/5/2023",
    booksGenerated: 55,
    booksPrinted: 11,
  },
  {
    id: "usr-4",
    name: "Lily Thompson",
    email: "lily.t@live.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/17/2025",
    booksGenerated: 50,
    booksPrinted: 14,
  },
  {
    id: "usr-5",
    name: "David Nwosu",
    email: "david.n@example.com",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    registrationDate: "6/1/2025",
    booksGenerated: 30,
    booksPrinted: 12,
  },
  {
    id: "usr-6",
    name: "Fiona Lin",
    email: "fiona.lin@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    registrationDate: "11/22/2028",
    booksGenerated: 60,
    booksPrinted: 15,
  },
  {
    id: "usr-7",
    name: "Akah Larry",
    email: "Secretary@gmail.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/25/2027",
    booksGenerated: 50,
    booksPrinted: 10,
  },
  {
    id: "usr-8",
    name: "Jasmine Wu",
    email: "jasmine.wu@gmail.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    registrationDate: "7/19/2028",
    booksGenerated: 40,
    booksPrinted: 9,
  },
  {
    id: "usr-9",
    name: "Bethany Choi",
    email: "BethanyC@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    registrationDate: "3/14/2026",
    booksGenerated: 45,
    booksPrinted: 8,
  },
  {
    id: "usr-10",
    name: "Hannah Patel",
    email: "hannah.patel@outlook.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    registrationDate: "9/12/2029",
    booksGenerated: 70,
    booksPrinted: 20,
  },
]

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

  async getUserById(id: string): Promise<UserItem | undefined> {
    try {
      const { data } = await api.get<UserItem>(`/users/${id}`)
      return data
    } catch {
      return mockUsers.find((u) => u.id === id)
    }
  },
}

export default usersApi
