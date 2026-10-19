import api from "@/lib/api"
import {
  setAuthSession,
  clearAuthSession,
  getStoredUser,
  isAuthenticated,
} from "@/lib/auth-storage"
import {
  AdminUser,
  BackendResponse,
  LoginDto,
  LoginResponseData,
  ForgetPasswordDto,
  VerifyCodeDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from "../types"

export const authApi = {
  /**
   * Log in an administrator
   * Validates credentials with backend and verifies role is 'admin'
   */
  async login(credentials: LoginDto): Promise<LoginResponseData> {
    const res = await api.post<BackendResponse<LoginResponseData>>(
      "/auth/login",
      credentials
    )

    const payload = res.data?.data
    if (!payload?.accessToken || !payload?.user) {
      throw new Error("Invalid response format from server.")
    }

    // Role check: Only admin role is permitted in this dashboard
    const userRole = (payload.user.role || "").toLowerCase()
    if (userRole !== "admin") {
      throw new Error("Access denied: You do not have administrator permissions.")
    }

    // Save tokens and user session in cookies & localStorage
    setAuthSession(payload.accessToken, payload.user.refreshToken, payload.user)

    return payload
  },

  /**
   * Request password reset code via email
   * Endpoint: POST /auth/forget-password
   */
  async forgetPassword(dto: ForgetPasswordDto): Promise<BackendResponse<null>> {
    const res = await api.post<BackendResponse<null>>("/auth/forget-password", dto)
    return res.data
  },

  /**
   * Verify the 6-digit OTP sent to email
   * Endpoint: POST /auth/verify-code
   */
  async verifyCode(dto: VerifyCodeDto): Promise<BackendResponse<null>> {
    const res = await api.post<BackendResponse<null>>("/auth/verify-code", dto)
    return res.data
  },

  /**
   * Reset password with verified session
   * Endpoint: POST /auth/reset-password
   */
  async resetPassword(dto: ResetPasswordDto): Promise<BackendResponse<null>> {
    const res = await api.post<BackendResponse<null>>("/auth/reset-password", dto)
    return res.data
  },

  /**
   * Change current admin password (requires JWT Bearer)
   * Endpoint: POST /auth/change-password
   */
  async changePassword(dto: ChangePasswordDto): Promise<BackendResponse<null>> {
    const res = await api.post<BackendResponse<null>>("/auth/change-password", dto)
    return res.data
  },

  /**
   * Log out administrator session
   * Endpoint: POST /auth/logout
   */
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout")
    } catch {
      // Ignore network errors on logout
    } finally {
      clearAuthSession()
    }
  },

  /**
   * Get currently active admin user from storage
   */
  getCurrentUser(): AdminUser | null {
    return getStoredUser()
  },

  /**
   * Check if an active session exists
   */
  isAuthenticated(): boolean {
    return isAuthenticated()
  },
}

export default authApi
