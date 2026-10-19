"use client"

import { useQuery } from "@tanstack/react-query"
import dashboardApi from "../api/dashboard.api"

export function useDashboardCards() {
  return useQuery({
    queryKey: ["admin", "dashboard", "cards"],
    queryFn: () => dashboardApi.getCards(),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  })
}

export function useOverviewGraph(year?: number) {
  return useQuery({
    queryKey: ["admin", "dashboard", "graph", year],
    queryFn: () => dashboardApi.getOverviewGraph(year),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
