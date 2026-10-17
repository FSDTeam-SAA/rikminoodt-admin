import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../api"
import { CreateProjectInput, ProjectsFilter } from "../types"
import { toast } from "sonner"

export const PROJECTS_QUERY_KEY = ["projects"]

export function useProjects(filter?: ProjectsFilter) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, filter],
    queryFn: () => projectsApi.getProjects(filter),
  })
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateProjectInput) => projectsApi.createProject(input),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
      toast.success(`"${newProject.name}" created successfully!`, {
        description: `Added to Rikminoodt portfolio at ${newProject.location}.`,
      })
    },
    onError: (error: any) => {
      toast.error("Failed to create project", {
        description: error?.message || "Please check your network connection.",
      })
    },
  })
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectsApi.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
      toast.error("Project removed", {
        description: "Deleted from Rikminoodt inventory.",
      })
    },
  })
}
