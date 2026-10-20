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

export const TANVIR_USER_DATA: UserItem = {
  id: "6ad5e7118f731f02adeb6e6b",
  name: "Tanvir Ahmmed",
  email: "tanvir@gmail.com",
  avatar: DEFAULT_AVATAR,
  registrationDate: "10/19/2026",
  booksGenerated: 4,
  booksPrinted: 3,
  status: "Active",
  memberSince: "10/19/2026",
  generatedBooks: [
    {
      id: "6ad6f23bcf4d2d6b6a782f78",
      title: "Rishad's Mountain Adventure",
      ageCategory: "10+",
      theme: "ADVENTURE_AND_CAREERS",
      subject: "TRAVEL",
      illustrationStyle: "SOFT_ANIME",
      font: "ADVENTURE_BOOK",
      language: "English",
      creatorName: "Tanvir",
      foreword: "Went For A Mountain Traveling At Rishads Birthday For Refreshment And Camping and Hunting",
      titlePosition: "Middle",
      retryCount: 0,
      status: "COMPLETED",
      cover: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
      coverImageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
      createdAt: "2026-10-20T04:46:51.757Z",
      pages: [
        {
          pageNumber: 1,
          text: "Today is Rishad's birthday, and his friends Tanvir and Jishad have a special plan! They decide to celebrate by going on a mountain trip to relax and have fun together in nature.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471748/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-1-5f03d5cc04024a1c84720458897b7909.png",
        },
        {
          pageNumber: 2,
          text: "With backpacks full and spirits high, the three friends begin their adventure up the mountain path. The air is fresh, and every step brings new excitement!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471839/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-2-23e38333ada0456d8ecb2e8fc3040d7c.png",
        },
        {
          pageNumber: 3,
          text: "They set up camp under tall trees. Tanvir cooks a delicious meal with fresh ingredients, while Rishad shares thrilling hunting stories and Jishad talks about their next travel plans.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792471932/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-3-6961910320204b88b7f5430dcbe592b5.png",
        },
        {
          pageNumber: 4,
          text: "The next day, they explore the mountain's beautiful trails. Helping each other over rocks and roots, their friendship grows stronger with every step.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792472023/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-4-12b7314f7e3a40ab97d2f682ba8072d9.png",
        },
        {
          pageNumber: 5,
          text: "Evening falls and they gather around a glowing campfire. Sharing stories and laughter, they feel thankful for the day and the magic of true friendship.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792472114/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-5-f70b982c0d5545c7a8eb6a5d0dfbee54.png",
        },
        {
          pageNumber: 6,
          text: "Ready to go home, the friends pack up with happy hearts. They return feeling refreshed and grateful for their wonderful mountain adventure and lasting friendship.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792472295/books/6ad6f23bcf4d2d6b6a782f78/illustrations/page-6-354bff01c28f491584fe8389762d4060.png",
        },
      ],
    },
    {
      id: "6ad5f0958f731f02adeb72ab",
      title: "Lily's Big Birthday Adventure",
      ageCategory: "3-5",
      theme: "ADVENTURE_AND_CAREERS",
      subject: "AIRPLANE",
      illustrationStyle: "ANIMATION_3D",
      font: "STORYBOOK_CLASSIC",
      language: "English",
      creatorName: "Mum & Dad",
      foreword: "Birthday",
      titlePosition: "Middle",
      retryCount: 0,
      status: "COMPLETED",
      cover: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405946/books/6ad5f0958f731f02adeb72ab/illustrations/page-1-776bb0d29d614ff89dbd487c77e031e2.png",
      coverImageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405946/books/6ad5f0958f731f02adeb72ab/illustrations/page-1-776bb0d29d614ff89dbd487c77e031e2.png",
      createdAt: "2026-10-19T10:27:33.068Z",
      pages: [
        {
          pageNumber: 1,
          text: "Today is Lily's 4th birthday! She wakes up to colorful balloons and a yummy cake waiting just for her. What a special day to celebrate!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405946/books/6ad5f0958f731f02adeb72ab/illustrations/page-1-776bb0d29d614ff89dbd487c77e031e2.png",
        },
        {
          pageNumber: 2,
          text: 'Lily looks at the sky and makes a wish: "One day, I want to fly an airplane!" She draws pictures of planes soaring high and dreams about touching the clouds.',
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792406032/books/6ad5f0958f731f02adeb72ab/illustrations/page-2-00476de1b874458aad5ed7bd763233ca.png",
        },
        {
          pageNumber: 3,
          text: "Surprise! Lily's parents give her a shiny toy airplane. Her eyes sparkle with joy as she holds it tight. This gift is the start of a wonderful adventure!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792406116/books/6ad5f0958f731f02adeb72ab/illustrations/page-3-f6431ad09b33462fa19c72941f8c85d9.png",
        },
        {
          pageNumber: 4,
          text: "With her airplane in hand, Lily imagines flying high above the clouds. She pilots it around her room and backyard, pretending birds and soft breezes accompany her journey.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792406196/books/6ad5f0958f731f02adeb72ab/illustrations/page-4-8089101c1966407a8ad8716293b1f249.png",
        },
        {
          pageNumber: 5,
          text: "Suddenly, Lily sees a big balloon nearby. It looks a little scary at first, but she takes a deep breath and reaches out to touch it gently. She feels proud and brave!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792406283/books/6ad5f0958f731f02adeb72ab/illustrations/page-5-7775577d029048179faa6683dbc63e02.png",
        },
        {
          pageNumber: 6,
          text: "Feeling braver than ever, Lily flies her airplane outside. The fresh air surrounds her, and she laughs, excited by the wonderful adventure unfolding all around.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792406381/books/6ad5f0958f731f02adeb72ab/illustrations/page-6-47567eeffe9e43d298865669cd60375a.png",
        },
        {
          pageNumber: 7,
          text: "As the sun sets, Lily feels proud and happy. Today she learned that with courage, her dreams can take her anywhere she wants to go!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792406473/books/6ad5f0958f731f02adeb72ab/illustrations/page-7-1ff280d427b44ee69df42055e2a7c8f3.png",
        },
      ],
    },
    {
      id: "6ad5e9a38f731f02adeb6e85",
      title: "Lily's First Day at School",
      ageCategory: "3-5",
      theme: "ACTIVITIES",
      subject: "GOING_TO_SCHOOL",
      illustrationStyle: "WATER_COLOUR",
      font: "BUBBLY_TALES",
      language: "English",
      creatorName: "Mum & Dad",
      foreword: "First Day excitement",
      titlePosition: "Middle",
      retryCount: 1,
      status: "COMPLETED",
      cover: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405181/books/6ad5e9a38f731f02adeb6e85/illustrations/page-1-f2ea572fb6124dab8c4d9fcd0b78aa33.png",
      coverImageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405181/books/6ad5e9a38f731f02adeb6e65/illustrations/page-1-f2ea572fb6124dab8c4d9fcd0b78aa33.png",
      createdAt: "2026-10-19T09:57:55.223Z",
      pages: [
        {
          pageNumber: 1,
          text: "Today is a very special day! Lily wakes up early, her eyes sparkling with excitement. She packs her drawing book and her favorite snack — pizza-shaped sandwiches — into her bright backpack. She’s ready for her first day at school!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405181/books/6ad5e9a38f731f02adeb6e85/illustrations/page-1-f2ea572fb6124dab8c4d9fcd0b78aa33.png",
        },
        {
          pageNumber: 2,
          text: 'As Lily walks to school with her parents, her tummy feels a little fluttery. "I’m a bit nervous," she whispers. Her parents smile gently and say, "You are brave, Lily. We believe in you!" Their warm words make Lily’s heart feel a little lighter.',
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405372/books/6ad5e9a38f731f02adeb6e85/illustrations/page-2-30debd7ba80f4d579f7d769440ccaabe.png",
        },
        {
          pageNumber: 3,
          text: 'At school, Lily meets her friendly teacher who kneels down and says, "Welcome, Lily!" She sees other children smiling and waving. Lily is shy at first, but she gives a small smile back and feels that this place could be fun.',
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405463/books/6ad5e9a38f731f02adeb6e85/illustrations/page-3-fb57618cc57e4bc0aa5fd2eaf7ec2758.png",
        },
        {
          pageNumber: 4,
          text: "Now it’s time for drawing! Lily takes out her crayons and begins to create a colorful picture. Her new friends join in, and they share their drawings happily. With each stroke, Lily feels her courage growing stronger.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405553/books/6ad5e9a38f731f02adeb6e85/illustrations/page-4-20a60fbba59c4980b7217e9a8746e6c6.png",
        },
        {
          pageNumber: 5,
          text: "During playtime, Lily giggles and runs with her new friends. They play games and tell stories. Lily learns that making friends is fun and easier than she thought. She feels happy and included.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405651/books/6ad5e9a38f731f02adeb6e85/illustrations/page-5-efbc8f6b515b43ada4490f6d3421d44d.png",
        },
        {
          pageNumber: 6,
          text: 'As the day comes to an end, Lily smiles proudly. "I did it!" she thinks. She feels brave and excited to come back tomorrow to learn and play some more. School is a grand new adventure.',
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792405840/books/6ad5e9a38f731f02adeb6e85/illustrations/page-6-b0006b9c32b24821b8007508fddbd4af.png",
        },
      ],
    },
    {
      id: "6ad5e7138f731f02adeb6e6e",
      title: "TTTT the Brave Firefighter",
      ageCategory: "0-2",
      theme: "ADVENTURE_AND_CAREERS",
      subject: "FIREFIGHTER",
      illustrationStyle: "WATER_COLOUR",
      font: "STORYBOOK_CLASSIC",
      language: "English",
      creatorName: "Mum & Dad",
      foreword: "Dreaming big",
      titlePosition: "Middle",
      retryCount: 0,
      status: "COMPLETED",
      cover: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403350/books/6ad5e7138f731f02adeb6e6e/illustrations/page-1-f53a9ceec835477caaa484b1f4656183.png",
      coverImageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403350/books/6ad5e7138f731f02adeb6e6e/illustrations/page-1-f53a9ceec835477caaa484b1f4656183.png",
      createdAt: "2026-10-19T09:46:59.766Z",
      pages: [
        {
          pageNumber: 1,
          text: "TTTT is drawing colorful pictures at home. He dreams about being a firefighter, helping people just like in his drawings.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403350/books/6ad5e7138f731f02adeb6e6e/illustrations/page-1-f53a9ceec835477caaa484b1f4656183.png",
        },
        {
          pageNumber: 2,
          text: "TTTT visits the firefighter station. Friendly firefighters show him their big red truck and shiny tools. TTTT’s eyes shine with wonder!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403450/books/6ad5e7138f731f02adeb6e6e/illustrations/page-2-719cbdfdc1e34f53ad6711334ef861fa.png",
        },
        {
          pageNumber: 3,
          text: "TTTT learns that firefighters work closely as a team. They help and care for each other to keep everyone safe and sound.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403549/books/6ad5e7138f731f02adeb6e6e/illustrations/page-3-94ac24c6528c4f93a68b438d184e2dc6.png",
        },
        {
          pageNumber: 4,
          text: "TTTT imagines putting out a little fire with his new friends. Together, they laugh and help each other — just like a big, caring family.",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403653/books/6ad5e7138f731f02adeb6e6e/illustrations/page-4-462ac59fd04c4e9c9ea2919420a9ee69.png",
        },
        {
          pageNumber: 5,
          text: "TTTT feels happy and proud. He knows now that friendship means helping and caring — just like firefighters do every day!",
          imageUrl: "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792403847/books/6ad5e7138f731f02adeb6e6e/illustrations/page-5-3835c4094b434695b60908f955b99f72.png",
        },
      ],
    },
  ],
  orderHistory: [
    {
      id: "ORD-B257",
      bookId: "6ad6f23bcf4d2d6b6a782f78",
      bookTitle: "Rishad's Mountain Adventure",
      orderDate: "10/20/2026",
      amount: "$103.80",
      copies: 3,
      status: "Processing",
    },
    {
      id: "ORD-557E",
      bookId: "6ad6f23bcf4d2d6b6a782f78",
      bookTitle: "Rishad's Mountain Adventure",
      orderDate: "10/20/2026",
      amount: "$69.20",
      copies: 2,
      status: "Processing",
    },
    {
      id: "ORD-5517",
      bookId: "6ad6f23bcf4d2d6b6a782f78",
      bookTitle: "Rishad's Mountain Adventure",
      orderDate: "10/20/2026",
      amount: "$69.20",
      copies: 2,
      status: "Processing",
    },
  ],
}

