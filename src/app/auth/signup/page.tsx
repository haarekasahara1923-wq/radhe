"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Smartphone, MessageCircle, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name:     "",
    contact:  "",
    whatsapp: "",
    email:    "",
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name.trim() || !formData.contact.trim()) {
      setError("Naam aur Mobile Number zaroori hai.");
      setLoading(false);
      return;
    }

    if (!navigator.onLine) {
      setError("Aap offline hain. Naya account banane ke liye internet zaroori hai.");
      setLoading(false);
      return;
    }


    if (formData.contact.replace(/\D/g, '').length < 10) {
      setError("10-digit sahi Mobile Number daalo.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     formData.name.trim(),
          contact:  formData.contact.trim(),
          whatsapp: formData.whatsapp.trim() || null,
          email:    formData.email.trim()    || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      router.push("/auth/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kuch problem aayi. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-zinc-50 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full -translate-y-1/2 -translate-x-1/2 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-50 rounded-full translate-y-1/2 translate-x-1/2 opacity-60 blur-2xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-[40px] shadow-2xl relative z-10 border border-zinc-100">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-300/50">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-5 text-3xl font-black text-zinc-900 tracking-tight">
            Account Banayein 🎉
          </h2>
          <p className="mt-2 text-sm text-zinc-500 font-medium">
            Emax mein join karein — sirf naam aur mobile number chahiye!
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 flex items-start gap-3">
            <ShieldCheck className="shrink-0 mt-0.5" size={18} />
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name — required */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-2">
              Aapka Naam <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={17} className="text-zinc-400" />
              </div>
              <input
                required
                type="text"
                id="signup-name"
                placeholder="Poora naam likhein"
                className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-orange-100 outline-none transition-all text-zinc-800 font-medium"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          </div>

          {/* Mobile — required */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-2">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Smartphone size={17} className="text-zinc-400" />
              </div>
              <input
                required
                type="tel"
                id="signup-mobile"
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-orange-100 outline-none transition-all text-zinc-800 font-medium tracking-widest"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          {/* WhatsApp — optional */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-2">
              WhatsApp Number{" "}
              <span className="normal-case font-medium text-zinc-300">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MessageCircle size={17} className="text-zinc-400" />
              </div>
              <input
                type="tel"
                id="signup-whatsapp"
                placeholder="WhatsApp number (agar alag hai)"
                maxLength={10}
                className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-orange-100 outline-none transition-all text-zinc-800 font-medium tracking-widest"
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          {/* Email — optional */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-2">
              Email Address{" "}
              <span className="normal-case font-medium text-zinc-300">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={17} className="text-zinc-400" />
              </div>
              <input
                type="email"
                id="signup-email"
                placeholder="name@email.com (zaroori nahi)"
                className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-orange-100 outline-none transition-all text-zinc-800 font-medium"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          {/* Info box */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 text-xs text-orange-700 font-medium">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 size={14} className="text-orange-500" />
              <span className="font-black">Sign In kaise hoga?</span>
            </div>
            <p>Aapka <strong>Naam</strong> + <strong>Mobile Number</strong> hi aapki identity hai — koi password yaad rakhne ki zaroorat nahi!</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-orange-500/20 text-lg font-black text-white bg-brand-primary hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Account ban raha hai...
              </span>
            ) : (
              <>Account Banayein <ArrowRight size={20} /></>
            )}
          </button>

          <p className="text-center text-sm text-zinc-500 font-medium">
            Pehle se account hai?{" "}
            <Link href="/auth/login" className="font-bold text-brand-primary hover:underline">
              Sign In karein
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
