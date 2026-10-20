export interface BookPage {
  pageNumber: number
  text: string
  imageUrl: string
}

export interface GeneratedBook {
  id: string
  _id?: string
  title: string
  cover: string
  coverImageUrl?: string
  ageCategory?: string
  theme?: string
  subject?: string
  illustrationStyle?: string
  font?: string
  language?: string
  creatorName?: string
  foreword?: string
  titlePosition?: string
  retryCount?: number
  status?: string
  pdfUrl?: string
  pages?: BookPage[]
  createdAt?: string
}

export interface UserOrder {
  id: string
  bookId?: string
  bookTitle: string
  orderDate: string
  amount: string
  copies: number
  status: "Delivered" | "Processing" | "Cancelled" | "Printing" | string
  shippingAddress?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
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
