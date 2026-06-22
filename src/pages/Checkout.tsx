import { useState } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { CheckCircle2, Lock, CreditCard, Truck } from "lucide-react";

const GOLD = "#B8860B";
const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});
const inp = {
  width: "100%", padding: "11px 14px", borderRadius: 9,
  border: "1px solid rgba(200,210,230,0.7)", background: "rgba(255,255,255,0.6)",
  fontSize: 14, color: "#1a1a1a", outline: "none", fontFamily: "inherit",
  boxSizing: "border-box" as const,
};

const steps = ["Shipping", "Payment", "Review"];

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", apt: "", city: "", state: "", zip: "", country: "United States",
    cardName: "", cardNum: "", expiry: "", cvv: "", saveCard: false,
    method: "card",
  });
  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));
  const shipping = subtotal >= 75 ? 0 : 9.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (done) return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ ...glass(0.82), padding: "72px 64px", textAlign: "center", maxWidth: 500 }}>
          <CheckCircle2 size={64} color="#059669" style={{ marginBottom: 24 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Order Confirmed</div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: 14 }}>Thank you, {form.firstName}!</h1>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.75, marginBottom: 12 }}>
            Your order has been placed and is being prepared by our team. A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <p style={{ color: "#888", fontSize: 13, marginBottom: 36 }}>Estimated delivery: 5–7 business days</p>
          <Link href="/shop" onClick={clear} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", background: "rgba(26,26,26,0.88)", color: "white", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <div style={{ ...glass(0.78), padding: "48px 56px", textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", marginBottom: 12 }}>Your cart is empty</div>
        <Link href="/shop" style={{ color: GOLD, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Browse the shop</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "100px 40px 80px" }}>
        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40, gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : undefined }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: i < step ? "pointer" : "default" }} onClick={() => i < step && setStep(i)}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: i <= step ? "rgba(26,26,26,0.88)" : "rgba(255,255,255,0.65)", border: i <= step ? "none" : "1px solid rgba(200,210,230,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: i <= step ? "white" : "#aaa", backdropFilter: "blur(8px)" }}>
                  {i < step ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: 13.5, fontWeight: i === step ? 700 : 500, color: i === step ? "#1a1a1a" : "#999" }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1, background: i < step ? "rgba(26,26,26,0.3)" : "rgba(200,210,230,0.6)", margin: "0 14px" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
          {/* Left form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {step === 0 && (
              <div style={{ ...glass(0.74), padding: "32px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 24 }}>
                  <Truck size={18} color={GOLD} />
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>Shipping Information</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>First Name *</label><input required value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="John" style={inp} /></div>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Last Name *</label><input required value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Smith" style={inp} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Email *</label><input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@email.com" style={inp} /></div>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Phone</label><input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 555 000 0000" style={inp} /></div>
                </div>
                <div style={{ marginBottom: 12 }}><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Street Address *</label><input required value={form.address} onChange={e => set("address", e.target.value)} placeholder="123 Main Street" style={inp} /></div>
                <div style={{ marginBottom: 12 }}><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Apt / Suite</label><input value={form.apt} onChange={e => set("apt", e.target.value)} placeholder="Apartment, suite, etc. (optional)" style={inp} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>City *</label><input required value={form.city} onChange={e => set("city", e.target.value)} placeholder="New York" style={inp} /></div>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>State</label><input value={form.state} onChange={e => set("state", e.target.value)} placeholder="NY" style={inp} /></div>
                  <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>ZIP *</label><input required value={form.zip} onChange={e => set("zip", e.target.value)} placeholder="10001" style={inp} /></div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Country *</label>
                  <select value={form.country} onChange={e => set("country", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                    {["United States", "United Kingdom", "Australia", "Canada", "Germany", "France", "Japan", "Singapore", "Indonesia", "Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <button onClick={() => { if (form.firstName && form.email && form.address && form.city && form.zip) setStep(1); }} style={{ width: "100%", padding: "13px", background: "rgba(26,26,26,0.88)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 1 && (
              <div style={{ ...glass(0.74), padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 22 }}>
                  <CreditCard size={18} color={GOLD} />
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>Payment</span>
                  <Lock size={13} color="#059669" style={{ marginLeft: "auto" }} />
                  <span style={{ fontSize: 12, color: "#059669", fontWeight: 600 }}>Secure SSL</span>
                </div>
                {/* Method select */}
                <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                  {[{ id: "card", label: "Credit / Debit Card" }, { id: "paypal", label: "PayPal" }, { id: "apple", label: "Apple Pay" }].map(m => (
                    <button key={m.id} onClick={() => set("method", m.id)} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: form.method === m.id ? "rgba(26,26,26,0.88)" : "rgba(255,255,255,0.6)", color: form.method === m.id ? "white" : "#555", border: `1px solid ${form.method === m.id ? "transparent" : "rgba(200,210,230,0.7)"}`, cursor: "pointer" }}>
                      {m.label}
                    </button>
                  ))}
                </div>
                {form.method === "card" && (
                  <>
                    <div style={{ marginBottom: 12 }}><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Cardholder Name *</label><input required value={form.cardName} onChange={e => set("cardName", e.target.value)} placeholder="John Smith" style={inp} /></div>
                    <div style={{ marginBottom: 12 }}><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Card Number *</label><input required value={form.cardNum} onChange={e => set("cardNum", e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} style={inp} /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                      <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Expiry *</label><input required value={form.expiry} onChange={e => set("expiry", e.target.value)} placeholder="MM / YY" maxLength={7} style={inp} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>CVV *</label><input required value={form.cvv} onChange={e => set("cvv", e.target.value)} placeholder="•••" maxLength={4} type="password" style={inp} /></div>
                    </div>
                  </>
                )}
                {form.method !== "card" && (
                  <div style={{ padding: "28px", textAlign: "center", background: "rgba(255,255,255,0.5)", borderRadius: 12, marginBottom: 20, color: "#888", fontSize: 14 }}>
                    You will be redirected to {form.method === "paypal" ? "PayPal" : "Apple Pay"} to complete your payment.
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(0)} style={{ flex: 1, padding: "13px", background: "rgba(255,255,255,0.6)", color: "#555", border: "1px solid rgba(200,210,230,0.7)", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
                  <button onClick={() => setStep(2)} style={{ flex: 2, padding: "13px", background: "rgba(26,26,26,0.88)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Review Order →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ ...glass(0.74), padding: "32px" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a", marginBottom: 20 }}>Review Your Order</div>
                {/* Shipping summary */}
                <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.55)", borderRadius: 12, marginBottom: 14, border: "1px solid rgba(200,210,230,0.5)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Ship to</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{form.firstName} {form.lastName}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{form.address}{form.apt ? `, ${form.apt}` : ""}, {form.city} {form.zip}, {form.country}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{form.email}</div>
                </div>
                <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.55)", borderRadius: 12, marginBottom: 24, border: "1px solid rgba(200,210,230,0.5)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Payment</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{form.method === "card" ? `Card ending in ${form.cardNum.slice(-4) || "••••"}` : form.method === "paypal" ? "PayPal" : "Apple Pay"}</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", background: "rgba(255,255,255,0.6)", color: "#555", border: "1px solid rgba(200,210,230,0.7)", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
                  <button onClick={() => setDone(true)} style={{ flex: 2, padding: "13px", background: `rgba(184,134,11,0.9)`, color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(184,134,11,0.3)" }}>
                    Place Order — ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div style={{ ...glass(0.74), padding: "26px" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", marginBottom: 18 }}>Order Summary</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
              {items.map(({ product: p, qty }) => (
                <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ position: "relative" }}>
                    <img src={p.img} alt={p.name} style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 9 }} />
                    <span style={{ position: "absolute", top: -7, right: -7, width: 18, height: 18, background: "#1a1a1a", color: "white", borderRadius: "50%", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{qty}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{p.cat}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>${(p.price * qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Subtotal", `$${subtotal.toFixed(2)}`], ["Shipping", shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`], ["Tax (8%)", `$${tax.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666" }}>
                  <span>{l}</span><span style={{ fontWeight: 600, color: v === "Free" ? "#059669" : "#333" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a" }}>Total</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: GOLD }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
