"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, addToCart, updateCartItem, removeCartItem } from "@/lib/api";

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (product: Product, quantity: number) => Promise<void>;
  updateItem: (cart_item_id: number, quantity: number) => Promise<void>;
  removeItem: (cart_item_id: number) => Promise<void>;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Try to load from backend on mount, fallback to localStorage
  useEffect(() => {
    async function loadCart() {
      try {
        // We will call GET /cart (which user is adding to Flask)
        const res = await fetch("http://localhost:5000/cart");
        if (res.ok) {
          const data = await res.json();
          // Assuming backend returns { data: CartItem[], success: true }
          if (data.success && data.data) {
             setItems(data.data);
             return; // Successfully fetched from backend
          }
        }
      } catch (err) {
        console.warn("GET /cart failed or not implemented yet, using localStorage fallback.");
      }
      
      // Fallback
      console.log("Using localStorage fallback for cart persistence");
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse cart from local storage");
        }
      }
    }
    loadCart();
  }, []);

  // Sync to localStorage whenever items change as a backup
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = async (product: Product, quantity: number) => {
    // Check if already in cart locally to update quantity instead
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
      await updateItem(existing.cart_item_id, existing.quantity + quantity);
      return;
    }

    try {
      const cart_item_id = await addToCart({ product_id: product.id, quantity });
      if (cart_item_id) {
        setItems(prev => [...prev, { cart_item_id, product, quantity }]);
        setIsCartOpen(true);
      } else {
        // Fallback if backend doesn't return ID (generate a fake one so UI doesn't break entirely)
        const fakeId = Math.floor(Math.random() * 1000000);
        setItems(prev => [...prev, { cart_item_id: fakeId, product, quantity }]);
        setIsCartOpen(true);
      }
    } catch (e) {
      alert("Failed to add to cart. Is the backend running?");
    }
  };

  const updateItem = async (cart_item_id: number, quantity: number) => {
    // Optimistic UI
    const prevItems = [...items];
    setItems(prev => prev.map(item => item.cart_item_id === cart_item_id ? { ...item, quantity } : item));

    try {
      await updateCartItem(cart_item_id, quantity);
    } catch (e) {
      // Rollback
      setItems(prevItems);
      alert("Failed to update quantity. Rollback applied.");
    }
  };

  const removeItem = async (cart_item_id: number) => {
    // Optimistic UI
    const prevItems = [...items];
    setItems(prev => prev.filter(item => item.cart_item_id !== cart_item_id));

    try {
      await removeCartItem(cart_item_id);
    } catch (e) {
      // Rollback
      setItems(prevItems);
      alert("Failed to remove item. Rollback applied.");
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      setIsCartOpen,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
