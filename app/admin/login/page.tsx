"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0077FF]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="4forBros" width={64} height={64} className="object-contain mb-3" />
          <span className="font-rajdhani font-bold text-3xl text-white">
            4for<span className="text-[#0077FF]">Bros</span>
          </span>
          <p className="text-sm text-[#8b90a1] mt-1 font-inter">Painel Administrativo</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 shadow-[0_0_40px_rgba(0,119,255,0.1)]">
          <h1 className="font-rajdhani font-bold text-2xl text-white mb-6">Entrar</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-4 py-3 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all placeholder:text-[#414755]"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm font-inter">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-3 rounded-lg text-sm flex items-center justify-center gap-2 mt-1 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Entrando...
                </>
              ) : "Entrar"}
            </button>
          </form>
        </div>

        <a href="/" className="flex items-center justify-center gap-1.5 mt-6 text-sm text-[#8b90a1] hover:text-white transition-colors font-inter">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar ao site
        </a>
      </div>
    </div>
  );
}
