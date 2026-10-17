"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SharedSidebar } from "@/components/shared/sidebar"
import { SharedHeader } from "@/components/shared/header"
import { UserDetailsView } from "@/features/userManagement/components"
import { useUIStore } from "@/store/ui.store"

interface UserDetailPageClientProps {
  userId: string
}

export function UserDetailPageClient({ userId }: UserDetailPageClientProps) {
  const router = useRouter()
  const setCurrentTab = useUIStore((s) => s.setCurrentTab)

  React.useEffect(() => {
    setCurrentTab("users")
  }, [setCurrentTab])

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-['Nunito_Sans']">
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="fixed top-0 bottom-0 left-0 w-64 z-20">
          <SharedSidebar />
        </div>
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <SharedHeader />

        <main className="flex-1 p-6 lg:p-8 space-y-6 w-full">
          <UserDetailsView
            userId={userId}
            onBack={() => router.push("/users")}
          />
        </main>
      </div>
    </div>
  )
}

export default UserDetailPageClient
