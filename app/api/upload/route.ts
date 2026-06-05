import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "cars");
  await mkdir(uploadDir, { recursive: true });

  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const filePath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));
    urls.push(`/cars/${filename}`);
  }

  return NextResponse.json({ urls });
}
