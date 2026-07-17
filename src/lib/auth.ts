// Hardcoded doctor portal password — change this value to update the password
export const ADMIN_PASSWORD = "nangia@123";

// In-memory override when changed from dashboard (resets on server restart)
let activePassword = ADMIN_PASSWORD;

export function verifyPassword(password: string): boolean {
  return password === activePassword;
}

export function changePassword(
  currentPassword: string,
  newPassword: string,
): { success: boolean; error?: string } {
  if (currentPassword !== activePassword) {
    return { success: false, error: "Current password is incorrect." };
  }
  if (newPassword.length < 6) {
    return {
      success: false,
      error: "New password must be at least 6 characters.",
    };
  }
  activePassword = newPassword;
  return { success: true };
}
