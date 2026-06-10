import { getCars } from "@/lib/cars";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarGallery from "@/components/CarGallery";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const cars = getCars();
  const car = cars.find((c) => c.id === params.id);
  if (!car) return {};

  const title = `${car.name} ${car.year}`;
  const description =
    car.description ||
    `${car.name} ${car.year} — ${car.price}${car.km ? `, ${car.km} rodados` : ""}. ${car.transmission}, ${car.fuel}. Disponível na 4forBros em Manaus.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 4forBros`,
      description,
      url: `https://www.4forbros.com.br/cars/${car.id}`,
      images: car.images[0]
        ? [{ url: car.images[0], width: 1200, height: 800, alt: car.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 4forBros`,
      description,
      images: car.images[0] ? [car.images[0]] : [],
    },
    alternates: {
      canonical: `https://www.4forbros.com.br/cars/${car.id}`,
    },
  };
}

export default function CarPage({ params }: { params: { id: string } }) {
  const cars = getCars();
  const car = cars.find((c) => c.id === params.id);
  if (!car) notFound();

  // Carros similares: mesmo badge ou mesmo combustível, excluindo o atual, máx 3
  const similar = cars
    .filter((c) => c.id !== car.id)
    .sort((a, b) => {
      const scoreA = (a.badge === car.badge ? 2 : 0) + (a.fuel === car.fuel ? 1 : 0);
      const scoreB = (b.badge === car.badge ? 2 : 0) + (b.fuel === car.fuel ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 3);

  const waInteresse = `https://wa.me/5592982291000?text=${encodeURIComponent(
    `Olá! Tenho interesse no ${car.name} ${car.year} (${car.price}). Pode me passar mais informações?`
  )}`;
  const waVisita = `https://wa.me/5592982291000?text=${encodeURIComponent(
    `Olá! Gostaria de agendar uma visita para ver o ${car.name} ${car.year}. Qual a disponibilidade?`
  )}`;

  const specs = [
    { label: "Ano", value: String(car.year) },
    { label: "Quilometragem", value: car.km },
    { label: "Câmbio", value: car.transmission },
    { label: "Combustível", value: car.fuel },
    { label: "Potência", value: car.power },
  ].filter((s) => s.value);

  return (
    <main className="min-h-screen bg-[#0D1117]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#8b90a1] font-inter mb-8 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span>/</span>
          <Link href="/#veiculos" className="hover:text-white transition-colors">Veículos</Link>
          <span>/</span>
          <span className="text-white">{car.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="min-w-0">
            <CarGallery images={car.images} name={car.name} />
          </div>

          {/* Details */}
          <div className="flex flex-col min-w-0">
            {/* Badge */}
            {car.badge && (
              <span className="inline-block bg-[#0077FF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit shadow-[0_0_10px_rgba(0,119,255,0.4)]">
                {car.badge}
              </span>
            )}

            <h1 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-1">
              {car.name}
            </h1>
            <p className="text-[#8b90a1] font-inter mb-4">{car.year}</p>

            <p className="font-rajdhani font-bold text-4xl text-[#0077FF] mb-6">
              {car.price}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {specs.map(({ label, value }) => (
                <div key={label} className="glass-card rounded-xl p-3 text-center">
                  <p className="text-xs text-[#8b90a1] font-inter mb-1">{label}</p>
                  <p className="text-sm font-inter font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {car.description && (
              <div className="glass-card rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0077FF] mb-2 font-inter">
                  Descrição
                </p>
                <p className="text-sm text-[#8b90a1] font-inter leading-relaxed break-words">
                  {car.description}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-auto">
              <a
                href={waInteresse}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary py-4 rounded-xl text-sm flex items-center justify-center gap-2 font-semibold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Tenho Interesse
              </a>

              <a
                href={waVisita}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-ghost py-4 rounded-xl text-sm flex items-center justify-center gap-2 font-semibold"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Agendar Visita
              </a>

              {car.instagramUrl && (
                <a
                  href={car.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 border border-white/10 text-[#8b90a1] hover:border-pink-500/50 hover:text-pink-400 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                  Ver no Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12">
          <Link
            href="/veiculos"
            className="inline-flex items-center gap-2 text-sm text-[#8b90a1] hover:text-white font-inter transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar ao catálogo
          </Link>
        </div>

        {/* Carros similares */}
        {similar.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <span className="blue-line mb-4 block" />
              <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
                Você também pode gostar
              </p>
              <h2 className="font-rajdhani font-bold text-3xl md:text-4xl text-white">
                Veículos similares
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/cars/${s.id}`}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col hover:border-[#0077FF]/30 border border-transparent transition-all duration-300"
                >
                  <div className="relative h-48 bg-[#1c2026] overflow-hidden">
                    {s.images[0] ? (
                      <Image
                        src={s.images[0]}
                        alt={s.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-[#414755]">
                        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] via-transparent to-transparent" />
                    {s.badge && (
                      <span className="absolute top-3 left-3 bg-[#0077FF] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-rajdhani font-bold text-lg text-white leading-tight">{s.name}</h3>
                      <span className="font-rajdhani font-bold text-lg text-[#0077FF] ml-2 whitespace-nowrap">{s.price}</span>
                    </div>
                    <p className="text-xs text-[#8b90a1] font-inter mb-3">
                      {s.year}{s.km ? ` · ${s.km}` : ""}{s.transmission ? ` · ${s.transmission}` : ""}
                    </p>
                    <span className="mt-auto text-xs font-inter text-[#0077FF] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver detalhes
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
