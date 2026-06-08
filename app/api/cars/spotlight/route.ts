import { NextRequest, NextResponse } from "next/server";
import { getCars, saveCars } from "@/lib/cars";
import { isAuthenticated } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await req.json();
  const cars = getCars();
  const already = cars.find((c) => c.id === id)?.spotlight;

  const updated = cars.map((c) => ({
    ...c,
    spotlight: already ? false : c.id === id,
  }));

  saveCars(updated);
  return NextResponse.json({ ok: true, spotlight: !already ? id : null });
}
