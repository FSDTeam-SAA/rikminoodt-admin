"use client"

import * as React from "react"
import { UsersTable } from "./users-table"
import { UserDetailsView } from "./user-details-view"

interface UserManagementViewProps {
  initialUserId?: string
}

export function UserManagementView({ initialUserId }: UserManagementViewProps) {
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    initialUserId || null
  )

  if (selectedUserId) {
    return (
      <UserDetailsView
        userId={selectedUserId}
        onBack={() => setSelectedUserId(null)}
      />
    )
  }

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

      {/* Users Data Table & Search & Pagination */}
      <UsersTable onSelectUser={(id) => setSelectedUserId(id)} />
    </div>
  )
}

export default UserManagementView
