import { useQuery } from "@tanstack/react-query"
import { usersApi } from "../api"
import { UsersFilter } from "../types"

export const USERS_QUERY_KEY = ["users"]

export function useUsers(filter?: UsersFilter) {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, filter],
    queryFn: () => usersApi.getUsers(filter),
  })
}
