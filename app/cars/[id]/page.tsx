import { getCars } from "@/lib/cars";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarGallery from "@/components/CarGallery";

export default function CarPage({ params }: { params: { id: string } }) {
  const cars = getCars();
  const car = cars.find((c) => c.id === params.id);
  if (!car) notFound();

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
        <div className="flex items-center gap-2 text-sm text-[#8b90a1] font-inter mb-8">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span>/</span>
          <Link href="/#veiculos" className="hover:text-white transition-colors">Veículos</Link>
          <span>/</span>
          <span className="text-white">{car.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <CarGallery images={car.images} name={car.name} />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Badge */}
            {car.badge && (
              <span className="inline-block bg-[#0077FF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit shadow-[0_0_10px_rgba(0,119,255,0.4)]">
                {car.badge}
              </span>
            )}

            <h1 className="font-rajdhani font-bold text-4xl md:text-5xl text-white leading-tight mb-1">
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
                <p className="text-sm text-[#8b90a1] font-inter leading-relaxed">
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
            href="/#veiculos"
            className="inline-flex items-center gap-2 text-sm text-[#8b90a1] hover:text-white font-inter transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar ao catálogo
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
