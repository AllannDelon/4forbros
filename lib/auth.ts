import { cookies } from "next/headers";

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token");
  if (!token) return false;
  try {
    const decoded = Buffer.from(token.value, "base64").toString("utf-8");
    const secret = process.env.AUTH_SECRET || "4forbros-secret";
    return decoded.startsWith(secret);
  } catch {
    return false;
  }
}
