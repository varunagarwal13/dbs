import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-dark)] pt-32 pb-12 px-8 border-t border-[var(--border-glass)] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-0">
        
        {/* Left: Brand / Copyright */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-2 group">
              <span className="font-semibold text-lg tracking-tight text-[var(--text-primary)]">MONO</span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">Less noise. More possibility.</p>
          </div>
          
          <div className="mt-24 text-xs text-[var(--text-muted)]">
            © 2026 MONO · Demo store · No real payments
          </div>
        </div>
        
        {/* Right: Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-sm">
          <div>
            <div className="text-[var(--text-primary)] mb-6 font-semibold">Explore</div>
            <ul className="space-y-4 text-[var(--text-muted)]">
              <li><Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">All products</Link></li>
              <li><Link href="/categories" className="hover:text-[var(--text-primary)] transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[var(--text-primary)] mb-6 font-semibold">Your space</div>
            <ul className="space-y-4 text-[var(--text-muted)]">
              <li><Link href="/account/orders" className="hover:text-[var(--text-primary)] transition-colors">My orders</Link></li>
              <li><Link href="/account" className="hover:text-[var(--text-primary)] transition-colors">Customer profile</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[var(--text-primary)] mb-6 font-semibold">Shopping</div>
            <ul className="space-y-4 text-[var(--text-muted)]">
              <li><Link href="/cart" className="hover:text-[var(--text-primary)] transition-colors">Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-[var(--text-primary)] transition-colors">Checkout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
