import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Veículos",
  description:
    "Explore o catálogo completo da 4forBros: veículos exclusivos, esportivos e blindados em Manaus. Filtre por câmbio, combustível e preço.",
  openGraph: {
    title: "Catálogo de Veículos | 4forBros",
    description:
      "Explore o catálogo completo da 4forBros: veículos exclusivos, esportivos e blindados em Manaus.",
    url: "https://www.4forbros.com.br/veiculos",
  },
  alternates: {
    canonical: "https://www.4forbros.com.br/veiculos",
  },
};

export default function VeiculosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
