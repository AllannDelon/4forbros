import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="py-20 bg-[#0a0e14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src="/cars/4.jpg" alt="BMW M3 lateral" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/60 to-transparent" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden mt-8">
                <Image src="/cars/6.jpg" alt="BMW M3 frente" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/60 to-transparent" />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card rounded-2xl px-6 py-4 flex items-center gap-4 shadow-[0_0_30px_rgba(0,119,255,0.15)]">
              <div className="w-10 h-10 rounded-full bg-[#0077FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,119,255,0.5)]">
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-rajdhani font-bold text-lg text-white">+15 Anos</p>
                <p className="text-xs text-[#8b90a1] font-inter">de experiência no mercado</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="pt-8 md:pt-0">
            <span className="blue-line mb-4 block" />
            <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
              Sobre a 4forBros
            </p>
            <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Excelência que{" "}
              <span className="text-[#0077FF]">acelera</span> o seu futuro.
            </h2>
            <p className="font-inter text-[#8b90a1] leading-relaxed mb-6">
              A 4forBros é referência em veículos premium, unindo desempenho,
              estilo e confiança. Nosso catálogo reúne os melhores modelos do
              mercado com histórico completo, laudo técnico e garantia de
              procedência.
            </p>
            <p className="font-inter text-[#8b90a1] leading-relaxed mb-8">
              Atendimento consultivo e transparente — do primeiro contato à
              entrega das chaves, você está em mãos experientes.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3 mb-8">
              {["100% Verificados", "Pronta Entrega", "Financiamento facilitado"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0077FF]/10 border border-[#0077FF]/30 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" fill="none" stroke="#0077FF" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-inter text-sm text-[#dfe2eb]">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/5592982291000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-lg text-sm"
            >
              Falar com especialista
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
