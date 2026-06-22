import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { listOrders } from "../lib/orders";
import { products } from "../data/products";
import { DollarSign, Package, AlertTriangle, Share2, Check, BarChart3 } from "lucide-react";
import { useState } from "react";

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

export default function Dashboard() {
  const orders = listOrders();
  const [copied, setCopied] = useState(false);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter(p => p.stock <= 10);
  const recentOrders = orders.slice(0, 5);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/shop");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "100px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <BarChart3 size={22} color={GOLD} />
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>Operator View</div>
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", marginBottom: 6 }}>Shop Dashboard</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 36 }}>ATLAS &amp; OAK — Portland, OR · Your business at a glance</p>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { Icon: DollarSign, label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, color: "#059669" },
            { Icon: Package, label: "Total Orders", value: orders.length.toString(), color: GOLD },
            { Icon: AlertTriangle, label: "Low Stock Items", value: lowStock.length.toString(), color: "#DC2626" },
          ].map(({ Icon, label, value, color }) => (
            <div key={label} style={{ ...glass(0.74), padding: "24px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ width: 40, height: 40, background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon size={18} color={color} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>

          {/* Recent orders */}
          <div style={{ ...glass(0.72), padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a" }}>Recent Orders</div>
              <Link href="/orders" style={{ fontSize: 13, fontWeight: 700, color: GOLD, textDecoration: "none" }}>View all →</Link>
            </div>
            {recentOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#aaa", fontSize: 14 }}>No orders yet. Share your shop to get started!</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {recentOrders.map(order => {
                  const shortId = order.id.slice(0, 8).toUpperCase();
                  const date = new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  const sc = STATUS_COLOR[order.status] ?? GOLD;
                  return (
                    <div key={order.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: "rgba(255,255,255,0.55)", borderRadius: 11, border: "1px solid rgba(255,255,255,0.85)" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: "#1a1a1a" }}>#{shortId}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: sc, background: `${sc}18`, borderRadius: 12, padding: "2px 8px", textTransform: "capitalize" }}>{order.status}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "#888" }}>{date} · {order.form.firstName} {order.form.lastName}</div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: GOLD, flexShrink: 0 }}>${order.total.toFixed(2)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Low stock alerts */}
            <div style={{ ...glass(0.72), padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={16} color="#DC2626" />
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>Low Stock Alerts</div>
              </div>
              {lowStock.length === 0 ? (
                <div style={{ fontSize: 13, color: "#aaa", textAlign: "center", padding: "12px 0" }}>All products well stocked ✓</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {lowStock.map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: 9 }}>
                      <img src={p.img} alt={p.name} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 7, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "#DC2626", fontWeight: 700 }}>{p.stock} left</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Share shop */}
            <div style={{ ...glass(0.70), padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Share2 size={16} color={GOLD} />
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>Share Your Shop</div>
              </div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 14 }}>Copy your shop link to share on social media, email newsletters, or with wholesale partners.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, padding: "9px 12px", background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: 8, fontSize: 12.5, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {typeof window !== "undefined" ? window.location.origin : "ouwibodev.zo.space"}/shop
                </div>
                <button onClick={handleCopy} style={{ padding: "9px 14px", background: copied ? "rgba(5,150,105,0.88)" : `rgba(184,134,11,0.88)`, color: "white", border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0, transition: "background 200ms" }}>
                  {copied ? <><Check size={12} /> Copied!</> : "Copy"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
