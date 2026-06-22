import type { CartItem } from "../context/CartContext";

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  method: string;
}

export interface Order {
  id: string;
  createdAt: number;
  items: CartItem[];
  form: CheckoutForm;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "confirmed" | "shipped" | "delivered";
}

const KEY = "atlas-oak-orders";

export function saveOrder(o: Order): void {
  const existing = listOrders();
  existing.unshift(o);
  localStorage.setItem(KEY, JSON.stringify(existing));
}

export function listOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function getOrder(id: string): Order | null {
  return listOrders().find(o => o.id === id) ?? null;
}
