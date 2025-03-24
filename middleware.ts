import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/auth"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  
  const { pathname } = req.nextUrl.clone();
  
  if (!token) {
    if (!publicRoutes.includes(pathname)) {
      
      const url = req.nextUrl.clone();
      url.pathname = '/auth';
      
      url.searchParams.set('from', pathname);
      
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname === '/auth') {
      const url = req.nextUrl.clone();
      const from = url.searchParams.get('from') || '/';
      url.searchParams.delete('from');
      url.pathname = from;
      
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
