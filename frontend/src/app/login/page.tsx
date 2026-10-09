"use client";

import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mono_user", JSON.stringify({ name: "Avery Morgan", email }));
    router.push("/account");
  };

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] flex">
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 bg-black/50 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-dark)] opacity-40"></div>
        <img src="/products/axis-mechanical-keyboard.png" className="w-[150%] max-w-none opacity-20 -rotate-12 absolute" alt="Decorative keyboard" />
        <div className="relative z-10 text-center px-12">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">LOCAL DEMO DATA</h2>
          <h1 className="text-5xl font-bold text-white mb-6">Welcome back to your element.</h1>
          <p className="text-[var(--text-muted)] text-lg">A place for your essentials, your orders, and whatever comes next.</p>
        </div>
      </div>
      
      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Log in</h2>
            <p className="text-[var(--text-muted)] text-sm">Enter your email and password to access your account.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Email address</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="avery.morgan@example.com" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-[var(--text-muted)]">Password</label>
                <Link href="#" className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">Forgot password?</Link>
              </div>
              <input type="password" required className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-primary w-full flex justify-center py-3 rounded-xl mt-4">
              Sign in
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-[var(--text-muted)]">
            Don't have an account? <Link href="/register" className="text-white hover:underline">Create one</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
