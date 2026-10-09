"use client";

import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";
import React, { useEffect, useState } from "react";
import { getOrder } from "@/lib/api";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(parseInt(unwrappedParams.id)).then(data => {
      setOrder(data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, [unwrappedParams.id]);

  if (loading) return <div className="min-h-screen bg-[var(--bg-dark)] pt-32 text-center text-white">Loading order...</div>;
  if (!order) return <div className="min-h-screen bg-[var(--bg-dark)] pt-32 text-center text-white">Order not found.</div>;

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs text-[var(--text-muted)] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> / 
          <Link href="/account" className="hover:text-white transition-colors">Account</Link> / 
          <Link href="/account/orders" className="hover:text-white transition-colors">My orders</Link> / 
          <span className="text-white">{unwrappedParams.id}</span>
        </div>

        <AccountLayout activeTab="orders">
          <div className="mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Order {order.order_id}</h1>
              <div className="text-sm text-[var(--text-muted)] mb-6">Placed on {new Date(order.order_date).toLocaleDateString()} · {order.items?.length || 0} items · USD</div>
              <div className="flex items-center gap-3">
                <span className="bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-2 py-0.5 rounded-sm">{order.order_status}</span>
                <span className="bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-2 py-0.5 rounded-sm">Paid · Demo</span>
                <span className="text-xs text-[var(--text-muted)] border-l border-[var(--border-glass)] pl-3">Avery Morgan · avery.morgan@example.com</span>
              </div>
            </div>
            <Link href="/account/orders" className="glass-panel text-xs text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
              Back to orders
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1 space-y-6">
              
              <div className="glass-panel p-8 rounded-3xl">
                <h2 className="text-lg font-bold text-white mb-6">Ordered essentials</h2>
                <div className="space-y-6">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between border-t border-[var(--border-glass)] pt-6">
                      <div className="flex gap-4">
                         <div className="w-16 h-12 bg-black/50 rounded-lg flex items-center justify-center p-1 shrink-0">
                           <img src={`/products/${item.product_name.toLowerCase().replace(/ /g, '-')}.png`} alt={item.product_name} className="w-full h-full object-contain" />
                         </div>
                         <div>
                           <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1">Product</div>
                           <div className="text-sm font-bold text-white mb-1">{item.product_name}</div>
                           <div className="text-[10px] text-[var(--text-muted)] mt-1">${item.unit_price.toFixed(2)} each</div>
                         </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white mb-1">${(item.unit_price * item.quantity).toFixed(2)}</div>
                        <div className="text-xs text-[var(--text-muted)]">Quantity {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--border-glass)] text-[10px] text-[var(--text-muted)]">
                  {order.items?.length || 0} products · All in Graphite
                </div>
              </div>

              <div className="glass-panel p-8 rounded-3xl">
                <h2 className="text-lg font-bold text-white mb-6">Shipping details</h2>
                <div className="text-sm text-[var(--text-muted)] mb-8">
                  <div className="text-white font-bold mb-1">Avery Morgan</div>
                  128 Maple Street, Apt 4B<br/>
                  Brooklyn, NY 11201 · United States<br/>
                  +1 (202) 555-0147
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--success)] bg-[var(--success)]/10 px-3 py-2 rounded-lg border border-[var(--success)]/20 w-max">
                  Standard shipping - Free
                </div>
              </div>

              <div className="pt-4">
                <Link href="/products" className="text-xs text-white hover:underline flex items-center gap-1">Explore more essentials ↗</Link>
              </div>

            </div>

            <div className="w-full lg:w-80 space-y-6">
              
              <div className="glass-panel p-8 rounded-3xl">
                <h2 className="text-lg font-bold text-white mb-6">Order summary</h2>
                <div className="space-y-4 text-sm mb-6 border-b border-[var(--border-glass)] pb-6">
                  <div className="flex justify-between"><span className="text-[var(--text-muted)]">Subtotal</span><span className="text-white">${(order.total_amount || 0).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)]">Shipping</span><span className="text-white">Free</span></div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)]">Tax</span><span className="text-white">$0.00</span></div>
                </div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-base font-bold text-white">Total paid</span>
                  <span className="text-2xl font-bold text-white">${(order.total_amount || 0).toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mb-6">All amounts in USD.</div>
                <div className="flex items-center gap-2 text-[10px] text-[var(--success)] bg-[var(--success)]/10 px-3 py-2 rounded-lg border border-[var(--success)]/20">
                  Paid with demo payment - No real charge
                </div>
              </div>

              <div className="glass-panel p-8 rounded-3xl">
                <h2 className="text-lg font-bold text-white mb-6">Payment details</h2>
                <span className="bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-2 py-1 rounded-sm mb-6 inline-block">Successful simulation</span>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1">Method</div>
                    <div className="text-sm font-bold text-white">{order.payment_mode || 'MONO Test Wallet'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1">Payment Reference</div>
                    <div className="text-sm font-bold text-white mb-1">DEMO-P-{order.order_id}</div>
                    <div className="text-xs text-[var(--text-muted)]">{new Date(order.order_date).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[var(--border-glass)] text-[10px] text-[var(--text-muted)]">
                  No real money was charged. Actual payment: $0.00.
                </div>
              </div>

            </div>
          </div>
        </AccountLayout>
      </div>
    </main>
  );
}
