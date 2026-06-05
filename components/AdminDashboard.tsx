"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Car } from "@/lib/cars";

const EMPTY_CAR = (): Omit<Car, "id"> => ({
  name: "",
  year: new Date().getFullYear(),
  price: "",
  km: "",
  transmission: "Manual",
  fuel: "Gasolina",
  power: "",
  description: "",
  badge: null,
  images: [],
  instagramUrl: "",
});

export default function AdminDashboard({ initialCars }: { initialCars: Car[] }) {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [form, setForm] = useState(EMPTY_CAR());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setForm(EMPTY_CAR());
    setEditingCar(null);
    setModal("add");
  };

  const openEdit = (car: Car) => {
    setEditingCar(car);
    setForm({ ...car });
    setModal("edit");
  };

  const closeModal = () => {
    setModal(null);
    setEditingCar(null);
  };

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const { urls } = await res.json();
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
    } else {
      showToast("Erro no upload", "err");
    }
  };

  const removeImage = (url: string) => {
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      showToast("Nome e preço são obrigatórios", "err");
      return;
    }
    setSaving(true);

    if (modal === "add") {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newCar = await res.json();
        setCars((c) => [...c, newCar]);
        showToast("Carro adicionado!");
        closeModal();
      } else {
        showToast("Erro ao salvar", "err");
      }
    } else if (modal === "edit" && editingCar) {
      const res = await fetch(`/api/cars/${editingCar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setCars((c) => c.map((x) => (x.id === editingCar.id ? updated : x)));
        showToast("Carro atualizado!");
        closeModal();
      } else {
        showToast("Erro ao atualizar", "err");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCars((c) => c.filter((x) => x.id !== id));
      setDeleteConfirm(null);
      showToast("Carro removido!");
    } else {
      showToast("Erro ao remover", "err");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl text-sm font-inter font-semibold shadow-lg transition-all ${
          toast.type === "ok"
            ? "bg-[#0077FF] text-white shadow-[0_0_20px_rgba(0,119,255,0.4)]"
            : "bg-red-500 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0a0e14] border-b border-white/5 px-6 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="4forBros" width={32} height={32} className="object-contain" />
          <span className="font-rajdhani font-bold text-xl text-white">
            4for<span className="text-[#0077FF]">Bros</span>
          </span>
          <span className="ml-2 text-xs text-[#8b90a1] font-inter bg-[#1c2026] px-2 py-0.5 rounded-full border border-white/5">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="btn-ghost px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ver site
          </a>
          <button onClick={handleLogout} className="text-xs text-[#8b90a1] hover:text-white font-inter flex items-center gap-1.5 transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sair
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-rajdhani font-bold text-3xl text-white">Catálogo de Veículos</h1>
            <p className="text-sm text-[#8b90a1] font-inter mt-0.5">{cars.length} veículo{cars.length !== 1 ? "s" : ""} cadastrado{cars.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={openAdd} className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
            Novo Veículo
          </button>
        </div>

        {/* Cars grid */}
        {cars.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0077FF]/10 border border-[#0077FF]/20 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" stroke="#0077FF" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="font-rajdhani font-bold text-xl text-white mb-1">Nenhum veículo</p>
            <p className="text-sm text-[#8b90a1] font-inter mb-4">Adicione o primeiro veículo ao catálogo</p>
            <button onClick={openAdd} className="btn-primary px-5 py-2.5 rounded-xl text-sm">Adicionar veículo</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map((car) => (
              <div key={car.id} className="glass-card rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative h-44 bg-[#1c2026]">
                  {car.images[0] ? (
                    <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#414755]">
                      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>
                      </svg>
                    </div>
                  )}
                  {car.badge && (
                    <span className="absolute top-2 left-2 bg-[#0077FF] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {car.badge}
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-inter">
                    {car.images.length} foto{car.images.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-rajdhani font-bold text-lg text-white leading-tight">{car.name}</h3>
                      <p className="text-xs text-[#8b90a1] font-inter">{car.year} · {car.km}</p>
                    </div>
                    <span className="font-rajdhani font-bold text-[#0077FF] text-lg">{car.price}</span>
                  </div>
                  <p className="text-xs text-[#8b90a1] font-inter line-clamp-2 mb-4">{car.description}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(car)}
                      className="flex-1 bg-[#2A3038] hover:bg-[#31353c] text-[#dfe2eb] text-xs font-inter font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(car.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-inter font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-rajdhani font-bold text-xl text-white text-center mb-2">Remover veículo?</h3>
            <p className="text-sm text-[#8b90a1] text-center font-inter mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-[#2A3038] text-[#dfe2eb] text-sm font-inter font-semibold py-2.5 rounded-xl hover:bg-[#31353c] transition-colors">
                Cancelar
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 text-white text-sm font-inter font-semibold py-2.5 rounded-xl hover:bg-red-600 transition-colors">
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center px-4 py-6 overflow-y-auto">
          <div className="glass-card rounded-2xl w-full max-w-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] my-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="font-rajdhani font-bold text-2xl text-white">
                {modal === "add" ? "Novo Veículo" : "Editar Veículo"}
              </h2>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-[#2A3038] hover:bg-[#31353c] flex items-center justify-center transition-colors">
                <svg width="14" height="14" fill="none" stroke="#dfe2eb" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="p-6 flex flex-col gap-5">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nome *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Ex: BMW M3" />
                <Field label="Ano *" type="number" value={String(form.year)} onChange={(v) => setForm((f) => ({ ...f, year: Number(v) }))} placeholder="2019" />
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Preço *" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} placeholder="R$ 249.900" />
                <Field label="Quilometragem" value={form.km} onChange={(v) => setForm((f) => ({ ...f, km: v }))} placeholder="62.000 km" />
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4">
                <SelectField label="Câmbio" value={form.transmission} onChange={(v) => setForm((f) => ({ ...f, transmission: v }))} options={["Manual", "Automático", "CVT", "Tiptronic"]} />
                <SelectField label="Combustível" value={form.fuel} onChange={(v) => setForm((f) => ({ ...f, fuel: v }))} options={["Gasolina", "Flex", "Diesel", "Elétrico", "Híbrido"]} />
                <Field label="Potência" value={form.power} onChange={(v) => setForm((f) => ({ ...f, power: v }))} placeholder="431 cv" />
              </div>
              {/* Badge */}
              <SelectField
                label="Badge"
                value={form.badge || ""}
                onChange={(v) => setForm((f) => ({ ...f, badge: v || null }))}
                options={["", "Destaque", "Novo", "Oferta", "Exclusivo", "Vendido"]}
                placeholder="Sem badge"
              />
              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">Descrição</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Descreva o veículo..."
                  rows={3}
                  className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-4 py-3 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all placeholder:text-[#414755] resize-none"
                />
              </div>

              {/* Instagram URL */}
              <Field
                label="Link do Instagram (opcional)"
                value={form.instagramUrl || ""}
                onChange={(v) => setForm((f) => ({ ...f, instagramUrl: v }))}
                placeholder="https://www.instagram.com/p/..."
              />

              {/* Images */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">
                  Fotos ({form.images.length})
                </label>

                {/* Upload zone */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-[#2A3038] hover:border-[#0077FF]/50 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors group"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin text-[#0077FF]" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      <p className="text-sm text-[#8b90a1] font-inter">Enviando...</p>
                    </>
                  ) : (
                    <>
                      <svg width="24" height="24" fill="none" stroke="#0077FF" strokeWidth="1.5" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm text-[#8b90a1] font-inter">Clique para adicionar fotos</p>
                      <p className="text-xs text-[#414755] font-inter">JPG, PNG, WEBP</p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleUpload(e.target.files)}
                  />
                </div>

                {/* Image thumbnails */}
                {form.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {form.images.map((url, i) => (
                      <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-[#1c2026]">
                        <Image src={url} alt={`foto ${i + 1}`} fill className="object-cover" />
                        <button
                          onClick={() => removeImage(url)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <svg width="20" height="20" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 bg-[#0077FF] text-white text-[10px] px-1.5 py-0.5 rounded font-inter">capa</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-3 pt-2 border-t border-white/5">
                <button onClick={closeModal} className="flex-1 bg-[#2A3038] text-[#dfe2eb] text-sm font-inter font-semibold py-3 rounded-xl hover:bg-[#31353c] transition-colors">
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving} className="flex-1 btn-primary py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Salvando...
                    </>
                  ) : modal === "add" ? "Adicionar Veículo" : "Salvar Alterações"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers
function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-4 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all placeholder:text-[#414755]"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#8b90a1] font-inter">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#2A3038] text-[#dfe2eb] text-sm rounded-lg px-4 py-2.5 border border-white/5 focus:border-[#0077FF] focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,119,255,0.2)] transition-all"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o || "Sem badge"}</option>)}
      </select>
    </div>
  );
}
