import { MetadataRoute } from "next";
import { getCars } from "@/lib/cars";

export default function sitemap(): MetadataRoute.Sitemap {
  const cars = getCars();

  const carUrls: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `https://www.4forbros.com.br/cars/${car.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.4forbros.com.br",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.4forbros.com.br/veiculos",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...carUrls,
  ];
}
