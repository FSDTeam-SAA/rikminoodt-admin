import api from "@/lib/api"
import { updateStoredUser, getStoredUser } from "@/lib/auth-storage"
import {
  AdminProfile,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "../types"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"

export const settingsApi = {
  /**
   * Fetch current authenticated admin user profile
   * Endpoint: GET /user/me
   */
  async getProfile(): Promise<AdminProfile> {
    try {
      const res = await api.get<any>("/user/me")
      const user = res.data?.data || res.data

      if (user) {
        const fullName = (user.name || "").trim()
        const parts = fullName.split(" ")
        const firstName = parts[0] || ""
        const lastName = parts.slice(1).join(" ") || ""

        // Update local session
        updateStoredUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        })

        return {
          id: user._id,
          firstName,
          lastName,
          email: user.email || "",
          phone: user.phone || "",
          language: user.language || "English",
          avatar: user.profileImage || DEFAULT_AVATAR,
          role: user.role || "ADMIN",
        }
      }

      // Fallback to stored user
      const stored = getStoredUser()
      const storedParts = (stored?.name || "Rik minoodt").split(" ")
      return {
        id: stored?._id,
        firstName: storedParts[0] || "Rik",
        lastName: storedParts.slice(1).join(" ") || "minoodt",
        email: stored?.email || "admin@example.com",
        phone: "",
        language: "English",
        avatar: stored?.profileImage || DEFAULT_AVATAR,
        role: stored?.role || "ADMIN",
      }
    } catch (err) {
      console.error("Failed to fetch admin profile:", err)
      const stored = getStoredUser()
      const storedParts = (stored?.name || "Rik minoodt").split(" ")
      return {
        id: stored?._id,
        firstName: storedParts[0] || "Rik",
        lastName: storedParts.slice(1).join(" ") || "minoodt",
        email: stored?.email || "admin@example.com",
        phone: "",
        language: "English",
        avatar: stored?.profileImage || DEFAULT_AVATAR,
        role: stored?.role || "ADMIN",
      }
    }
  },

  /**
   * Update admin profile
   * Endpoint: PUT /user/me
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<AdminProfile> {
    const fullName = `${payload.firstName} ${payload.lastName}`.trim()
    const body: Record<string, any> = {
      name: fullName,
      language: payload.language,
    }
    if (payload.phone !== undefined) {
      body.phone = payload.phone
    }

    const res = await api.put<any>("/user/me", body)
    const user = res.data?.data || res.data

    updateStoredUser({
      name: fullName,
    })

    const parts = (user?.name || fullName).split(" ")
    return {
      id: user?._id,
      firstName: parts[0] || payload.firstName,
      lastName: parts.slice(1).join(" ") || payload.lastName,
      email: user?.email || "",
      phone: user?.phone || payload.phone || "",
      language: user?.language || payload.language,
      avatar: user?.profileImage || DEFAULT_AVATAR,
      role: user?.role || "ADMIN",
    }
  },

  /**
   * Upload admin avatar
   * Endpoint: PUT /user/upload-avatar (multipart/form-data)
   */
  async uploadAvatar(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("profileImage", file)

    const res = await api.put<any>("/user/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    const user = res.data?.data || res.data
    const profileImageUrl = user?.profileImage || ""

    if (profileImageUrl) {
      updateStoredUser({ profileImage: profileImageUrl })
    }

    return profileImageUrl
  },

  /**
   * Change current admin password
   * Endpoint: POST /auth/change-password
   */
  async changePassword(payload: ChangePasswordPayload): Promise<string> {
    const res = await api.post<any>("/auth/change-password", {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
    })
    return res.data?.message || "Password changed successfully"
  },
}

export default settingsApi
