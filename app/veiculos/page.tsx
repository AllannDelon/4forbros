"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Car } from "@/lib/cars";

interface Filters {
  fuel: string;
  transmission: string;
  precoMin: string;
  precoMax: string;
  search: string;
}

function parsePrice(price: string): number {
  return parseInt(price.replace(/\D/g, "")) || 0;
}

export default function VeiculosPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    fuel: "", transmission: "", precoMin: "", precoMax: "", search: "",
  });

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((data) => { setCars(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const fuels = Array.from(new Set(cars.map((c) => c.fuel).filter(Boolean)));
  const transmissions = Array.from(new Set(cars.map((c) => c.transmission).filter(Boolean)));

  const filtered = cars.filter((car) => {
    if (filters.fuel && car.fuel !== filters.fuel) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    const price = parsePrice(car.price);
    if (filters.precoMin && price < parseInt(filters.precoMin)) return false;
    if (filters.precoMax && price > parseInt(filters.precoMax)) return false;
    if (filters.search && !car.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const hasFilters = Object.values(filters).some(Boolean);

  const set = (key: keyof Filters) => (value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));

  return (
    <main className="min-h-screen bg-[#0D1117]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <span className="blue-line mb-4 block" />
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
            Catálogo completo
          </p>
          <h1 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-2">
            Todos os Veículos
          </h1>
          {!loading && (
            <p className="text-sm text-[#8b90a1] font-inter">
              {filtered.length} veículo{filtered.length !== 1 ? "s" : ""} disponíve{filtered.length !== 1 ? "is" : "l"}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Search */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">Buscar</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => set("search")(e.target.value)}
                placeholder="Nome do veículo..."
                className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none transition-all placeholder:text-[#414755]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">Combustível</label>
              <select value={filters.fuel} onChange={(e) => set("fuel")(e.target.value)}
                className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none transition-all">
                <option value="">Todos</option>
                {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">Câmbio</label>
              <select value={filters.transmission} onChange={(e) => set("transmission")(e.target.value)}
                className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none transition-all">
                <option value="">Todos</option>
                {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">A partir de</label>
              <select value={filters.precoMin} onChange={(e) => set("precoMin")(e.target.value)}
                className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none transition-all">
                <option value="">Sem mínimo</option>
                <option value="50000">R$ 50.000</option>
                <option value="100000">R$ 100.000</option>
                <option value="200000">R$ 200.000</option>
                <option value="500000">R$ 500.000</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">Até</label>
              <select value={filters.precoMax} onChange={(e) => set("precoMax")(e.target.value)}
                className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none transition-all">
                <option value="">Qualquer valor</option>
                <option value="100000">R$ 100.000</option>
                <option value="300000">R$ 300.000</option>
                <option value="500000">R$ 500.000</option>
                <option value="1000000">R$ 1.000.000</option>
              </select>
            </div>
          </div>
          {hasFilters && (
            <div className="mt-3 flex justify-end">
              <button onClick={() => setFilters({ fuel: "", transmission: "", precoMin: "", precoMax: "", search: "" })}
                className="text-xs text-[#0077FF] hover:text-white transition-colors font-inter">
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-[#1c2026]" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-4 bg-[#2A3038] rounded w-2/3" />
                  <div className="h-3 bg-[#2A3038] rounded w-1/3" />
                  <div className="h-10 bg-[#2A3038] rounded-lg mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="glass-card rounded-2xl p-16 text-center">
            <p className="font-rajdhani font-bold text-xl text-white mb-2">
              {hasFilters ? "Nenhum veículo com esses filtros" : "Nenhum veículo disponível"}
            </p>
            <p className="text-sm text-[#8b90a1] font-inter mb-4">
              {hasFilters ? "Tente outros filtros." : "Em breve novos veículos estarão disponíveis."}
            </p>
            {hasFilters && (
              <button onClick={() => setFilters({ fuel: "", transmission: "", precoMin: "", precoMax: "", search: "" })}
                className="btn-primary px-5 py-2.5 rounded-xl text-sm">
                Ver todos
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <div key={car.id} className="glass-card rounded-2xl overflow-hidden glow-hover group flex flex-col">
                <Link href={`/cars/${car.id}`} className="block relative h-64 overflow-hidden bg-[#1c2026]">
                  {car.images[0] ? (
                    <Image src={car.images[0]} alt={car.name} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#414755]">
                      <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] via-transparent to-transparent" />
                  {car.badge && (
                    <span className="absolute top-3 left-3 bg-[#0077FF] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,119,255,0.5)]">
                      {car.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {car.images.length > 1 && (
                      <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-inter">
                        {car.images.length} fotos
                      </span>
                    )}
                    {car.instagramUrl && (
                      <a
                        href={car.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-pink-500/80 transition-colors"
                        title="Ver no Instagram"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <circle cx="12" cy="12" r="4"/>
                          <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-rajdhani font-bold text-lg text-white leading-tight">{car.name}</h3>
                      <p className="text-xs text-[#8b90a1] font-inter">{car.year}{car.km ? ` · ${car.km}` : ""}</p>
                    </div>
                    <p className="font-rajdhani font-bold text-lg text-[#0077FF] ml-2 whitespace-nowrap">{car.price}</p>
                  </div>
                  {(car.transmission || car.power) && (
                    <div className="flex gap-2 mb-3">
                      {car.transmission && (
                        <span className="bg-[#2A3038] rounded-md px-2 py-1 text-xs font-inter text-[#c1c6d7]">⚙️ {car.transmission}</span>
                      )}
                      {car.power && (
                        <span className="bg-[#2A3038] rounded-md px-2 py-1 text-xs font-inter text-[#c1c6d7]">⚡ {car.power}</span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 mt-auto">
                    <a href={`https://wa.me/5592982291000?text=${encodeURIComponent(`Olá! Tenho interesse no ${car.name} ${car.year} (${car.price}).`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 btn-primary py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 font-semibold">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Tenho Interesse
                    </a>
                    <a href={`https://wa.me/5592982291000?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o ${car.name} ${car.year}.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-ghost py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      Agendar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
