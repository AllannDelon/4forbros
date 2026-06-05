const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0077FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Procedência Total",
    desc: "Todos os veículos passam por inspeção técnica completa com laudo detalhado de 200 pontos antes de entrar no catálogo.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0077FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Time Exclusivo",
    desc: "Consultores especializados em veículos premium prontos para encontrar a opção perfeita para o seu perfil.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0077FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Atendimento VIP",
    desc: "Do primeiro contato à entrega, você tem um consultor dedicado disponível via WhatsApp 7 dias por semana.",
  },
];

export default function WhyChoose() {
  return (
    <section id="contato" className="py-20 bg-[#0D1117] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0077FF]/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <span className="blue-line mb-4 mx-auto block" />
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
            Diferenciais
          </p>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white">
            Por que escolher a 4forBros?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-8 flex flex-col items-center text-center glow-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0077FF]/10 border border-[#0077FF]/20 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,119,255,0.1)]">
                {f.icon}
              </div>
              <h3 className="font-rajdhani font-bold text-xl text-white mb-3">{f.title}</h3>
              <p className="font-inter text-sm text-[#8b90a1] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
