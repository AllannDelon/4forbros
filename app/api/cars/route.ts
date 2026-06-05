import { NextRequest, NextResponse } from "next/server";
import { getCars, saveCars, Car } from "@/lib/cars";
import { isAuthenticated } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function GET() {
  return NextResponse.json(getCars());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const cars = getCars();

  const newCar: Car = {
    id: randomUUID(),
    name: body.name || "",
    year: Number(body.year) || new Date().getFullYear(),
    price: body.price || "",
    km: body.km || "",
    transmission: body.transmission || "",
    fuel: body.fuel || "",
    power: body.power || "",
    description: body.description || "",
    badge: body.badge || null,
    images: body.images || [],
  };

  cars.push(newCar);
  saveCars(cars);

  return NextResponse.json(newCar, { status: 201 });
}
