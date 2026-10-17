import { UserDetailPageClient } from "./user-detail-client"
import { mockUsers } from "@/features/userManagement/api"

export function generateStaticParams() {
  return mockUsers.map((u) => ({ id: u.id }))
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <UserDetailPageClient userId={id} />
}
