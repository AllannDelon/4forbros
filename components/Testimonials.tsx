const testimonials = [
  {
    name: "Ricardo M.",
    role: "Comprou um BMW M3",
    text: "Processo transparente do início ao fim. O consultor me ajudou a encontrar exatamente o carro que eu queria, dentro do orçamento. Recomendo muito!",
    stars: 5,
    avatar: "R",
  },
  {
    name: "Fernanda L.",
    role: "Comprou um Porsche 911",
    text: "Atendimento incrível. Me senti segura em cada etapa da negociação. O laudo técnico me deu total confiança. Melhor experiência de compra de carro que já tive.",
    stars: 5,
    avatar: "F",
  },
  {
    name: "João Silva",
    role: "Vendeu seu carro",
    text: "Vendi meu carro rapidamente e pelo preço justo. Processo descomplicado, comunicação ágil. A equipe cuida de tudo para você.",
    stars: 5,
    avatar: "J",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0a0e14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <span className="blue-line mb-4 mx-auto block" />
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
            Depoimentos
          </p>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white">
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#0077FF">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="font-inter text-sm text-[#c1c6d7] leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-[#0077FF] flex items-center justify-center font-rajdhani font-bold text-white shadow-[0_0_10px_rgba(0,119,255,0.4)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-inter font-semibold text-sm text-white">{t.name}</p>
                  <p className="font-inter text-xs text-[#8b90a1]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
