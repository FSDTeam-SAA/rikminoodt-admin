import { Suspense } from "react"
import { OrderDetailPageClient } from "./order-detail-client"
import { mockOrders } from "@/features/ordersManagement/api"

export function generateStaticParams() {
  const lower = mockOrders.map((o) => ({ orderId: o.id.toLowerCase() }))
  const normal = mockOrders.map((o) => ({ orderId: o.id }))
  const objectIds = mockOrders.filter((o) => o._id).map((o) => ({ orderId: o._id! }))
  return [...lower, ...normal, ...objectIds]
}

async function OrderDetailContent({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params
  return <OrderDetailPageClient orderId={orderId} />
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  return (
    <Suspense fallback={null}>
      <OrderDetailContent params={params} />
    </Suspense>
  )
}
