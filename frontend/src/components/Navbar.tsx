"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}#catalog`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-auto bg-[var(--bg-dark)]/80 backdrop-blur-lg border-b border-[var(--border-glass)]">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-3 h-3 bg-[var(--accent)] group-hover:bg-[var(--accent-light)] transition-colors rounded-sm"></div>
          <span className="font-semibold text-xl tracking-tight text-[var(--text-primary)]">MONO</span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Home</Link>
        <Link href="/products" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Products</Link>
        <Link href="/categories" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Categories</Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        
        <form onSubmit={handleSearch} className="relative hidden lg:block group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" />
          <input 
            type="text" 
            placeholder="Find your essentials"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-full py-1.5 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all w-64"
          />
        </form>

        <div className="flex items-center gap-5">
          <Link href="/account" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            Account
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            Cart / {itemCount}
          </button>
        </div>
      </div>
    </nav>
  );
}
