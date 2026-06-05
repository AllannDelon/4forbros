import fs from "fs";
import path from "path";

export type Car = {
  id: string;
  name: string;
  year: number;
  price: string;
  km: string;
  transmission: string;
  fuel: string;
  power: string;
  description: string;
  badge: string | null;
  images: string[];
};

const DATA_FILE = path.join(process.cwd(), "data", "cars.json");

export function getCars(): Car[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCars(cars: Car[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(cars, null, 2), "utf-8");
}
