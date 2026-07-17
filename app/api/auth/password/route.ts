import { NextResponse } from "next/server";
import { changePassword } from "@/lib/auth";
import { isAuthenticated } from "@/lib/session";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (!body.currentPassword || !body.newPassword) {
    return NextResponse.json(
      { error: "Current and new password are required." },
      { status: 400 },
    );
  }

  const result = changePassword(body.currentPassword, body.newPassword);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
