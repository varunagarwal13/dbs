"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import { ArrowRight, Box, RefreshCw, Shield } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Backend unreachable");
      }
    }
    load();
  }, []);

  const featured = products[0] || null;

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-0">
      
      {/* Hero Section */}
      <section className="px-8 py-20 flex flex-col items-center text-center">
        <div className="pill-badge bg-white/5 border border-white/10 text-gray-400 mb-8">
          THE WORKSPACE COLLECTION / 2026
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[var(--text-primary)] mb-6 max-w-4xl">
          A better space.<br />A clearer mind.
        </h1>
        <p className="text-[var(--text-muted)] max-w-xl text-lg mb-10">
          Considered tools for the way you work. Discover beautifully made electronics and everyday desk essentials.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/products" className="btn-primary flex items-center gap-2">
            Explore products <ArrowRight size={16} />
          </Link>
          <Link href="/categories" className="btn-secondary">
            Browse categories
          </Link>
        </div>
      </section>

      {/* Featured Hero Product */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden glass-panel group block">
          {/* Placeholder for the big desk image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
          <img src="/products/home1-hero.jpg" alt="A better space hero" className="w-full h-full object-cover opacity-50" />
          
          <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end bg-black/40 p-6 rounded-2xl backdrop-blur-md border border-white/10">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">MEET YOUR NEW DAILY DRIVER</div>
              <h2 className="text-2xl font-bold text-white">{featured?.name || "Axis Mechanical Keyboard"}</h2>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xl font-medium text-white">${featured?.price.toFixed(2) || "189.00"}</span>
              <Link href={`/products/${featured?.id || "1"}`} className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                Discover Axis <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Essentials */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-semibold">CURATED ESSENTIALS</div>
            <h2 className="text-4xl font-bold text-white mb-2">The everyday, elevated.</h2>
            <p className="text-[var(--text-muted)]">Purpose-built pieces. Nothing you don't need.</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            Shop all products <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p, i) => {
            return (
              <div key={p.id} className="glass-panel rounded-2xl overflow-hidden group flex flex-col">
                <div className="aspect-[4/3] bg-black/50 overflow-hidden p-6 flex items-center justify-center">
                  <img src={`/products/${p.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}.png`} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1 truncate">{p.brand}</div>
                  <h3 className="text-lg font-bold text-white mb-1 truncate" title={p.name}>{p.name}</h3>
                  <div className="flex justify-between items-center mt-auto pt-4">
                    <span className="text-white font-medium">${p.price.toFixed(2)}</span>
                    <Link href={`/products/${p.id}`} className="text-xs text-[var(--text-muted)] group-hover:text-white transition-colors flex items-center gap-1">
                      View product <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold text-white">Find your focus.</h2>
          <Link href="/categories" className="text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors flex items-center gap-2">
            Explore categories <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Keyboards", icon: "⌨️", desc: "Feel every idea." },
            { name: "Mice & accessories", icon: "🖱️", desc: "Make every move count." },
            { name: "Lighting", icon: "💡", desc: "Set the right mood." },
            { name: "Desk essentials", icon: "🖥️", desc: "Give focus a home." }
          ].map((cat) => (
            <Link href="/categories" key={cat.name} className="glass-panel p-6 rounded-2xl group block hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-8">{cat.icon}</div>
              <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-sm text-[var(--text-muted)]">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Block */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="glass-panel p-2 rounded-3xl flex flex-col md:flex-row gap-8 items-center overflow-hidden">
          <div className="w-full md:w-1/2 aspect-video bg-black/50 rounded-2xl overflow-hidden">
             <img src="/products/axis-mechanical-keyboard.png" alt="Keyboard macro" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="w-full md:w-1/2 p-8 lg:p-12">
            <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">THE MONO APPROACH</div>
            <h2 className="text-4xl font-bold text-white mb-6">Good design gets<br/>out of your way.</h2>
            <p className="text-[var(--text-muted)] mb-8 max-w-md leading-relaxed">
              We believe your workspace should make room for what matters. So we select tools with honest materials, intuitive details, and a purpose that lasts beyond the first impression.
            </p>
            <Link href="/products" className="text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2">
              Find your essentials <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-t border-[var(--border-glass)] py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex gap-4">
            <Box className="text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold mb-2">Considered delivery</h4>
              <p className="text-sm text-[var(--text-muted)]">Free standard shipping on orders $150+. Packed with care, without the excess.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <RefreshCw className="text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold mb-2">Room to decide</h4>
              <p className="text-sm text-[var(--text-muted)]">A simple 30-day return window. Make sure each piece feels right in your space.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Shield className="text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold mb-2">Built for daily life</h4>
              <p className="text-sm text-[var(--text-muted)]">A one-year limited warranty on electronics. Quality you can count on.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
