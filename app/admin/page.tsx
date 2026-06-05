import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getCars } from "@/lib/cars";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const cars = getCars();
  return <AdminDashboard initialCars={cars} />;
}
