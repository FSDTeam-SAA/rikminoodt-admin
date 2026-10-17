export interface UserItem {
  id: string
  name: string
  email: string
  avatar: string
  registrationDate: string
  booksGenerated: number
  booksPrinted: number
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
