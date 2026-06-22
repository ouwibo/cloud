import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";

const GOLD = "#B8860B";
const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

export default function Cart() {
  const { items, remove, update, subtotal, count } = useCart();
  const shipping = subtotal >= 75 ? 0 : 9.95;
  const total = subtotal + shipping;

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />
      <div style={{ position: "relative", zIndex: 1, paddingTop: 100, maxWidth: 1200, margin: "0 auto", padding: "100px 40px 80px" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", marginBottom: 8 }}>Shopping Cart</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 36 }}>{count} {count === 1 ? "item" : "items"} in your cart</p>

        {items.length === 0 ? (
          <div style={{ ...glass(0.72), padding: "80px 40px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <ShoppingBag size={30} color={GOLD} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>Your cart is empty</div>
            <p style={{ color: "#888", marginBottom: 28, fontSize: 14 }}>Looks like you haven't added anything yet.</p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "rgba(26,26,26,0.88)", color: "white", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Continue Shopping <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {items.map(({ product: p, qty }) => (
                <div key={p.id} style={{ ...glass(0.74), padding: "20px 22px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <img src={p.img} alt={p.name} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 12, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 12.5, color: "#888", marginBottom: 10 }}>{p.cat}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {/* Qty control */}
                      <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.88)", borderRadius: 9, overflow: "hidden" }}>
                        <button onClick={() => update(p.id, qty - 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>
                          <Minus size={13} />
                        </button>
                        <span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{qty}</span>
                        <button onClick={() => update(p.id, qty + 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <button onClick={() => remove(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626", display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600 }}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: GOLD }}>${(p.price * qty).toFixed(2)}</div>
                    {qty > 1 && <div style={{ fontSize: 11.5, color: "#aaa" }}>${p.price} each</div>}
                  </div>
                </div>
              ))}
              <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: "#555", textDecoration: "none", marginTop: 6 }}>
                ← Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ ...glass(0.74), padding: "28px 26px" }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#1a1a1a", marginBottom: 22, letterSpacing: "-0.02em" }}>Order Summary</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
                    { label: "Shipping", value: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}` },
                    { label: "Taxes", value: "Calculated at checkout" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" }}>
                      <span>{label}</span>
                      <span style={{ fontWeight: 600, color: value === "Free" ? "#059669" : "#333" }}>{value}</span>
                    </div>
                  ))}
                </div>
                {shipping > 0 && (
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 10, fontSize: 12.5, color: GOLD, fontWeight: 600 }}>
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: 18, paddingTop: 18, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>Total</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: GOLD }}>${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 20, padding: "14px", background: "rgba(26,26,26,0.9)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
              {/* Promo code */}
              <div style={{ ...glass(0.70), padding: "20px 22px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
                  <Tag size={14} color={GOLD} /> Promo Code
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input placeholder="Enter code" style={{ flex: 1, padding: "9px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.88)", background: "rgba(255,255,255,0.55)", fontSize: 13, color: "#333", outline: "none", fontFamily: "inherit" }} />
                  <button style={{ padding: "9px 16px", background: "rgba(184,134,11,0.88)", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Apply</button>
                </div>
              </div>
              {/* Trust */}
              <div style={{ ...glass(0.65), padding: "18px 22px" }}>
                {["Free returns within 30 days", "SSL secure checkout", "Lifetime product guarantee"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#555", marginBottom: 8, fontWeight: 500 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#059669", flexShrink: 0 }} /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
