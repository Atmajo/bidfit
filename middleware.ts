import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Explicitly define paths and their access rules
const PUBLIC_PATHS = ["/"];
const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth-token")?.value;

  // Always allow access to public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Handle auth paths (login, register, etc.)
  if (AUTH_PATHS.includes(pathname)) {
    if (authToken) {
      // If authenticated on auth pages, simply proceed
      return NextResponse.next();
    }
    // If not authenticated, allow access to auth pages
    return NextResponse.next();
  }

  // Handle protected paths
  if (!authToken) {
    // If not authenticated and trying to access a protected path,
    // redirect to login with the intended destination
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated users can access protected paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
