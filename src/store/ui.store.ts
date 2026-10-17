import { create } from "zustand"

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  currentTab: string
  commandPaletteOpen: boolean
  unreadNotifications: number
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  toggleSidebarCollapse: () => void
  setCurrentTab: (tab: string) => void
  setCommandPaletteOpen: (open: boolean) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,
  currentTab: "overview",
  commandPaletteOpen: false,
  unreadNotifications: 3,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSidebarCollapse: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  clearNotifications: () => set({ unreadNotifications: 0 }),
}))
