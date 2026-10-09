"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getOrder } from "@/lib/api";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (order_id) {
      getOrder(parseInt(order_id)).then(data => {
        setOrder(data);
        setLoading(false);
      }).catch(e => {
        console.error("Error fetching order", e);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [order_id]);

  if (loading) return <div className="text-center pt-32 text-white">Loading order details...</div>;
  if (!order) return <div className="text-center pt-32 text-white">Order not found.</div>;

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-16 border-b border-[var(--border-glass)] pb-6 justify-center">
          <span>01 / Cart</span> <span className="opacity-50">—</span>
          <span>02 / Checkout</span> <span className="opacity-50">—</span>
          <span>03 / Demo payment</span> <span className="opacity-50">—</span>
          <span className="text-[var(--text-primary)]">04 / Confirmation</span>
        </div>

        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[var(--success)]" />
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">ORDER CONFIRMED</div>
          <h1 className="text-5xl font-bold text-white mb-6">Good choices, Avery.</h1>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto mb-8">Your demo order has been placed successfully. This was a simulated payment — no real money was charged.</p>
          <div className="flex items-center justify-center gap-4 text-sm font-bold text-white">
            Order: {order.order_id} <span className="text-[var(--text-muted)] font-normal">{new Date(order.order_date).toLocaleDateString()}</span> <span className="bg-[var(--success)]/20 text-[var(--success)] text-[10px] px-2 py-0.5 rounded-sm">Paid - Demo</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="flex-1 glass-panel p-8 rounded-3xl">
            <h2 className="text-lg font-bold text-white mb-6">Your order, at a glance</h2>
            <div className="space-y-6">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between border-t border-[var(--border-glass)] pt-6">
                  <div className="flex gap-4">
                     <div className="w-16 h-12 bg-black/50 rounded-lg flex items-center justify-center p-1 shrink-0"><img src={`/products/${item.product_name.toLowerCase().replace(/ /g, '-')}.png`} alt={item.product_name} className="w-full h-full object-contain" /></div>
                     <div>
                       <div className="text-[10px] uppercase text-[var(--text-muted)] font-semibold mb-1">Product</div>
                       <div className="text-sm font-bold text-white mb-1">{item.product_name}</div>
                     </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white mb-1">${item.unit_price.toFixed(2)}</div>
                    <div className="text-xs text-[var(--text-muted)]">Quantity {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--border-glass)] text-[10px] text-[var(--text-muted)]">
              Demo confirmation for avery.morgan@example.com
            </div>
          </div>

          <div className="w-full md:w-80 glass-panel p-8 rounded-3xl">
            <h2 className="text-lg font-bold text-white mb-6">Order details</h2>
            <div className="text-sm text-[var(--text-muted)] mb-8">
              <div className="text-white font-bold mb-1">Avery Morgan</div>
              128 Maple Street, Apt 4B<br/>
              Brooklyn, NY 11201 · United States<br/>
              +1 (202) 555-0147
            </div>
            <div className="text-sm text-[var(--text-muted)] mb-8 border-t border-[var(--border-glass)] pt-6">
              <div className="text-white font-bold mb-1">MONO Test Wallet</div>
              <div className="text-[10px]">Payment DEMO-P-10428 · Successful simulation</div>
            </div>
            <div className="space-y-2 text-sm border-t border-[var(--border-glass)] pt-6 mb-4">
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">Subtotal</span><span className="text-white">${order.total_amount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">Shipping</span><span className="text-white">Free</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">Tax</span><span className="text-white">$0.00</span></div>
            </div>
            <div className="flex justify-between items-end border-t border-[var(--border-glass)] pt-4">
              <span className="text-sm font-bold text-white">Total paid · demo</span>
              <span className="text-xl font-bold text-white">${order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href={`/account/orders/${order.order_id}`} className="btn-primary flex items-center justify-center gap-2 px-6">
            View order details <ArrowRight size={16} />
          </Link>
          <Link href="/account/orders" className="btn-secondary px-6">
            My orders
          </Link>
          <Link href="/products" className="btn-secondary px-6">
            Continue shopping
          </Link>
        </div>

      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-dark)] pt-32 text-center text-white">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
