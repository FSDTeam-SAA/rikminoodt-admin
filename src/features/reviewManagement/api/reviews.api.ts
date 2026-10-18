import api from "@/lib/api"
import {
  ReviewItem,
  ReviewsFilter,
  ReviewsResponse,
  ReviewMetrics,
} from "../types"

export const initialReviewMetrics: ReviewMetrics = {
  totalReviews: "2,840",
  averageRating: "4.8",
  positiveReviews: "94%",
  pendingReviews: "18",
}

export const mockReviews: ReviewItem[] = [
  {
    id: "REV-101",
    customerName: "Akah Larry",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "lily.t@live.com",
    bookTitle: "Ben’s Big Dream",
    bookCover: "/books/ben.jpg",
    rating: 5,
    comment:
      "The customized storybook for Ben turned out phenomenal! The illustration quality and colors on physical print exceeded our expectations. Our little boy was overjoyed seeing his own name in the story.",
    status: "Published",
    createdAt: "8/25/2026",
    orderId: "ORD-258",
    verifiedPurchase: true,
    adminReply: "Thank you so much for your kind words! We're thrilled that Ben loved his storybook.",
    repliedAt: "8/26/2026",
  },
  {
    id: "REV-102",
    customerName: "Wang Mei",
    customerAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    email: "wang.m@live.com",
    bookTitle: "Journey to the Unknown",
    bookCover: "/books/mia.jpg",
    rating: 4,
    comment:
      "Loved the storyline generation and the hardcover binding. Only took 1 star off because shipping to California took 2 days longer than estimated. Overall a wonderful keepsake.",
    status: "Published",
    createdAt: "8/27/2026",
    orderId: "ORD-259",
    verifiedPurchase: true,
  },
  {
    id: "REV-103",
    customerName: "Garcia Luis",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    email: "luis.g@yahoo.com",
    bookTitle: "Tech Innovations for Kids",
    bookCover: "/books/noah.jpg",
    rating: 5,
    comment:
      "Exceptional platform! It inspired my 7-year-old daughter to read every single night before bed. Highly recommend to parents seeking tailored educational stories.",
    status: "Published",
    createdAt: "8/29/2026",
    orderId: "ORD-262",
    verifiedPurchase: true,
  },
  {
    id: "REV-104",
    customerName: "Chloe Dupont",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    email: "chloe.d@outlook.com",
    bookTitle: "Mia & The Secret Forest",
    bookCover: "/books/mia.jpg",
    rating: 5,
    comment:
      "The illustrations are truly magical! Premium paper quality, gorgeous layout, and fast international delivery. Will definitely order again for Christmas.",
    status: "Pending",
    createdAt: "9/01/2026",
    orderId: "ORD-265",
    verifiedPurchase: true,
  },
  {
    id: "REV-105",
    customerName: "Marcus Sterling",
    customerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    email: "marcus.s@company.co",
    bookTitle: "Little Astronaut's Odyssey",
    bookCover: "/books/ben.jpg",
    rating: 2,
    comment:
      "One page had a slight ink smudge on the lower margin. Customer support quickly offered to reprint, but I had to wait another week.",
    status: "Flagged",
    createdAt: "9/02/2026",
    orderId: "ORD-268",
    verifiedPurchase: true,
  },
  {
    id: "REV-106",
    customerName: "Sophia Hernandez",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "sophia.h@live.com",
    bookTitle: "The Knight Who Loved Flowers",
    bookCover: "/books/noah.jpg",
    rating: 5,
    comment:
      "My nephew shed happy tears when he opened this on his birthday! Seeing himself as the main brave knight was priceless. Thank you Rikminoodt team!",
    status: "Published",
    createdAt: "9/04/2026",
    orderId: "ORD-271",
    verifiedPurchase: true,
  },
  {
    id: "REV-107",
    customerName: "David Kim",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    email: "david.k@gmail.com",
    bookTitle: "Underwater Kingdom Adventure",
    bookCover: "/books/mia.jpg",
    rating: 4,
    comment:
      "Very intuitive story customizer. The preview matched the printed copy accurately. 4 stars because I wish there were more color font choices.",
    status: "Published",
    createdAt: "9/06/2026",
    orderId: "ORD-274",
    verifiedPurchase: true,
  },
  {
    id: "REV-108",
    customerName: "Elena Rostova",
    customerAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    email: "elena.r@cloud.net",
    bookTitle: "The Dragon's Tea Party",
    bookCover: "/books/ben.jpg",
    rating: 5,
    comment:
      "Superb quality and delightful storyline! The binding feels solid and the glossy finish gives it a very high-end bookstore feel.",
    status: "Pending",
    createdAt: "9/08/2026",
    orderId: "ORD-277",
    verifiedPurchase: true,
  },
  {
    id: "REV-109",
    customerName: "Oliver Queen",
    customerAvatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    email: "oliver.q@domain.org",
    bookTitle: "Detective Max & The Stolen Cake",
    bookCover: "/books/noah.jpg",
    rating: 3,
    comment:
      "Story generator took a few attempts to get the right names, but final outcome was cute. Print quality is standard.",
    status: "Published",
    createdAt: "9/10/2026",
    orderId: "ORD-280",
    verifiedPurchase: false,
  },
  {
    id: "REV-110",
    customerName: "Fatima Al-Mansoor",
    customerAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    email: "fatima.m@live.com",
    bookTitle: "The Magic Flying Carpet",
    bookCover: "/books/mia.jpg",
    rating: 5,
    comment:
      "Unbelievable detail in the illustrations! We ordered 3 copies for cousins and all of them were enchanted. Outstanding service.",
    status: "Published",
    createdAt: "9/12/2026",
    orderId: "ORD-283",
    verifiedPurchase: true,
    adminReply: "Thank you Fatima! Delivering smiles across families is our greatest mission.",
    repliedAt: "9/13/2026",
  },
]

