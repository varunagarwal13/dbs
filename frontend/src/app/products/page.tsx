"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts(searchTerm);
        setProducts(data);
      } catch (err) {
        console.error("Backend unreachable");
      }
    }
    load();
  }, [searchTerm]);


  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="mb-8">
            <h1 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">THE COLLECTION</h1>
            <h2 className="text-3xl font-bold text-white mb-2">Tools for a better everyday.</h2>
            <p className="text-sm text-[var(--text-muted)]">Nine considered essentials. One beautifully functional workspace.</p>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl sticky top-32">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white">Filters</h3>
              <button className="text-xs text-[var(--text-muted)] hover:text-white">Reset</button>
            </div>
            <div className="mb-6">
              <label className="text-xs font-semibold text-[var(--text-muted)] block mb-3">Category</label>
              <div className="space-y-3">
                {['All products', 'Keyboards', 'Mice & accessories', 'Lighting', 'Desk essentials'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 text-sm text-[var(--text-primary)] cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-[var(--accent)]" defaultChecked={cat === 'All products'} />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-muted)]">Showing all {products.length} products</span>
              <span className="bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-2 py-0.5 rounded-sm">In stock</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Link href={`/products/${p.id}`} key={p.id} className="glass-panel rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-1 transition-transform">
                <div className="aspect-[4/3] bg-black/50 overflow-hidden p-6 flex items-center justify-center">
                  <img src={`/products/${p.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}.png`} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1 truncate">{p.brand}</div>
                  <h3 className="text-sm font-bold text-white mb-1 truncate" title={p.name}>{p.name}</h3>
                  <div className="text-xs text-[var(--text-muted)] mb-4 truncate">{p.description || "Premium hardware"}</div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border-glass)]">
                    <span className="text-white font-medium">${p.price.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] group-hover:text-white transition-colors">View product ↗</span>
                  </div>
                </div>
              </Link>
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-12 text-center text-[var(--text-muted)]">No products found.</div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-white">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
