import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  getAdminData,
  saveAdminData,
  setMemoryAdminHash,
} from "@/lib/store";

const SESSION_COOKIE = "doctor_session";
const DEFAULT_PASSWORD = "nangia@123";

function getSecret(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET ?? "dr-nangia-clinic-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

function getConfiguredPassword(): string {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
}

export async function ensureAdminPassword(): Promise<string> {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH;
  }

  const existing = await getAdminData();
  if (existing?.passwordHash) {
    return existing.passwordHash;
  }

  const hash = await bcrypt.hash(getConfiguredPassword(), 12);
  setMemoryAdminHash(hash);

  try {
    await saveAdminData({ passwordHash: hash });
  } catch {
    // Read-only filesystem on serverless — in-memory hash is used
  }

  return hash;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const configured = getConfiguredPassword();
  if (!process.env.ADMIN_PASSWORD_HASH && password === configured) {
    const hash = await ensureAdminPassword();
    return bcrypt.compare(password, hash);
  }

  const hash = await ensureAdminPassword();
  return bcrypt.compare(password, hash);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  const valid = await verifyPassword(currentPassword);
  if (!valid) {
    return { success: false, error: "Current password is incorrect." };
  }
  if (newPassword.length < 6) {
    return {
      success: false,
      error: "New password must be at least 6 characters.",
    };
  }

  const hash = await bcrypt.hash(newPassword, 12);
  setMemoryAdminHash(hash);

  try {
    await saveAdminData({ passwordHash: hash });
  } catch {
    // Password updated in memory for this server instance
  }

  return { success: true };
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "doctor" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export { SESSION_COOKIE };
