import { UserDetailPageClient } from "./user-detail-client"
import { mockUsers, slugifyUsername } from "@/features/userManagement/api"

export function generateStaticParams() {
  const bySlug = mockUsers.map((u) => ({ username: slugifyUsername(u.name) }))
  const byId = mockUsers.map((u) => ({ username: u.id }))
  return [...bySlug, ...byId]
}

export default async function UserManagementDetailPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  return <UserDetailPageClient username={username} />
}
