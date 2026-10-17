import { mockProjects } from "../features/overview/api/projects.api"

describe("Rikminoodt Admin API & Mock Data", () => {
  it("should have initial mock projects defined", () => {
    expect(mockProjects.length).toBeGreaterThan(0)
  })

  it("should have correct properties on project items", () => {
    const first = mockProjects[0]
    expect(first).toHaveProperty("id")
    expect(first).toHaveProperty("name")
    expect(first).toHaveProperty("price")
    expect(first).toHaveProperty("status")
  })
})
