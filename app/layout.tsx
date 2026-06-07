import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.4forbros.com.br"),
  title: {
    default: "4forBros | Veículos Exclusivos e Esportivos em Manaus",
    template: "%s | 4forBros",
  },
  description:
    "A 4forBros é referência em veículos exclusivos, esportivos e blindados em Manaus. Encontre seu próximo carro com segurança e confiança.",
  keywords: [
    "veículos exclusivos Manaus",
    "carros esportivos Manaus",
    "carros blindados Manaus",
    "4forbros",
    "comprar carro Manaus",
    "concessionária Manaus",
    "carros premium Manaus",
  ],
  authors: [{ name: "4forBros" }],
  creator: "4forBros",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.4forbros.com.br",
    siteName: "4forBros",
    title: "4forBros | Veículos Exclusivos e Esportivos em Manaus",
    description:
      "Referência em veículos exclusivos, esportivos e blindados em Manaus. Encontre seu próximo carro com a 4forBros.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "4forBros - Veículos Exclusivos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4forBros | Veículos Exclusivos e Esportivos em Manaus",
    description: "Referência em veículos exclusivos, esportivos e blindados em Manaus.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://www.4forbros.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>{children}</body>
    </html>
  );
}
