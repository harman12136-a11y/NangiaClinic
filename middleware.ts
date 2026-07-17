import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "doctor_session";

function getSecret(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET ?? "dr-nangia-clinic-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/doctor/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/doctor/login", request.url));
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/doctor/login", request.url));
  }
}

export const config = {
  matcher: ["/doctor/dashboard/:path*"],
};
