import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "../data/products";

interface WishlistCtx {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  count: number;
}

const Ctx = createContext<WishlistCtx | null>(null);
const KEY = "atlas-oak-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (p: Product) => setItems(prev => prev.some(i => i.id === p.id) ? prev : [...prev, p]);
  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const has = (id: number) => items.some(i => i.id === id);
  const count = items.length;

  return (
    <Ctx.Provider value={{ items, add, remove, has, count }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
}
