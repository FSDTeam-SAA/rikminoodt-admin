import { OrderDetailPageClient } from "./order-detail-client"
import { mockOrders } from "@/features/ordersManagement/api"

export function generateStaticParams() {
  const lower = mockOrders.map((o) => ({ orderId: o.id.toLowerCase() }))
  const normal = mockOrders.map((o) => ({ orderId: o.id }))
  return [...lower, ...normal]
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params
  return <OrderDetailPageClient orderId={orderId} />
}
