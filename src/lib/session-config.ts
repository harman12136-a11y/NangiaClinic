export const SESSION_COOKIE = "doctor_session";

const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "dr-nangia-clinic-secret-key-2026";

export function getSessionSecret(): Uint8Array {
  return new TextEncoder().encode(SESSION_SECRET);
}
