"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { name: "Keyboards", icon: "⌨️", desc: "Feel every idea.", slug: "keyboards", img: "axis-mechanical-keyboard" },
    { name: "Mice & accessories", icon: "🖱️", desc: "Make every move count.", slug: "mice", img: "arc-wireless-mouse" },
    { name: "Lighting", icon: "💡", desc: "Set the right mood.", slug: "lighting", img: "halo-desk-light" },
    { name: "Desk essentials", icon: "🖥️", desc: "Give focus a home.", slug: "essentials", img: "rise-laptop-stand" }
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">CATEGORIES</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">A place for every possibility.</h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto">Build your workspace one considered piece at a time.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <Link href="/products" key={cat.slug} className="glass-panel p-8 rounded-3xl group block hover:-translate-y-1 transition-transform relative overflow-hidden h-[400px]">
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-30 group-hover:opacity-60 transition-opacity">
              <img src={`/products/${cat.img}.png`} alt={cat.name} className="w-full h-full object-contain" />
            </div>
            <div className="relative z-10">
              <div className="text-4xl mb-8">{cat.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-[var(--text-muted)] mb-8">{cat.desc}</p>
              <div className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                Explore {cat.name} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
