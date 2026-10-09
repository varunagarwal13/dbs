"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Box, ArrowRight, Shield } from "lucide-react";

export default function CartPage() {
  const { items, updateItem, removeItem, cartTotal } = useCart();


  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-12 border-b border-[var(--border-glass)] pb-6">
          <span className="text-[var(--text-primary)]">01 / Cart</span> <span className="opacity-50">—</span>
          <span>02 / Checkout</span> <span className="opacity-50">—</span>
          <span>03 / Demo payment</span> <span className="opacity-50">—</span>
          <span>04 / Confirmation</span>
        </div>

        <div className="mb-12">
          <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">YOUR CART</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your considered selection.</h1>
          <div className="flex justify-between items-center">
            <p className="text-[var(--text-muted)]">{items.length} items. A little less friction in your everyday.</p>
            <Link href="/products" className="glass-panel text-xs text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
              Continue shopping ↗
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-lg font-bold text-white mb-6">Your essentials</h2>
              
              {items.length === 0 ? (
                <div className="py-12 text-center text-[var(--text-muted)] border-t border-[var(--border-glass)]">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map(item => {
                    const imgSlug = item.product.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
                    return (
                      <div key={item.cart_item_id} className="flex gap-6 py-6 border-t border-[var(--border-glass)]">
                        <div className="w-32 h-24 bg-black/50 rounded-xl flex items-center justify-center p-2 shrink-0">
                          <img src={`/products/${imgSlug}.png`} alt={item.product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 flex justify-between">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1">{item.product.brand}</div>
                            <h3 className="text-base font-bold text-white mb-1">{item.product.name}</h3>
                            <div className="text-xs text-[var(--text-muted)] mb-2">Graphite · Standard</div>
                            <div className="text-xs text-[var(--text-muted)]">${item.product.price.toFixed(2)} each</div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <div className="text-lg font-medium text-white">${(item.product.price * item.quantity).toFixed(2)}</div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center border border-[var(--border-glass)] rounded-lg bg-black/40 h-8">
                                <button onClick={() => updateItem(item.cart_item_id, item.quantity - 1)} className="px-3 text-[var(--text-muted)] hover:text-white transition-colors">-</button>
                                <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateItem(item.cart_item_id, item.quantity + 1)} className="px-3 text-[var(--text-muted)] hover:text-white transition-colors">+</button>
                              </div>
                              <button onClick={() => removeItem(item.cart_item_id)} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-[var(--border-glass)] flex justify-between items-center text-xs text-[var(--text-muted)]">
                <span>{items.reduce((acc, curr) => acc + curr.quantity, 0)} products - {items.length} items</span>
                <span>All items in stock</span>
              </div>
            </div>

            {/* Promo */}
            {items.length > 0 && (
              <div className="bg-[#1A2E20] border border-[#2B4E38] p-6 rounded-2xl flex items-start gap-4">
                <Box size={20} className="text-[#3E8B5A] mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-[#E8F3EB] mb-1">Good things, without the extra shipping.</h4>
                  <p className="text-xs text-[#9CBDA7]">Your order qualifies for free standard shipping. No code, no extra steps.</p>
                </div>
              </div>
            )}
            <div className="text-[10px] text-[var(--text-muted)] pl-2">
              Items are not reserved until your demo order is confirmed. Prices are shown in USD.
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96">
            <div className="glass-panel p-8 rounded-3xl sticky top-32">
              <h2 className="text-lg font-bold text-white mb-8">Order summary</h2>
              
              <div className="space-y-4 text-sm mb-8 border-b border-[var(--border-glass)] pb-8">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Subtotal - {items.length} items</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Shipping</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Estimated tax - 8%</span>
                  <span className="text-white">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-2">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mb-8 text-right">All amounts in USD.</div>

              <Link href="/checkout" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 mb-4 font-bold disabled:opacity-50" aria-disabled={items.length === 0} style={{ pointerEvents: items.length === 0 ? 'none' : 'auto' }}>
                Continue to checkout <ArrowRight size={16} />
              </Link>
              <div className="text-[10px] text-[var(--text-muted)] text-center flex items-center justify-center gap-2">
                <Shield size={12} /> Demo checkout - No real charge
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
