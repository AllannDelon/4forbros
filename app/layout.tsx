import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

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

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "4forBros",
  description:
    "Referência em veículos exclusivos, esportivos e blindados em Manaus. Transparência, qualidade e atendimento personalizado.",
  url: "https://www.4forbros.com.br",
  telephone: "+55-92-98229-1000",
  email: "contato@4forbros.com.br",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manaus",
    addressRegion: "AM",
    addressCountry: "BR",
  },
  areaServed: { "@type": "City", name: "Manaus" },
  priceRange: "$$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: ["https://www.instagram.com/4forbros"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
