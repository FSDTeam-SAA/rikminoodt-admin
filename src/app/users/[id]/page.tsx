import { redirect } from "next/navigation"
import { mockUsers, slugifyUsername } from "@/features/userManagement/api"

export function generateStaticParams() {
  return mockUsers.map((u) => ({ id: u.id }))
}

export default async function UserRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const found = mockUsers.find((u) => u.id === id)
  const target = found ? slugifyUsername(found.name) : id
  redirect(`/user-management/${target}`)
}
