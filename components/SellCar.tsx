"use client";
import { useState } from "react";

export default function SellCar() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", modelo: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero vender meu carro.\n\nNome: ${form.nome}\nModelo: ${form.modelo}\nMensagem: ${form.mensagem}`
    );
    window.open(`https://wa.me/5592982291000?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section className="py-20 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0077FF]/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <span className="blue-line mb-4 block" />
            <p className="text-xs font-inter font-semibold uppercase tracking-widest text-[#0077FF] mb-2">
              Venda seu carro
            </p>
            <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Quer vender <span className="text-[#0077FF]">seu carro?</span>
            </h2>
            <p className="font-inter text-[#8b90a1] leading-relaxed mb-8">
              Avaliação gratuita, processo ágil e pagamento seguro. Nossa equipe
              cuida de toda a burocracia para você.
            </p>
            <div className="flex flex-col gap-3">
              {["Avaliação gratuita em 24h", "Pagamento à vista ou parcelado", "Sem burocracia"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0077FF]/10 border border-[#0077FF]/30 flex items-center justify-center">
                    <svg width="10" height="10" fill="none" stroke="#0077FF" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="font-inter text-sm text-[#dfe2eb]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-card rounded-2xl p-8 shadow-[0_0_40px_rgba(0,119,255,0.08)]">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#0077FF]/10 border border-[#0077FF]/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,119,255,0.3)]">
                  <svg width="28" height="28" fill="none" stroke="#0077FF" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">Mensagem enviada!</h3>
                <p className="font-inter text-sm text-[#8b90a1]">
                  Redirecionamos para o WhatsApp. Em breve nossa equipe entrará em contato.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">Deixe seus dados</h3>
                {[
                  { key: "nome", label: "Seu nome", placeholder: "Ex: João Silva", type: "text" },
                  { key: "whatsapp", label: "WhatsApp", placeholder: "(11) 99999-9999", type: "tel" },
                  { key: "modelo", label: "Modelo do carro", placeholder: "Ex: BMW M3 2019", type: "text" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-4 py-3 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all placeholder:text-[#414755]"
                      required
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    placeholder="Informações adicionais sobre o veículo..."
                    rows={3}
                    className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-4 py-3 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all placeholder:text-[#414755] resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 mt-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar pelo WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
