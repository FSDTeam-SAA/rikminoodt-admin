"use client"

import * as React from "react"
import { UsersTable } from "./users-table"

export function UserManagementView() {
  return (
    <div className="flex flex-col gap-6 w-full font-['Nunito_Sans']">
      {/* Title & Subtitle */}
      <div className="flex flex-col justify-start items-start gap-1">
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          Users Management
        </h1>
        <p className="text-slate-400 text-base font-medium">
          Manage all registered users and their activities
        </p>
      </div>

      {/* Users Data Table */}
      <UsersTable />
    </div>
  )
}

export default UserManagementView
