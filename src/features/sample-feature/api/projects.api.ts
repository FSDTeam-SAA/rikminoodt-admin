import api from "@/lib/api"
import { ProjectItem, CreateProjectInput, ProjectsFilter } from "../types"

// Sample initial data for offline / fallback
export const mockProjects: ProjectItem[] = [
  {
    id: "RM-901",
    name: "The Sovereign Penthouse at Biscayne",
    category: "Sky Penthouse",
    location: "Biscayne Bay, Miami FL",
    price: "$14,800,000",
    units: 1,
    status: "Active",
    inquiries: 28,
    roi: "14.2%",
  },
  {
    id: "RM-902",
    name: "Azure Horizon Residences",
    category: "Luxury Villa",
    location: "Sunny Isles Beach, FL",
    price: "$4,200,000",
    units: 16,
    status: "Active",
    inquiries: 64,
    roi: "11.8%",
  },
  {
    id: "RM-903",
    name: "One Island Marina Towers",
    category: "Commercial Tower",
    location: "Brickell Financial District",
    price: "$6,950,000",
    units: 8,
    status: "Under Contract",
    inquiries: 42,
    roi: "15.4%",
  },
  {
    id: "RM-904",
    name: "Miramar Bay Palms Estate",
    category: "Waterfront Estate",
    location: "Key Biscayne, FL",
    price: "$8,750,000",
    units: 4,
    status: "Upcoming",
    inquiries: 19,
    roi: "13.0%",
  },
  {
    id: "RM-905",
    name: "Elysian Sky Mansions",
    category: "Sky Penthouse",
    location: "Downtown Miami Skyline",
    price: "$18,500,000",
    units: 2,
    status: "Active",
    inquiries: 37,
    roi: "16.1%",
  },
]

export const projectsApi = {
  async getProjects(filter?: ProjectsFilter): Promise<ProjectItem[]> {
    try {
      const { data } = await api.get<ProjectItem[]>("/projects", { params: filter })
      return data
    } catch {
      // Fallback mock dataset for demonstration
      let list = [...mockProjects]
      if (filter?.search) {
        const q = filter.search.toLowerCase()
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q)
        )
      }
      if (filter?.status && filter.status !== "All") {
        list = list.filter((p) => p.status === filter.status)
      }
      return list
    }
  },

  async getProjectById(id: string): Promise<ProjectItem> {
    const { data } = await api.get<ProjectItem>(`/projects/${id}`)
    return data
  },

  async createProject(input: CreateProjectInput): Promise<ProjectItem> {
    try {
      const { data } = await api.post<ProjectItem>("/projects", input)
      return data
    } catch {
      const newProj: ProjectItem = {
        ...input,
        id: `RM-${Math.floor(100 + Math.random() * 900)}`,
        inquiries: 0,
        roi: "12.5%",
      }
      mockProjects.unshift(newProj)
      return newProj
    }
  },

  async deleteProject(id: string): Promise<{ success: boolean }> {
    try {
      await api.delete(`/projects/${id}`)
    } catch {
      const idx = mockProjects.findIndex((p) => p.id === id)
      if (idx !== -1) mockProjects.splice(idx, 1)
    }
    return { success: true }
  },
}

export default projectsApi
