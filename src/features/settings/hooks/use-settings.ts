import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { settingsApi } from "../api"
import { UpdateProfilePayload, ChangePasswordPayload } from "../types"

export const SETTINGS_PROFILE_KEY = ["settings", "profile"]

export function useProfile() {
  return useQuery({
    queryKey: SETTINGS_PROFILE_KEY,
    queryFn: () => settingsApi.getProfile(),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      settingsApi.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_PROFILE_KEY })
    },
  })
}

export function useUploadAvatar() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => settingsApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_PROFILE_KEY })
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      settingsApi.changePassword(payload),
  })
}
