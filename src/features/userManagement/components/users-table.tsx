"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useUsers } from "../hooks"
import { UserItem } from "../types"
import { useDebounce } from "@/hooks/use-debounce"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { slugifyUsername } from "../api"
import Link from "next/link"

interface UsersTableProps {
  onSelectUser?: (userId: string) => void
}

export function UsersTable({ onSelectUser }: UsersTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)

  const debouncedSearch = useDebounce(searchTerm, 250)

  const { data, isLoading } = useUsers({
    search: debouncedSearch,
    page: currentPage,
  })

  const users = data?.users || []
  const totalResults = data?.total || 120

  const handleViewUser = (user: UserItem) => {
    toast.info(`Opening details for ${user.name}`)
    const userSlug = slugifyUsername(user.name)
    if (onSelectUser) {
      onSelectUser(userSlug)
    } else {
      router.push(`/user-management/${userSlug}`)
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full font-['Nunito_Sans']">
      {/* Search Bar matching user's exact specification */}
      <div className="w-full flex items-center justify-start">
        <div className="w-80 px-3.5 py-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-2.5 transition-all focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-slate-400 outline-none font-normal"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full bg-white rounded-lg border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] overflow-hidden">
        {/* Table Header */}
        <div className="w-full p-4 bg-white border-b border-[#E4EAF8] grid grid-cols-12 items-center text-stone-900 text-lg font-bold">
          <div className="col-span-3 text-left pl-2">User Name</div>
          <div className="col-span-3 text-center">Email Address</div>
          <div className="col-span-2 text-center">Registration Date</div>
          <div className="col-span-1 text-center">Books Generated</div>
          <div className="col-span-2 text-center">Books Printed</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-slate-100/70">
          {isLoading ? (
            <div className="py-16 flex items-center justify-center gap-2 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin text-[#E88DA0]" />
              <span>Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-base">
              No users found matching &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="w-full px-4 py-3.5 hover:bg-slate-50/60 transition-colors grid grid-cols-12 items-center text-base"
              >
                {/* User Name with Avatar */}
                <Link
                  href={`/user-management/${slugifyUsername(user.name)}`}
                  className="col-span-3 flex items-center gap-3 pl-2 group cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-100 group-hover:ring-2 group-hover:ring-[#E88DA0]/50 transition-all"
                  />
                  <span className="text-zinc-800 font-normal truncate group-hover:text-[#E88DA0] transition-colors">
                    {user.name}
                  </span>
                </Link>

                {/* Email Address */}
                <div className="col-span-3 text-center text-slate-900 font-normal truncate px-2">
                  {user.email}
                </div>

                {/* Registration Date */}
                <div className="col-span-2 text-center text-slate-900 font-normal">
                  {user.registrationDate}
                </div>

                {/* Books Generated */}
                <div className="col-span-1 text-center text-slate-900 font-normal">
                  {user.booksGenerated}
                </div>

                {/* Books Printed */}
                <div className="col-span-2 text-center text-slate-900 font-normal">
                  {user.booksPrinted}
                </div>

                {/* Action Icon */}
                <div className="col-span-1 flex justify-center items-center">
                  <Link
                    href={`/user-management/${slugifyUsername(user.name)}`}
                    className="w-6 h-6 bg-blue-400/10 hover:bg-blue-400/25 rounded-full flex items-center justify-center transition-all cursor-pointer group"
                    title={`View ${user.name}`}
                  >
                    {/* Concentric circles target action icon from Figma */}
                    <svg
                      className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="2.5"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Container matching Figma snippet */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-neutral-400 text-base font-normal">
          Showing 1 to {users.length} of {totalResults} results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-sm border border-neutral-300 hover:border-neutral-400 bg-white flex items-center justify-center text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page 1 (Active) */}
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 1
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            onClick={() => setCurrentPage(2)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 2
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            2
          </button>

          {/* Page 3 */}
          <button
            onClick={() => setCurrentPage(3)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 3
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            3
          </button>

          {/* Ellipsis */}
          <div className="w-10 h-10 rounded-sm border border-neutral-300 bg-white flex items-center justify-center text-neutral-400 select-none">
            ...
          </div>

          {/* Page 17 */}
          <button
            onClick={() => setCurrentPage(17)}
            className={`w-10 h-10 rounded-sm flex items-center justify-center text-base font-normal transition-colors cursor-pointer ${
              currentPage === 17
                ? "bg-[#E88DA0] text-white font-semibold shadow-2xs"
                : "border border-neutral-300 text-neutral-400 bg-white hover:border-neutral-400"
            }`}
          >
            17
          </button>

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(17, p + 1))}
            disabled={currentPage === 17}
            className="w-10 h-10 rounded-sm border border-neutral-300 hover:border-neutral-400 bg-white flex items-center justify-center text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersTable
