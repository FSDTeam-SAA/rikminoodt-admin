import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Next.js 16 Proxy handler.
 * Protects all admin dashboard routes ensuring only authenticated admins can access.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore static assets, next internals, and common file extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get("accessToken")?.value

  const isAuthPage =
    pathname.startsWith("/auth") || pathname === "/login"

  // 1. Unauthenticated users trying to access dashboard/admin routes:
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/auth/login", request.url)
    if (pathname !== "/") {
      loginUrl.searchParams.set("callbackUrl", pathname)
    }
    return NextResponse.redirect(loginUrl)
  }

  // 2. Already logged in users trying to access auth pages:
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export default proxy
