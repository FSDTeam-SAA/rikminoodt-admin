/**
 * Auth Storage Helper for Boekerello Admin
 * Handles access token, refresh token, and user session across Cookies and LocalStorage.
 * Using cookies allows Next.js middleware to run route protection synchronously.
 */

export interface StoredAdminUser {
  _id: string
  name: string
  email: string
  role: string
  profileImage?: string
}

const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"
const USER_KEY = "admin_user"

// Helper to set a cookie in browser
export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === "undefined") return
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`
}

// Helper to get a cookie in browser
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

// Helper to delete a cookie
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return getCookie(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  return getCookie(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getStoredUser(): StoredAdminUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = getCookie(USER_KEY) || localStorage.getItem(USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredAdminUser
  } catch {
    return null
  }
}

export function setAuthSession(
  accessToken: string,
  refreshToken?: string,
  user?: StoredAdminUser
) {
  if (typeof window === "undefined") return

  // Cookies (7 days for access, 10 days for refresh)
  setCookie(ACCESS_TOKEN_KEY, accessToken, 7)
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

  if (refreshToken) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken, 10)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }

  if (user) {
    setCookie(USER_KEY, JSON.stringify(user), 7)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export function updateStoredUser(updates: Partial<StoredAdminUser>) {
  if (typeof window === "undefined") return
  const current = getStoredUser()
  const updated: StoredAdminUser = current
    ? { ...current, ...updates }
    : {
        _id: "",
        name: updates.name || "Administrator",
        email: updates.email || "",
        role: "ADMIN",
        profileImage: updates.profileImage,
      }

  setCookie(USER_KEY, JSON.stringify(updated), 7)
  localStorage.setItem(USER_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event("admin_user_updated"))
}

export function clearAuthSession() {
  if (typeof window === "undefined") return

  deleteCookie(ACCESS_TOKEN_KEY)
  deleteCookie(REFRESH_TOKEN_KEY)
  deleteCookie(USER_KEY)

  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return !!getAccessToken()
}
