"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function Hero() {
  const [cars, setCars] = useState<Car[]>([]);
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then(setCars)
      .catch(() => {});
  }, []);

  const fuels = Array.from(new Set(cars.map((c) => c.fuel).filter(Boolean)));
  const transmissions = Array.from(new Set(cars.map((c) => c.transmission).filter(Boolean)));
  const spotlightCar = cars.find((c) => c.spotlight) ?? null;
  const bgImage = spotlightCar?.images[0] ?? "/cars/1.jpg";

  const handleSearch = () => {
    window.dispatchEvent(
      new CustomEvent("filterCars", {
        detail: { fuel, transmission, precoMin, precoMax },
      })
    );
    document.getElementById("veiculos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewAll = () => {
    window.dispatchEvent(new CustomEvent("filterCars", { detail: {} }));
    document.getElementById("veiculos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — muda para o carro em destaque */}
      <div className="absolute inset-0 z-0">
        <Image
          key={bgImage}
          src={bgImage}
          alt="Hero background"
          fill
          className="object-cover object-center opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/85 to-[#0D1117]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#0077FF]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 w-full">
        <div className={`grid ${spotlightCar ? "lg:grid-cols-[1fr,420px]" : ""} gap-10 lg:gap-14 items-center`}>

          {/* Left: texto + filtros + stats */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0077FF] shadow-[0_0_6px_#0077FF]" />
              <span className="text-xs font-inter font-semibold uppercase tracking-widest text-[#aec6ff]">
                Premium Auto Catalog
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-rajdhani font-bold text-5xl md:text-7xl text-white leading-[1.05] mb-6">
              Encontre seu próximo{" "}
              <span className="text-[#0077FF] relative">
                veículo
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0077FF] opacity-50 blur-sm" />
              </span>{" "}
              com confiança.
            </h1>

            <p className="font-inter text-lg text-[#8b90a1] mb-10 leading-relaxed max-w-xl">
              Conectamos você aos melhores veículos do mercado. Transparência,
              qualidade e atendimento personalizado em cada negociação.
            </p>

            {/* Search box */}
            <div className="glass-card rounded-xl p-4 md:p-5 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">Combustível</label>
                  <select value={fuel} onChange={(e) => setFuel(e.target.value)}
                    className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all">
                    <option value="">Todos</option>
                    {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">Câmbio</label>
                  <select value={transmission} onChange={(e) => setTransmission(e.target.value)}
                    className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all">
                    <option value="">Todos</option>
                    {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">A partir de</label>
                  <select value={precoMin} onChange={(e) => setPrecoMin(e.target.value)}
                    className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all">
                    <option value="">Sem mínimo</option>
                    <option value="50000">R$ 50.000</option>
                    <option value="100000">R$ 100.000</option>
                    <option value="200000">R$ 200.000</option>
                    <option value="500000">R$ 500.000</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">Até</label>
                  <select value={precoMax} onChange={(e) => setPrecoMax(e.target.value)}
                    className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all">
                    <option value="">Qualquer valor</option>
                    <option value="100000">R$ 100.000</option>
                    <option value="300000">R$ 300.000</option>
                    <option value="500000">R$ 500.000</option>
                    <option value="1000000">R$ 1.000.000</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSearch} className="flex-1 btn-primary py-3 rounded-lg text-sm flex items-center justify-center gap-2">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  Buscar Veículos
                </button>
                <button onClick={handleViewAll} className="btn-ghost px-5 py-3 rounded-lg text-sm">
                  Ver todos
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <p className="font-rajdhani font-bold text-2xl text-white">{cars.length > 0 ? cars.length : "—"}</p>
                <p className="text-xs text-[#8b90a1] font-inter">Disponíveis</p>
              </div>
              <div>
                <p className="font-rajdhani font-bold text-2xl text-white">500+</p>
                <p className="text-xs text-[#8b90a1] font-inter">Vendidos</p>
              </div>
              <div>
                <p className="font-rajdhani font-bold text-2xl text-white">4+</p>
                <p className="text-xs text-[#8b90a1] font-inter">Anos no mercado</p>
              </div>
            </div>
          </div>

          {/* Right: spotlight card — aparece em mobile e desktop */}
          {spotlightCar && (
            <div className="flex flex-col mt-8 lg:mt-0">
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077FF" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0077FF] font-inter">
                  Destaque da semana
                </span>
              </div>

              {/* Card com imagem grande e overlay */}
              <Link
                href={`/cars/${spotlightCar.id}`}
                className="block rounded-2xl overflow-hidden group relative border border-white/10 hover:border-[#0077FF]/40 transition-all duration-300"
              >
                {/* Imagem principal — grande */}
                <div className="relative h-72 sm:h-80 lg:h-[420px] bg-[#1c2026]">
                  {spotlightCar.images[0] ? (
                    <Image
                      src={spotlightCar.images[0]}
                      alt={spotlightCar.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#414755]">
                      <svg width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" />
                      </svg>
                    </div>
                  )}

                  {/* Gradiente de baixo para cima */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badge no topo */}
                  {spotlightCar.badge && (
                    <span className="absolute top-4 left-4 bg-[#0077FF] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,119,255,0.5)]">
                      {spotlightCar.badge}
                    </span>
                  )}

                  {/* Info em overlay na parte inferior */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-rajdhani font-bold text-2xl lg:text-3xl text-white leading-tight mb-0.5">
                      {spotlightCar.name}
                    </h3>
                    <p className="text-sm text-[#aeb3c0] font-inter mb-4">
                      {spotlightCar.year}
                      {spotlightCar.km ? ` · ${spotlightCar.km}` : ""}
                      {spotlightCar.transmission ? ` · ${spotlightCar.transmission}` : ""}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-rajdhani font-bold text-3xl text-[#0077FF]">
                        {spotlightCar.price}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm bg-[#0077FF] text-white px-4 py-2.5 rounded-xl font-inter font-semibold group-hover:shadow-[0_0_20px_rgba(0,119,255,0.5)] transition-shadow whitespace-nowrap">
                        Ver detalhes
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-xs text-[#8b90a1] font-inter">Scroll</p>
        <svg width="16" height="16" fill="none" stroke="#0077FF" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
