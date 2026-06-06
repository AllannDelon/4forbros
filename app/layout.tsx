import type { Metadata } from "next";
import type { Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "4forBros | Encontre seu próximo veículo",
  description: "A melhor plataforma para comprar e vender veículos premium com confiança.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>