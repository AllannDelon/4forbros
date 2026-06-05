"use client";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cars/1.jpg"
          alt="Hero BMW M3"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
        {/* Blue glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#0077FF]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
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
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all"
                >
                  <option value="">Todos os tipos</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="coupe">Coupé</option>
                  <option value="esportivo">Esportivo</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">Marca</label>
                <select
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all"
                >
                  <option value="">Todas as marcas</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="porsche">Porsche</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">A partir de</label>
                <select
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                  className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all"
                >
                  <option value="">Sem mínimo</option>
                  <option value="50000">R$ 50.000</option>
                  <option value="100000">R$ 100.000</option>
                  <option value="200000">R$ 200.000</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1]">Até</label>
                <select
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-3 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all"
                >
                  <option value="">Qualquer valor</option>
                  <option value="100000">R$ 100.000</option>
                  <option value="300000">R$ 300.000</option>
                  <option value="500000">R$ 500.000</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 btn-primary py-3 rounded-lg text-sm flex items-center justify-center gap-2">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
                Buscar Veículos
              </button>
              <button className="btn-ghost px-5 py-3 rounded-lg text-sm">
                Ver todos
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[["500+", "Veículos"], ["98%", "Satisfação"], ["15+", "Anos no mercado"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-rajdhani font-bold text-2xl text-white">{n}</p>
                <p className="text-xs text-[#8b90a1] font-inter">{l}</p>
              </div>
            ))}
          </div>
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
