"use client";

import { signIn, getSession, useSession } from "next-auth/react";
import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Smartphone, User, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const registered   = searchParams.get("registered");
  const { data: session, status } = useSession();

  const [name,    setName]    = useState("");
  const [contact, setContact] = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated (handles cached sessions offline)
  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name.trim() || !contact.trim()) {
      setError("Naam aur Mobile Number daalna zaroori hai.");
      setLoading(false);
      return;
    }

    if (!navigator.onLine) {
      setError("Aap offline hain. Pehli baar login karne ke liye internet zaroori hai.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        name:    name.trim(),
        contact: contact.trim(),
      });

      if (res?.error) {
        setError("Naam ya Mobile Number galat hai. Dobara check karein.");
      } else {
        // Use a more robust check after login
        try {
          const sessionData = await getSession();
          if (sessionData?.user?.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } catch {
          // If getSession fails but signIn didn't, we probably have a session cookie
          router.push("/");
        }
        router.refresh();
      }
    } catch {
      setError("Kuch problem aayi. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-zinc-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60 blur-2xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[40px] shadow-2xl relative z-10 border border-zinc-100">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-300/50">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-black text-zinc-900 tracking-tight">
            Welcome Back! 👋
          </h2>
          <p className="mt-2 text-sm text-zinc-500 font-medium">
            Apna naam aur mobile number se sign in karein
          </p>
        </div>

        {/* Success banner */}
        {registered && (
          <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-medium border border-green-200 flex items-start gap-3">
            <CheckCircle2 className="shrink-0 mt-0.5 text-green-500" size={18} />
            <p>Registration successful! Ab Sign In karein.</p>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 flex items-start gap-3">
            <ShieldAlert className="shrink-0 mt-0.5" size={18} />
            <p>{error}</p>
          </div>
        )}

        <form className="mt-2 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Name field */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-2">
                Aapka Naam
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-zinc-400" />
                </div>
                <input
                  required
                  type="text"
                  id="login-name"
                  placeholder="Apna poora naam likhein"
                  className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-orange-100 outline-none transition-all text-zinc-800 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile field */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Smartphone size={18} className="text-zinc-400" />
                </div>
                <input
                  required
                  type="tel"
                  id="login-mobile"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-orange-100 outline-none transition-all text-zinc-800 font-medium tracking-widest"
                  value={contact}
                  onChange={(e) => setContact(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 text-xs text-orange-700 font-medium flex gap-2">
            <span>💡</span>
            <span>Sign up ke waqt diya hua naam aur mobile number use karein.</span>
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
                Sign In ho raha hai...
              </span>
            ) : (
              <>Sign In <ArrowRight size={20} /></>
            )}
          </button>

          <p className="text-center text-sm text-zinc-500 font-medium">
            Pehli baar aa rahe hain?{" "}
            <Link href="/auth/signup" className="font-bold text-brand-primary hover:underline">
              Account banayein
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
