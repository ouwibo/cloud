import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { getOrder } from "../lib/orders";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

const GOLD = "#B8860B";
const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

interface Props { id?: string }

export default function OrderSuccess({ id }: Props) {
  const order = id ? getOrder(id) : null;
  const shortId = id ? id.slice(0, 8).toUpperCase() : "UNKNOWN";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "120px 40px 80px" }}>
        <div style={{ ...glass(0.82), padding: "56px 48px", textAlign: "center" }}>
          <CheckCircle2 size={64} color="#059669" style={{ marginBottom: 20 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Order Confirmed</div>
          <h1 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: 10 }}>
            {order ? `Thank you, ${order.form.firstName}!` : "Order Confirmed!"}
          </h1>
          <p style={{ fontSize: 15, color: "#666", lineHeight: 1.75, marginBottom: 6 }}>
            Order <strong style={{ color: "#1a1a1a" }}>#{shortId}</strong> has been placed and is being prepared with care.
          </p>
          {order && (
            <p style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
              A confirmation has been sent to <strong>{order.form.email}</strong>
            </p>
          )}
          <p style={{ fontSize: 13, color: "#aaa", marginBottom: 32 }}>Estimated delivery: 5–7 business days</p>

          {order && (
            <div style={{ ...glass(0.65), padding: "22px 24px", marginBottom: 28, textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Order Summary</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {order.items.map(({ product: p, qty }) => (
                  <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <img src={p.img} alt={p.name} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1a1a1a" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>Qty: {qty}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>${(p.price * qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["Subtotal", `$${order.subtotal.toFixed(2)}`],
                  ["Shipping", order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`],
                  ["Tax", `$${order.tax.toFixed(2)}`],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666" }}>
                    <span>{l}</span><span style={{ fontWeight: 600, color: v === "Free" ? "#059669" : "#333" }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a" }}>Total</span>
                  <span style={{ fontSize: 17, fontWeight: 900, color: GOLD }}>${order.total.toFixed(2)}</span>
                </div>
              </div>
              {order && (
                <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(255,255,255,0.55)", borderRadius: 10, border: "1px solid rgba(200,210,230,0.5)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Ship to</div>
                  <div style={{ fontSize: 13, color: "#555" }}>{order.form.firstName} {order.form.lastName}, {order.form.address}{order.form.apt ? `, ${order.form.apt}` : ""}, {order.form.city} {order.form.zip}, {order.form.country}</div>
                </div>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/orders" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "rgba(255,255,255,0.7)", color: "#1a1a1a", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
              <Package size={15} /> View Your Orders
            </Link>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "rgba(26,26,26,0.88)", color: "white", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Continue Shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
