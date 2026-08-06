"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
  toast: { name: string; image: string; added: boolean } | null;
  clearToast: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "novaire_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [toast, setToast] = useState<{ name: string; image: string; added: boolean } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const toggle = (product: Product) => {
    const wasWishlisted = items.some((p) => p.id === product.id);
    setItems((prev) =>
      wasWishlisted ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );
    setToast({ name: product.name, image: product.image, added: !wasWishlisted });
  };

  const isWishlisted = (id: string) => items.some((p) => p.id === id);

  return (
    <WishlistContext.Provider
      value={{ items, toggle, isWishlisted, count: items.length, toast, clearToast: () => setToast(null) }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
