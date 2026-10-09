"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mono_user", JSON.stringify({ name: `${firstName} ${lastName}`, email }));
    router.push("/account");
  };

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] flex">
      {/* Left side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">LOCAL DEMO DATA</h2>
            <h2 className="text-3xl font-bold text-white mb-2">Create an account</h2>
            <p className="text-[var(--text-muted)] text-sm">Join to track your orders and checkout faster.</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">First name</label>
                <input type="text" required value={firstName} onChange={e=>setFirstName(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Last name</label>
                <input type="text" required value={lastName} onChange={e=>setLastName(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Email address</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Password</label>
              <input type="password" required className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />
            </div>
            <button type="submit" className="btn-primary w-full flex justify-center py-3 rounded-xl mt-4">
              Create account
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-[var(--text-muted)]">
            Already have an account? <Link href="/login" className="text-white hover:underline">Log in</Link>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex w-1/2 bg-black/50 relative items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-12">
          <h1 className="text-5xl font-bold text-white mb-6">Your next chapter, well equipped.</h1>
          <p className="text-[var(--text-muted)] text-lg">Create an account for a simpler checkout and one considered place for your orders.</p>
        </div>
      </div>
    </main>
  );
}
