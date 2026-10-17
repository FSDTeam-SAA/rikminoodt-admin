import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export interface ProxyRouteConfig {
  path: string
  roles: ("admin" | "manager" | "viewer")[]
}

export const protectedRoutes: ProxyRouteConfig[] = [
  { path: "/admin", roles: ["admin", "manager"] },
  { path: "/settings", roles: ["admin"] },
  { path: "/analytics", roles: ["admin", "manager"] },
]

/**
 * Next.js proxy / RBAC routing handler.
 * Evaluates JWT tokens and applies role-based access rules.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow static files, auth endpoints, and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Find if path is protected
  const matchingRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.path)
  )

  if (matchingRoute) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    const userRole = (token.role as "admin" | "manager" | "viewer") || "viewer"
    if (!matchingRoute.roles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

export default proxy
