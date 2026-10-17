export interface GeneratedBook {
  id: string
  title: string
  cover: string
}

export interface UserOrder {
  id: string
  bookTitle: string
  orderDate: string
  amount: string
  copies: number
  status: "Delivered" | "Processing" | "Cancelled"
}

export interface UserItem {
  id: string
  name: string
  email: string
  avatar: string
  registrationDate: string
  booksGenerated: number
  booksPrinted: number
  status?: "Active" | "Inactive"
  memberSince?: string
  generatedBooks?: GeneratedBook[]
  orderHistory?: UserOrder[]
}

export interface UsersFilter {
  search?: string
  page?: number
  limit?: number
}

export interface UsersResponse {
  users: UserItem[]
  total: number
  page: number
  totalPages: number
}
