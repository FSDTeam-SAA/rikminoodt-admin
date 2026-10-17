export interface AdminProfile {
  firstName: string
  lastName: string
  email: string
  language: string
  avatar?: string
}

export type SettingsTab = "profile" | "security"

export interface SecuritySettings {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  twoFactorEnabled?: boolean
}
