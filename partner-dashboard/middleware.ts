import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "partner_dashboard_session";

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing environment variable: SESSION_SECRET");
  }

  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname.startsWith("/login");

  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, getSessionSecret());
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isDashboardRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname === "/" || isLoginRoute) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
