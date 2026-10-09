import Link from "next/link";
import { User, Package, LogOut } from "lucide-react";

export function AccountLayout({ children, activeTab }: { children: React.ReactNode, activeTab: 'orders' | 'profile' }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
              AM
            </div>
            <div>
              <div className="text-sm font-bold text-white">Avery Morgan</div>
              <div className="text-[10px] text-[var(--text-muted)]">Your MONO account</div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link href="/account/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'orders' ? 'bg-[var(--success)]/10 text-[var(--success)] font-medium border border-[var(--success)]/20' : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'}`}>
              <Package size={16} /> My orders
            </Link>
            <Link href="/account" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'profile' ? 'bg-[var(--success)]/10 text-[var(--success)] font-medium border border-[var(--success)]/20' : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'}`}>
              <User size={16} /> Customer profile
            </Link>
          </nav>

          <div className="mt-12 pt-6 border-t border-[var(--border-glass)]">
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors">
              <LogOut size={16} /> Sign out
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
