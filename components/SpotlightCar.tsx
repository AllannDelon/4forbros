import { getCars } from "@/lib/cars";
import Link from "next/link";
import Image from "next/image";

export default function SpotlightCar() {
  const car = getCars().find((c) => c.spotlight);
  if (!car) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-4">
      <div className="flex items-center gap-2.5 mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077FF" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#0077FF] font-inter">
          Destaque da semana
        </span>
      </div>

      <Link href={`/cars/${car.id}`} className="block group">
        <div className="glass-card rounded-2xl overflow-hidden grid md:grid-cols-2 border border-white/5 hover:border-[#0077FF]/30 transition-all duration-300">
          {/* Image */}
          <div className="relative h-64 md:h-auto min-h-[300px] bg-[#1c2026] overflow-hidden">
            {car.images[0] ? (
              <Image
                src={car.images[0]}
                alt={car.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#414755]">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" />
                </svg>
              </div>
            )}
            {car.badge && (
              <span className="absolute top-4 left-4 bg-[#0077FF] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(0,119,255,0.5)]">
                {car.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="font-rajdhani font-bold text-4xl lg:text-5xl text-white leading-tight mb-1">
              {car.name}
            </h3>
            <p className="text-[#8b90a1] font-inter mb-5">
              {car.year}
              {car.transmission ? ` · ${car.transmission}` : ""}
              {car.fuel ? ` · ${car.fuel}` : ""}
            </p>

            <p className="font-rajdhani font-bold text-5xl text-[#0077FF] mb-6">
              {car.price}
            </p>

            {(car.km || car.power) && (
              <div className="flex gap-3 mb-8">
                {car.km && (
                  <div className="bg-[#1c2026] rounded-xl px-4 py-2.5 text-center border border-white/5">
                    <p className="text-[10px] text-[#8b90a1] font-inter uppercase tracking-wider mb-0.5">Km</p>
                    <p className="text-sm font-inter font-semibold text-white">{car.km}</p>
                  </div>
                )}
                {car.power && (
                  <div className="bg-[#1c2026] rounded-xl px-4 py-2.5 text-center border border-white/5">
                    <p className="text-[10px] text-[#8b90a1] font-inter uppercase tracking-wider mb-0.5">Potência</p>
                    <p className="text-sm font-inter font-semibold text-white">{car.power}</p>
                  </div>
                )}
              </div>
            )}

            <span className="inline-flex items-center gap-2 bg-[#0077FF] text-white text-sm font-semibold px-6 py-3.5 rounded-xl w-fit shadow-[0_0_20px_rgba(0,119,255,0.3)] group-hover:shadow-[0_0_35px_rgba(0,119,255,0.55)] transition-shadow">
              Ver detalhes
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
