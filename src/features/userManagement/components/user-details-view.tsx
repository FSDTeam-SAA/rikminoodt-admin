"use client"

import * as React from "react"
import {
  BookOpen,
  Printer,
  ChevronDown,
  ArrowLeft,
  Download,
  Eye,
  Sparkles,
} from "lucide-react"
import { useUser } from "../hooks"
import { UserItem, GeneratedBook } from "../types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { findUserBySlugOrId, usersApi } from "../api"
import { BookReaderModal } from "./book-reader-modal"

interface UserDetailsViewProps {
  userId?: string
  onBack?: () => void
}

export function UserDetailsView({ userId = "usr-1", onBack }: UserDetailsViewProps) {
  const router = useRouter()
  const { data: user, isLoading } = useUser(userId)

  const fallbackUser = React.useMemo(() => findUserBySlugOrId(userId), [userId])
  const activeUser: UserItem = user || fallbackUser

  // Book Reader Modal State
  const [selectedBook, setSelectedBook] = React.useState<GeneratedBook | null>(null)
  const [isReaderOpen, setIsReaderOpen] = React.useState(false)

  const openBookReader = (book: GeneratedBook) => {
    setSelectedBook(book)
    setIsReaderOpen(true)
  }

  // 16 books split into 2 rows of 8 as in screenshot
  const allBooks = activeUser.generatedBooks || []
  const booksRow1 = allBooks.slice(0, 8)
  const booksRow2 = allBooks.slice(8, 16)

  const orders = activeUser.orderHistory || [
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

  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false)

  const toggleStatus = async () => {
    if (!activeUser?.id || isUpdatingStatus) return
    const newBackendStatus = activeUser.status === "Active" ? "SUSPENDED" : "ACTIVE"
    const newDisplayStatus = newBackendStatus === "ACTIVE" ? "Active" : "Inactive"

    try {
      setIsUpdatingStatus(true)
      await usersApi.updateUserStatus(activeUser.id, newBackendStatus)
      toast.success("User status updated", {
        description: `${activeUser.name} status is now ${newDisplayStatus}.`,
      })
      if (user) {
        user.status = newDisplayStatus
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update user status")
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Title & Subtitle + Back Navigation */}
      <div className="flex flex-col justify-start items-start gap-1">
        <button
          onClick={() => (onBack ? onBack() : router.push("/user-management"))}
          className="flex items-center gap-1.5 text-xs text-[#E88DA0] hover:text-[#DE778C] font-semibold mb-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to User Management</span>
        </button>
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          User Details
        </h1>
        <p className="text-slate-400 text-base font-medium">
          Comprehensive information about {activeUser.name}
        </p>
      </div>

      {/* Top 3 Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: User Profile Card */}
        <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              <img
                src={activeUser.avatar}
                alt={activeUser.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-100 shrink-0"
              />
              <div className="flex flex-col justify-start items-start gap-0.5">
                <span className="text-gray-900 text-2xl font-semibold">
                  {activeUser.name}
                </span>
                <span className="text-slate-500 text-sm font-normal">
                  {activeUser.email}
                </span>
              </div>
            </div>

            {/* Status Pill with Chevron */}
            <button
              onClick={toggleStatus}
              disabled={isUpdatingStatus}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer border ${
                activeUser.status === "Active"
                  ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border-emerald-500/20"
                  : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border-rose-500/20"
              }`}
            >
              <span>{activeUser.status || "Active"}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
            <span className="text-slate-500 text-base font-normal">
              Member Since:
            </span>
            <span className="text-slate-800 text-base font-semibold">
              {activeUser.memberSince || "9/16/2026"}
            </span>
          </div>
        </div>

        {/* Card 2: Total Books Generated */}
        <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col justify-start gap-3">
          <div className="text-slate-400 text-base font-semibold">
            Total Books Generated
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-200/50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="text-gray-900 text-2xl font-bold tracking-tight">
            {activeUser.booksGenerated}
          </div>
        </div>

        {/* Card 3: Total Print Orders */}
        <div className="bg-white rounded-lg p-5 border border-slate-100 shadow-xs flex flex-col justify-start gap-3">
          <div className="text-slate-400 text-base font-semibold">
            Total Print Orders
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-200/50 flex items-center justify-center">
              <Printer className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="text-gray-900 text-2xl font-bold tracking-tight">
            {activeUser.booksPrinted}
          </div>
        </div>
      </div>

      {/* Generated Books Section */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-stone-900 text-2xl font-semibold">
            Generated Books
          </h2>
          <p className="text-neutral-700 text-base font-normal">
            All books created by this user
          </p>
        </div>

        {allBooks.length === 0 ? (
          <div className="bg-white rounded-xl p-8 border border-slate-100 text-center text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-base font-medium">No books generated yet by this user</p>
          </div>
        ) : (
          <>
            {/* Books Shelf Row 1 */}
            <div className="flex flex-col">
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3.5 px-1 items-end">
                {booksRow1.map((book, idx) => (
                  <div
                    key={`${book.id}-r1-${idx}`}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => openBookReader(book)}
                    title={`Click to read & download: ${book.title}`}
                  >
                    <div className="relative w-full aspect-[2/3] max-h-44 rounded-[5px] overflow-hidden shadow-sm group-hover:shadow-lg group-hover:-translate-y-2 transition-all duration-200 border border-slate-200/60 bg-stone-100">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      {book.status && (
                        <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-600/90 text-white shadow-xs">
                          {book.status}
                        </span>
                      )}
                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-stone-900/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-2 text-white">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[11px] font-bold tracking-wide uppercase text-white drop-shadow-xs">
                          Read Book
                        </span>
                        <span className="text-[10px] text-amber-200 font-semibold flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Flip & Download
                        </span>
                      </div>
                    </div>
                    {/* Book Title */}
                    <div className="mt-1.5 w-full text-center px-1">
                      <p
                        className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#DE778C] transition-colors"
                        title={book.title}
                      >
                        {book.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {book.pages?.length || 6} pages
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Wooden Shelf Ledge 1 */}
              <div className="w-full h-3 rounded-[3px] bg-[#D99B69] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] border-t border-[#C08552] mt-1" />
            </div>

            {/* Books Shelf Row 2 (if more than 8 books) */}
            {booksRow2.length > 0 && (
              <div className="flex flex-col mt-4">
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3.5 px-1 items-end">
                  {booksRow2.map((book, idx) => (
                    <div
                      key={`${book.id}-r2-${idx}`}
                      className="flex flex-col items-center group cursor-pointer"
                      onClick={() => openBookReader(book)}
                      title={`Click to read & download: ${book.title}`}
                    >
                      <div className="relative w-full aspect-[2/3] max-h-44 rounded-[5px] overflow-hidden shadow-sm group-hover:shadow-lg group-hover:-translate-y-2 transition-all duration-200 border border-slate-200/60 bg-stone-100">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        {book.status && (
                          <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-600/90 text-white shadow-xs">
                            {book.status}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-stone-900/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-2 text-white">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[11px] font-bold tracking-wide uppercase text-white drop-shadow-xs">
                            Read Book
                          </span>
                          <span className="text-[10px] text-amber-200 font-semibold flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Flip & Download
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 w-full text-center px-1">
                        <p
                          className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#DE778C] transition-colors"
                          title={book.title}
                        >
                          {book.title}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {book.pages?.length || 6} pages
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Wooden Shelf Ledge 2 */}
                <div className="w-full h-3 rounded-[3px] bg-[#D99B69] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] border-t border-[#C08552] mt-1" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Order History Section */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-stone-900 text-2xl font-semibold">
            Order History
          </h2>
          <p className="text-neutral-700 text-base font-normal">
            All Order History for this individual user
          </p>
        </div>

        {/* Order History Table */}
        <div className="w-full bg-white rounded-lg border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] overflow-hidden">
          {/* Table Header */}
          <div className="w-full p-4 bg-white border-b border-[#E4EAF8] grid grid-cols-12 items-center text-stone-900 text-lg font-bold">
            <div className="col-span-2 text-center">Order ID</div>
            <div className="col-span-3 text-center">Book Title</div>
            <div className="col-span-2 text-center">Order Date</div>
            <div className="col-span-2 text-center">Amount</div>
            <div className="col-span-2 text-center">Books Copy</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100/70">
            {orders.map((order, idx) => {
              const matchedBook = allBooks.find(
                (b) =>
                  b.id === order.bookId ||
                  b.title.toLowerCase().trim() ===
                    order.bookTitle?.toLowerCase().trim()
              )

              return (
                <div
                  key={`${order.id}-${idx}`}
                  className="w-full px-4 py-3.5 hover:bg-slate-50/60 transition-colors grid grid-cols-12 items-center text-base"
                >
                  <div className="col-span-2 text-center text-slate-900 font-normal">
                    {order.id}
                  </div>
                  <div className="col-span-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (matchedBook) {
                          openBookReader(matchedBook)
                        } else {
                          openBookReader({
                            id: order.bookId || `book-${idx}`,
                            title: order.bookTitle,
                            cover: allBooks[0]?.cover || "",
                          })
                        }
                      }}
                      className="text-slate-900 hover:text-[#DE778C] font-medium transition-colors hover:underline cursor-pointer inline-flex items-center gap-1.5"
                      title="Click to read this book"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                      <span>{order.bookTitle}</span>
                    </button>
                  </div>
                  <div className="col-span-2 text-center text-slate-900 font-normal">
                    {order.orderDate}
                  </div>
                  <div className="col-span-2 text-center text-slate-900 font-normal">
                    {order.amount}
                  </div>
                  <div className="col-span-2 text-center text-slate-900 font-normal">
                    {order.copies}
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-sm font-normal border border-emerald-500/20">
                      {order.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Interactive Flipbook Reader Modal */}
      <BookReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        book={selectedBook}
        orders={orders}
      />
    </div>
  )
}

export default UserDetailsView
