import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";
import { createSessionToken } from "@/lib/session";
import { SESSION_COOKIE } from "@/lib/session-config";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };

    if (!body.password) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 },
      );
    }

    if (!verifyPassword(body.password)) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
