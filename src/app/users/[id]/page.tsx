import { Suspense } from "react"
import { redirect } from "next/navigation"
import { mockUsers, slugifyUsername } from "@/features/userManagement/api"

export function generateStaticParams() {
  return mockUsers.map((u) => ({ id: u.id }))
}

async function UserRedirectContent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const found = mockUsers.find((u) => u.id === id)
  const target = found ? slugifyUsername(found.name) : id
  redirect(`/user-management/${target}`)
  return null
}

export default function UserRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <Suspense fallback={null}>
      <UserRedirectContent params={params} />
    </Suspense>
  )
}
