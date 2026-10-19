import api from "@/lib/api"
import { BackendResponse } from "@/features/auth/types"
import { DashboardCardsData, MonthlyRevenueItem } from "../types/dashboard.types"

export const dashboardApi = {
  /**
   * Fetch all 6 dashboard overview summary cards
   * Endpoint: GET /admin/dashboard/cards
   */
  async getCards(): Promise<DashboardCardsData> {
    const res = await api.get<BackendResponse<DashboardCardsData>>(
      "/admin/dashboard/cards"
    )
    return res.data?.data
  },

  /**
   * Fetch monthly generation vs printing revenue graph
   * Endpoint: GET /admin/dashboard/overview-graph?year=YYYY
   */
  async getOverviewGraph(year?: number): Promise<MonthlyRevenueItem[]> {
    const res = await api.get<BackendResponse<MonthlyRevenueItem[]>>(
      "/admin/dashboard/overview-graph",
      {
        params: year ? { year } : undefined,
      }
    )
    return res.data?.data || []
  },
}

export default dashboardApi
