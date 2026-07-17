import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getSessionSecret, SESSION_COOKIE } from "@/lib/session-config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/doctor/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/doctor/login", request.url));
  }

  try {
    await jwtVerify(token, getSessionSecret());
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/doctor/login", request.url));
  }
}

export const config = {
  matcher: ["/doctor/dashboard", "/doctor/dashboard/:path*"],
};
