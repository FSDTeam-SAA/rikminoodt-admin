"use client"

import * as React from "react"
import { BookOpen, Printer, ChevronDown, ArrowLeft } from "lucide-react"
import { useUser } from "../hooks"
import { UserItem } from "../types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface UserDetailsViewProps {
  userId?: string
  onBack?: () => void
}

export function UserDetailsView({ userId = "usr-1", onBack }: UserDetailsViewProps) {
  const router = useRouter()
  const { data: user, isLoading } = useUser(userId)

  const activeUser: UserItem = user || {
    id: "usr-1",
    name: "Akah Larry",
    email: "Secretary@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    registrationDate: "8/25/2027",
    booksGenerated: 50,
    booksPrinted: 10,
    status: "Active",
    memberSince: "9/16/2026",
  }

  // 16 books split into 2 rows of 8 as in screenshot
  const booksRow1 = (activeUser.generatedBooks || []).slice(0, 8)
  const booksRow2 = (activeUser.generatedBooks || []).slice(8, 16)

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

  const toggleStatus = () => {
    toast.success("User status updated", {
      description: `${activeUser.name} status is now Active.`,
    })
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
              className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg flex items-center gap-1 text-emerald-500 text-sm font-normal transition-colors cursor-pointer border border-emerald-500/20"
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

        {/* Books Shelf Row 1 */}
        <div className="flex flex-col">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 px-1 items-end">
            {booksRow1.map((book, idx) => (
              <div
                key={`${book.id}-r1-${idx}`}
                className="flex flex-col items-center group cursor-pointer"
                title={book.title}
                onClick={() =>
                  toast.info(book.title, {
                    description: "Published Children's Storybook",
                  })
                }
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-[4px] shadow-sm group-hover:-translate-y-1.5 transition-transform duration-200 border border-slate-200/40"
                />
              </div>
            ))}
          </div>
          {/* Wooden Shelf Ledge 1 */}
          <div className="w-full h-2.5 rounded-[3px] bg-[#D99B69] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] border-t border-[#C08552] mt-0.5" />
        </div>

        {/* Books Shelf Row 2 */}
        <div className="flex flex-col mt-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 px-1 items-end">
            {booksRow2.map((book, idx) => (
              <div
                key={`${book.id}-r2-${idx}`}
                className="flex flex-col items-center group cursor-pointer"
                title={book.title}
                onClick={() =>
                  toast.info(book.title, {
                    description: "Published Children's Storybook",
                  })
                }
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-[4px] shadow-sm group-hover:-translate-y-1.5 transition-transform duration-200 border border-slate-200/40"
                />
              </div>
            ))}
          </div>
          {/* Wooden Shelf Ledge 2 */}
          <div className="w-full h-2.5 rounded-[3px] bg-[#D99B69] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] border-t border-[#C08552] mt-0.5" />
        </div>
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

        {/* Order History Table matching user snippet */}
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
            {orders.map((order, idx) => (
              <div
                key={`${order.id}-${idx}`}
                className="w-full px-4 py-3.5 hover:bg-slate-50/60 transition-colors grid grid-cols-12 items-center text-base"
              >
                <div className="col-span-2 text-center text-slate-900 font-normal">
                  {order.id}
                </div>
                <div className="col-span-3 text-center text-slate-900 font-normal">
                  {order.bookTitle}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsView
