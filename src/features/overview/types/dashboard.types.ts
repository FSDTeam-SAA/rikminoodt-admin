export interface DashboardCardsData {
  totalUsers: number
  totalBooksGenerated: number
  totalPrintOrders: number
  totalRevenue: number
  generationRevenue: number
  printingRevenue: number
}

export interface MonthlyRevenueItem {
  month: number // 1 to 12
  generationRevenue: number
  printingRevenue: number
}

export interface OverviewGraphResponseItem {
  month: number
  generationRevenue: number
  printingRevenue: number
}
