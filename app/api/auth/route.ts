import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "4forBros@2024";
const AUTH_SECRET = process.env.AUTH_SECRET || "4forbros-secret";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const token = Buffer.from(`${AUTH_SECRET}:${Date.now()}`).toString("base64");

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
    sameSite: "lax",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_token");
  return res;
}