export const mockUsers: any[] = [
  { id: "6ad5e7118f731f02adeb6e6b", name: "Tanvir Ahmmed" },
  { id: "usr-1", name: "Akah Larry" },
  { id: "usr-2", name: "Kevin Brown" },
]

export function findUserBySlugOrId(identifier: string): UserItem {
  const norm = (identifier || "").toLowerCase().trim()
  if (
    norm === "tanvir-ahmmed" ||
    norm === "tanvir" ||
    norm === "6ad5e7118f731f02adeb6e6b"
  ) {
    return TANVIR_USER_DATA
  }

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
          id: b._id || b.id,
          _id: b._id,
          title: b.title || (b.theme ? b.theme.replace(/_/g, " ") : "Custom Storybook"),
          cover:
            b.coverImageUrl ||
            b.pages?.[0]?.imageUrl ||
            "https://res.cloudinary.com/dwl2rfofz/image/upload/v1792299096/books/6ad44fc3b897710f4ee69fbf/illustrations/page-1-3c9ae49926a744178c5e1023b6c51949.png",
          coverImageUrl: b.coverImageUrl || b.pages?.[0]?.imageUrl,
          ageCategory: b.ageCategory,
          theme: b.theme,
          subject: b.subject,
          illustrationStyle: b.illustrationStyle,
          font: b.font,
          language: b.language,
          creatorName: b.creatorName,
          foreword: b.foreword,
          titlePosition: b.titlePosition,
          retryCount: b.retryCount,
          status: b.status,
          pdfUrl: b.pdfUrl,
          pages: (b.pages || []).map((p: any, idx: number) => ({
            pageNumber: p.pageNumber || idx + 1,
            text: p.text || "",
            imageUrl: p.imageUrl || p.illustrationUrl || "",
          })),
          createdAt: b.createdAt,
        })
      )

      const orderHistory: UserOrder[] = (payload.orderHistory || []).map(
        (o: any) => ({
          id: o._id ? `ORD-${o._id.toString().slice(-4).toUpperCase()}` : "ORD-0000",
          bookId: o.book?._id || (typeof o.book === "string" ? o.book : undefined),
          bookTitle: o.book?.theme ? o.book.theme.replace(/_/g, " ") : "Storybook Print",
          orderDate: o.createdAt
            ? new Date(o.createdAt).toLocaleDateString("en-US")
            : "N/A",
          amount: `$${Number(o.totalAmount || (o.quantity * o.pricePerCopy) || 0).toFixed(2)}`,
          copies: o.quantity || 1,
          status:
            o.status === "DELIVERED"
              ? "Delivered"
              : o.status === "PRINTING"
              ? "Processing"
              : "Processing",
          shippingAddress: o.shippingAddress,
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
