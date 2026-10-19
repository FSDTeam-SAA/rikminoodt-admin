export interface AdminProfile {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  language: string
  avatar?: string
  role?: string
}

export type SettingsTab = "profile" | "security"

export interface SecuritySettings {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  twoFactorEnabled?: boolean
}

export interface UpdateProfilePayload {
  firstName: string
  lastName: string
  phone?: string
  language: string
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
}
