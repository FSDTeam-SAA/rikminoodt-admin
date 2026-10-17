export type ProjectStatus = "Active" | "Under Contract" | "Upcoming" | "Sold Out"

export interface ProjectItem {
  id: string
  name: string
  category: string
  location: string
  price: string
  units: number
  status: ProjectStatus
  inquiries: number
  roi: string
  createdAt?: string
}

export interface CreateProjectInput {
  name: string
  category: string
  location: string
  price: string
  units: number
  status: ProjectStatus
}

export interface ProjectsFilter {
  search?: string
  status?: string
}
