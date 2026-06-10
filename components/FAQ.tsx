"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Vocês aceitam troca de veículo?",
    a: "Sim! Aceitamos seu veículo como parte do pagamento. Nossa equipe faz uma avaliação gratuita e apresenta uma proposta justa. Entre em contato pelo WhatsApp para agendar sua avaliação.",
  },
  {
    q: "Os veículos têm laudo técnico?",
    a: "Todos os veículos do nosso catálogo passam por inspeção técnica completa de 200 pontos antes de serem anunciados. O laudo fica disponível para o comprador durante a negociação.",
  },
  {
    q: "Vocês fazem financiamento?",
    a: "Sim, trabalhamos com os principais bancos e financeiras do mercado. Conseguimos as melhores taxas para o seu perfil. Simule pelo WhatsApp e receba uma proposta em minutos.",
  },
  {
    q: "Como funciona a venda do meu carro?",
    a: "É simples: você nos envia as informações e fotos pelo WhatsApp, nossa equipe avalia gratuitamente em até 24h e te apresenta uma proposta. Se aceitar, cuidamos de toda a documentação.",
  },
  {
    q: "Posso agendar uma visita para ver o veículo pessoalmente?",
    a: "Claro! Atendemos com hora marcada para garantir um atendimento personalizado e sem pressa. Basta entrar em contato pelo WhatsApp e agendar o melhor horário para você.",
  },
  {
    q: "Os veículos têm garantia?",
    a: "Sim. Oferecemos garantia nos veículos comercializados. Os detalhes variam por modelo — pergunte ao nosso consultor sobre a cobertura específica do veículo de seu interesse.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-[#0D1117]">

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <span className="blue-line mb-4 block" />
            <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
              FAQ
            </p>
            <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">
              Perguntas frequentes
            </h2>
            <p className="font-inter text-sm text-[#8b90a1] leading-relaxed mb-6">
              Não encontrou o que procura? Fale diretamente com um consultor.
            </p>
            <a
              href="https://wa.me/5592982291000?text=Olá! Tenho uma dúvida sobre a 4forBros."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary px-5 py-3 rounded-xl text-sm font-semibold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Tirar dúvida
            </a>
          </div>

          {/* Right: acordeão */}
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-xl border border-white/5 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-inter font-semibold text-sm text-white">
                    {faq.q}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className={`flex-shrink-0 text-[#0077FF] transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    open === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-4 font-inter text-sm text-[#8b90a1] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
