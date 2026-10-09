"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-12 border-b border-[var(--border-glass)] pb-6">
          <span>01 / Cart</span> <span className="opacity-50">—</span>
          <span className="text-[var(--text-primary)]">02 / Checkout</span> <span className="opacity-50">—</span>
          <span>03 / Demo payment</span> <span className="opacity-50">—</span>
          <span>04 / Confirmation</span>
        </div>

        <div className="mb-12">
          <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">CHECKOUT</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">The last few details.</h1>
          <div className="flex justify-between items-center">
            <p className="text-[var(--text-muted)]">Check your address. We'll take care of the rest.</p>
            <Link href="/cart" className="glass-panel text-xs text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
              Back to cart
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Contact details</h2>
                <span className="bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-2 py-0.5 rounded-sm">Signed in</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-6">Checking out as Avery Morgan</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Email address</label>
                  <input type="email" defaultValue="avery.morgan@example.com" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Contact phone</label>
                  <input type="text" defaultValue="+1 (202) 555-0147" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-6">Shipping address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">First name</label>
                    <input type="text" defaultValue="Avery" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Last name</label>
                    <input type="text" defaultValue="Morgan" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Street address</label>
                  <input type="text" defaultValue="128 Maple Street" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">City</label>
                    <input type="text" defaultValue="Brooklyn" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Postal code</label>
                    <input type="text" defaultValue="11201" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-6">Shipping method</h2>
              <div className="border border-[var(--success)] bg-[#1A2E20] p-4 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full border-4 border-[#3E8B5A] bg-white"></div>
                  <div>
                    <div className="text-sm font-bold text-white">Standard shipping</div>
                    <div className="text-xs text-[#9CBDA7]">3-5 business days - Carefully packed</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-white">Free</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96">
            <div className="glass-panel p-8 rounded-3xl sticky top-32">
              <h2 className="text-lg font-bold text-white mb-8">Order summary</h2>
              
              <div className="space-y-4 text-sm mb-8 border-b border-[var(--border-glass)] pb-8">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Shipping</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Estimated tax</span>
                  <span className="text-white">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>

              <Link href="/checkout/payment" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 mb-4 font-bold">
                Continue to demo payment <ArrowRight size={16} />
              </Link>

              <div className="bg-[#1A2E20] border border-[#2B4E38] p-4 rounded-xl flex items-start gap-3 mt-8">
                <Shield size={16} className="text-[#3E8B5A] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#E8F3EB] mb-1">A safe simulation.</h4>
                  <p className="text-[10px] text-[#9CBDA7]">The next step uses a dummy payment. Do not enter real card or bank information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
