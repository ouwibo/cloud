import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { listOrders } from "../lib/orders";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";

const GOLD = "#B8860B";
const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

const STATUS_COLOR: Record<string, string> = {
  confirmed: "#B8860B",
  shipped: "#2563EB",
  delivered: "#059669",
};

export default function Orders() {
  const orders = listOrders();

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "100px 40px 80px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Your Account</div>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", marginBottom: 8 }}>Order History</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 36 }}>{orders.length} {orders.length === 1 ? "order" : "orders"} placed</p>

        {orders.length === 0 ? (
          <div style={{ ...glass(0.72), padding: "80px 40px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <ShoppingBag size={30} color={GOLD} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>No orders yet</div>
            <p style={{ color: "#888", marginBottom: 28, fontSize: 14 }}>When you place an order, it'll appear here.</p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "rgba(26,26,26,0.88)", color: "white", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Browse the Shop <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {orders.map(order => {
              const shortId = order.id.slice(0, 8).toUpperCase();
              const date = new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
              const statusColor = STATUS_COLOR[order.status] ?? GOLD;
              return (
                <div key={order.id} style={{ ...glass(0.74), padding: "24px 28px", display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 48, height: 48, background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Package size={20} color={GOLD} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a" }}>#{shortId}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, background: `${statusColor}18`, border: `1px solid ${statusColor}30`, borderRadius: 20, padding: "2px 10px", textTransform: "capitalize" }}>{order.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>{date} · {order.items.length} {order.items.length === 1 ? "item" : "items"}</div>
                    <div style={{ fontSize: 13, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {order.items.map(i => i.product.name).join(", ")}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: GOLD, marginBottom: 8 }}>${order.total.toFixed(2)}</div>
                    <Link href={`/order-success/${order.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "#555", textDecoration: "none", background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.88)", borderRadius: 8, padding: "6px 14px", backdropFilter: "blur(8px)" }}>
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
