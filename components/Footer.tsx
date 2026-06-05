export default function Footer() {
  return (
    <footer className="bg-[#0a0e14] border-t border-white/5 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-rajdhani font-bold text-2xl text-white">
              4for<span className="text-[#0077FF]">Bros</span>
            </span>
            <p className="mt-3 font-inter text-sm text-[#8b90a1] leading-relaxed max-w-xs">
              A melhor plataforma para comprar e vender veículos premium com
              total transparência e confiança.
            </p>
            <div className="flex gap-3 mt-5">
              {/* Social icons */}
              {[
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 glass-card rounded-lg flex items-center justify-center hover:border-[#0077FF]/40 hover:text-[#0077FF] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#8b90a1] hover:text-[#0077FF]">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="flex flex-col gap-3">
              {["Veículos", "Sobre nós", "Contato", "Vender meu carro"].map((l) => (
                <li key={l}>
                  <a href="#" className="font-inter text-sm text-[#8b90a1] hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white uppercase tracking-wider mb-4">Contato</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-[#8b90a1] font-inter">
                <svg width="14" height="14" fill="none" stroke="#0077FF" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-2 text-sm text-[#8b90a1] font-inter">
                <svg width="14" height="14" fill="none" stroke="#0077FF" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                contato@4forbros.com.br
              </li>
              <li className="flex items-start gap-2 text-sm text-[#8b90a1] font-inter">
                <svg width="14" height="14" fill="none" stroke="#0077FF" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-[#414755]">
            © {new Date().getFullYear()} 4forBros. Todos os direitos reservados.
          </p>
          <p className="font-inter text-xs text-[#414755]">
            Feito com ♥ para amantes de carros
          </p>
        </div>
      </div>
    </footer>
  );
}
