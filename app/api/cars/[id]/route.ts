import { NextRequest, NextResponse } from "next/server";
import { getCars, saveCars } from "@/lib/cars";
import { isAuthenticated } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const cars = getCars();
  const idx = cars.findIndex((c) => c.id === params.id);

  if (idx === -1) {
    return NextResponse.json({ error: "Carro não encontrado" }, { status: 404 });
  }

  cars[idx] = {
    ...cars[idx],
    ...body,
    id: params.id,
  };

  saveCars(cars);
  return NextResponse.json(cars[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const cars = getCars();
  const filtered = cars.filter((c) => c.id !== params.id);

  if (filtered.length === cars.length) {
    return NextResponse.json({ error: "Carro não encontrado" }, { status: 404 });
  }

  saveCars(filtered);
  return NextResponse.json({ ok: true });
}