export const reviewsApi = {
  async getReviews(filter?: ReviewsFilter): Promise<ReviewsResponse> {
    try {
      const { data } = await api.get<ReviewsResponse>("/reviews", { params: filter })
      return data
    } catch {
      let list = [...mockReviews]

      if (filter?.status && filter.status !== "All") {
        list = list.filter((r) => r.status.toLowerCase() === filter.status?.toLowerCase())
      }

      if (filter?.rating && filter.rating !== "All") {
        const ratingNum = parseInt(filter.rating, 10)
        list = list.filter((r) => r.rating === ratingNum)
      }

      if (filter?.search) {
        const q = filter.search.toLowerCase()
        list = list.filter(
          (r) =>
            r.id.toLowerCase().includes(q) ||
            r.customerName.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.bookTitle.toLowerCase().includes(q) ||
            r.comment.toLowerCase().includes(q)
        )
      }

      return {
        reviews: list,
        total: 120,
        page: filter?.page || 1,
        totalPages: 12,
        metrics: initialReviewMetrics,
      }
    }
  },

  async updateReviewStatus(
    id: string,
    status: "Published" | "Pending" | "Flagged"
  ): Promise<boolean> {
    try {
      await api.patch(`/reviews/${id}/status`, { status })
      return true
    } catch {
      const item = mockReviews.find((r) => r.id === id)
      if (item) item.status = status
      return true
    }
  },

  async replyToReview(id: string, reply: string): Promise<boolean> {
    try {
      await api.post(`/reviews/${id}/reply`, { reply })
      return true
    } catch {
      const item = mockReviews.find((r) => r.id === id)
      if (item) {
        item.adminReply = reply
        item.repliedAt = new Date().toLocaleDateString("en-US")
      }
      return true
    }
  },

  async deleteReview(id: string): Promise<boolean> {
    try {
      await api.delete(`/reviews/${id}`)
      return true
    } catch {
      const index = mockReviews.findIndex((r) => r.id === id)
      if (index > -1) mockReviews.splice(index, 1)
      return true
    }
  },
}

export default reviewsApi
