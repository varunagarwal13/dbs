"use client";

import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then(data => {
      setOrders(data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const totalOrdersAmount = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const orderCount = orders.length;

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs text-[var(--text-muted)] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> / 
          <Link href="/account" className="hover:text-white transition-colors">Account</Link> / 
          <span className="text-white">My orders</span>
        </div>

        <AccountLayout activeTab="orders">
          <div className="mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your orders.</h1>
              <p className="text-[var(--text-muted)]">A record of the pieces you've made part of your everyday.</p>
            </div>
            <Link href="/products" className="glass-panel text-xs text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
              Explore products ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-xs text-[var(--text-muted)] mb-4">Orders placed</div>
              <div className="text-3xl font-bold text-white mb-2">{orderCount}</div>
              <div className="text-[10px] text-[var(--text-muted)]">All time</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-xs text-[var(--text-muted)] mb-4">Order total</div>
              <div className="text-3xl font-bold text-white mb-2">${totalOrdersAmount.toFixed(2)}</div>
              <div className="text-[10px] text-[var(--text-muted)]">Across all orders</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-xs text-[var(--text-muted)] mb-4">Latest order</div>
              <div className="text-3xl font-bold text-white mb-2">{orders.length > 0 ? new Date(orders[0].order_date).toLocaleDateString() : 'N/A'}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{orders.length > 0 ? `ID: ${orders[0].order_id} · ${orders[0].order_status}` : 'No orders yet'}</div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-[var(--border-glass)] flex justify-between items-center bg-white/5">
              <div className="bg-[var(--success)]/20 text-[var(--success)] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                All orders · {orderCount}
              </div>
              <button className="text-xs text-[var(--text-muted)] hover:text-white transition-colors flex items-center gap-1">
                Newest first ↓
              </button>
            </div>

            <div className="hidden md:grid grid-cols-12 gap-4 p-6 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold border-b border-[var(--border-glass)]">
              <div className="col-span-2">Order</div>
              <div className="col-span-6">Items</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1">Payment</div>
              <div className="col-span-1 text-right">Details</div>
            </div>

            <div className="divide-y divide-[var(--border-glass)]">
              {loading ? (
                <div className="p-6 text-center text-[var(--text-muted)]">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="p-6 text-center text-[var(--text-muted)]">No orders found.</div>
              ) : (
                orders.map(order => (
                  <div key={order.order_id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors">
                    <div className="col-span-2">
                      <div className="font-bold text-white mb-1">{order.order_id}</div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">{new Date(order.order_date).toLocaleDateString()}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">{order.order_status}</div>
                    </div>
                    <div className="col-span-6">
                      <div className="text-sm font-bold text-white mb-1">Details available inside</div>
                      <div className="text-xs text-[var(--text-muted)]">View for line items</div>
                    </div>
                    <div className="col-span-2 text-sm font-bold text-white">${order.total_amount.toFixed(2)}</div>
                    <div className="col-span-1">
                      <span className="bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20 text-[10px] px-2 py-0.5 rounded-sm whitespace-nowrap">
                        Paid
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <Link href={`/account/orders/${order.order_id}`} className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">
                        Details ↗
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-6 text-[10px] text-[var(--text-muted)] border-t border-[var(--border-glass)] bg-white/5">
              Showing all {orderCount} orders · Totals include shipping and tax.
            </div>
          </div>

          <div className="bg-[#1A2E20] border border-[#2B4E38] p-4 rounded-xl flex items-start gap-3 mt-8">
            <div className="text-[#3E8B5A] mt-0.5 shrink-0 text-sm border border-[#3E8B5A] rounded-full w-4 h-4 flex items-center justify-center">i</div>
            <div>
              <h4 className="text-xs font-bold text-[#E8F3EB] mb-1">Your orders, without the real charges.</h4>
              <p className="text-[10px] text-[#9CBDA7]">All orders in this example use simulated payments. View an order for its itemized total and payment details.</p>
            </div>
          </div>
        </AccountLayout>
      </div>
    </main>
  );
}
