import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const valid = await verifyPassword(body.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}
