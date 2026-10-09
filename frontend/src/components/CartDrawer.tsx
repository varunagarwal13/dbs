"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateItem, removeItem, cartTotal } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "block" });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: "none" });
      gsap.to(drawerRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [isCartOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0"
      />
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#101C15] rounded-none rounded-l-3xl z-50 translate-x-full border-y-0 border-r-0 flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold tracking-tight text-white">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cart_item_id} className="bg-[#182A1F] p-4 rounded-xl flex flex-col gap-3 group border border-white/5">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-white font-bold">{item.product.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{item.product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold tabular-nums">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-4 bg-black/40 px-3 py-1 rounded-full">
                    <button
                      onClick={() => updateItem(item.cart_item_id, Math.max(1, item.quantity - 1))}
                      className="text-gray-400 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold text-white tabular-nums w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(item.cart_item_id, item.quantity + 1)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.cart_item_id)}
                    className="text-red-400 hover:text-red-300 opacity-50 group-hover:opacity-100 transition-opacity p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#182A1F]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Subtotal</span>
              <span className="text-3xl font-extrabold text-white tabular-nums">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full mb-3 flex items-center justify-center py-4 rounded-xl font-bold text-[#101C15] tracking-wide bg-white hover:bg-gray-100 transition-all">
              View Cart Details
            </Link>
            <button className="w-full py-4 rounded-xl font-bold text-white tracking-wide bg-[#2B4E38] hover:bg-[#1f3a29] transition-all">
              Execute Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
