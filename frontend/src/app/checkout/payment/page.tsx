"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkout } from "@/lib/api";

export default function PaymentPage() {
  const { cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const result = await checkout();
      clearCart();
      router.push(`/checkout/confirmation?order_id=${result.order_id}`);
    } catch (e: any) {
      alert(e.message || "Checkout failed");
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-12 border-b border-[var(--border-glass)] pb-6">
          <span>01 / Cart</span> <span className="opacity-50">—</span>
          <span>02 / Checkout</span> <span className="opacity-50">—</span>
          <span className="text-[var(--text-primary)]">03 / Demo payment</span> <span className="opacity-50">—</span>
          <span>04 / Confirmation</span>
        </div>

        <div className="mb-12 flex justify-between items-start">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">DEMO PAYMENT</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">A payment. Not a charge.</h1>
            <p className="text-[var(--text-muted)]">Complete your order using our simulated payment environment.</p>
          </div>
          <div className="border border-[var(--success)] text-[var(--success)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Simulation Only
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            
            <div className="bg-[#1A2E20] border border-[#2B4E38] p-6 rounded-2xl flex items-start gap-4">
              <CheckCircle2 size={20} className="text-[#3E8B5A] mt-1 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#E8F3EB] mb-1">No real payment is processed.</h4>
                <p className="text-xs text-[#9CBDA7]">This is a demonstration. No money will be charged, no bank is contacted, and no real card or sensitive payment information is needed.</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-6">Simulated payment method</h2>
              
              <div className="border border-[var(--success)] bg-[#1A2E20] p-6 rounded-xl flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/10 text-white font-bold text-xl">M</div>
                  <div>
                    <div className="text-sm font-bold text-white">MONO Test Wallet</div>
                    <div className="text-xs text-[#9CBDA7]">A fictional method for demo transactions only</div>
                  </div>
                </div>
                <CheckCircle2 size={24} className="text-[#3E8B5A]" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Demo reference</label>
                  <input type="text" readOnly value="DEMO-0001" className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white opacity-70" />
                  <p className="text-[10px] text-[var(--text-muted)] mt-2">Pre-filled test identifier. This is not a card or account number.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-2">Simulation result</label>
                  <select className="w-full bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-xl px-4 py-3 text-white focus:outline-none appearance-none">
                    <option>Successful payment</option>
                  </select>
                  <p className="text-[10px] text-[var(--text-muted)] mt-2">This example demonstrates the successful order flow.</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[var(--border-glass)]">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="text-sm font-bold text-white mb-1">Amount to simulate</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Real amount charged: $0.00</div>
                  </div>
                  <div className="text-2xl font-bold text-white">${(cartTotal * 1.08).toFixed(2)}</div>
                </div>
                <button onClick={handleCheckout} disabled={isProcessing || cartTotal === 0} className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold disabled:opacity-50">
                  {isProcessing ? (
                    <><Loader2 className="animate-spin" size={16} /> Processing...</>
                  ) : (
                    <>Simulate payment & place order <ArrowRight size={16} /></>
                  )}
                </button>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
