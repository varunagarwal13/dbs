"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Check, Shield } from "lucide-react";
import React from "react";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem, itemCount } = useCart();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        const p = data.find(x => x.id.toString() === unwrappedParams.id) || data[0];
        setProduct(p);
      } catch (err) {
        console.error("Backend unreachable");
      }
    }
    load();
  }, [unwrappedParams.id]);

  if (!product) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  const imageSlug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

  const handleAdd = async () => {
    setAdding(true);
    await addItem(product, 1);
    setAdding(false);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs text-[var(--text-muted)] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> / 
          <Link href="/products" className="hover:text-white transition-colors">Products</Link> / 
          <span className="text-white">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Gallery */}
          <div className="flex-1">
            <div className="glass-panel rounded-3xl overflow-hidden aspect-video mb-4 p-12 bg-black/50 relative group flex items-center justify-center">
              <div className="absolute top-6 left-6 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white">
                MONO SIGNATURE
              </div>
              <img src={`/products/${imageSlug}.png`} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex gap-4 h-24">
              <div className="w-1/3 glass-panel rounded-xl bg-black/50 overflow-hidden flex items-center justify-center p-2"><img src={`/products/${imageSlug}.png`} className="h-full object-contain" alt="thumbnail 1" /></div>
              <div className="w-1/3 bg-white rounded-xl"></div>
              <div className="w-1/3 glass-panel rounded-xl bg-black/50 overflow-hidden flex items-center justify-center p-2"><img src={`/products/${imageSlug}.png`} className="h-full object-contain opacity-50" alt="thumbnail 3" /></div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">Shown in Graphite · Designed to bring quiet precision to your desk.</p>
          </div>

          {/* Details */}
          <div className="w-full lg:w-96 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block mb-4">In stock</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">{product.brand} / {product.name.split(' ')[0]} SERIES</div>
                <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
                <p className="text-sm text-[var(--text-muted)] mb-6">{product.description || "Precision you can feel. A compact aluminum device with beautifully restrained footprint."}</p>
                <div className="text-3xl font-medium text-white mb-8">${product.price.toFixed(2)}</div>
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">AX-75-GR</div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-white mb-3">Finish · Graphite</div>
              <button className="flex items-center gap-2 border border-white/20 rounded-lg p-2 bg-white/5 pr-4">
                <div className="w-4 h-4 bg-[#2A2A2A] rounded-sm border border-white/20"></div>
                <span className="text-sm text-white">Graphite</span>
                <Check size={14} className="text-white ml-2" />
              </button>
            </div>

            <div className="mb-8">
              <div className="text-xs text-[var(--text-muted)] mb-1">Switches</div>
              <div className="text-sm text-white">Quiet tactile · Factory lubricated</div>
            </div>

            <div className="flex items-center gap-4 mb-4 mt-auto">
              <div className="flex items-center border border-white/10 rounded-lg bg-black/40 h-12">
                <button className="px-4 text-[var(--text-muted)] hover:text-white transition-colors">-</button>
                <span className="text-sm text-white w-4 text-center">1</span>
                <button className="px-4 text-[var(--text-muted)] hover:text-white transition-colors">+</button>
              </div>
              <button 
                onClick={handleAdd}
                disabled={adding || product.stock <= 0}
                className="btn-primary flex-1 h-12 flex items-center justify-center font-bold disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add to cart 🛍️"}
              </button>
            </div>
            
            <Link href="/cart" className="text-xs text-[var(--text-muted)] hover:text-white transition-colors flex items-center gap-1 mb-6">
              View your cart - {itemCount} items ↗
            </Link>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-6 border-t border-[var(--border-glass)]">
              <Shield size={14} /> Free shipping · 30-day returns · 1-year warranty
            </div>
          </div>
        </div>

        {/* Lower Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Less noise. More flow.</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">Axis brings the feel of a full-size device to a focused layout. The anodized aluminum body stays grounded, while sound-dampening layers keep each keystroke quietly satisfying.</p>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li className="flex items-start gap-2"><Check size={16} className="text-[var(--text-primary)] shrink-0 mt-0.5" /> A precision-machined aluminum case with a satin finish.</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-[var(--text-primary)] shrink-0 mt-0.5" /> Hot-swappable switches to make the feel your own.</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-[var(--text-primary)] shrink-0 mt-0.5" /> USB-C wired and Bluetooth connectivity for a flexible setup.</li>
            </ul>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">The details</h3>
            <div className="space-y-4 flex-1">
              {[
                { k: "Layout", v: "75% · 84 keys" },
                { k: "Body", v: "Anodized aluminum" },
                { k: "Connection", v: "USB-C / Bluetooth 5.1" },
                { k: "Dimensions", v: "325 x 135 x 32 mm" },
                { k: "Weight", v: "820 g" },
                { k: "Compatibility", v: "macOS / Windows" }
              ].map(d => (
                <div key={d.k} className="flex justify-between items-center text-sm">
                  <span className="text-[var(--text-muted)]">{d.k}</span>
                  <span className="text-white text-right">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
