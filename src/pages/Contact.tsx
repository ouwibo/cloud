import { useState } from "react";
import Navbar from "../components/Navbar";
import { Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";

const GOLD = "#B8860B";

const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

const info = [
  { Icon: Mail,    title: "Email Us",          value: "hello@ouwibo.com",       sub: "Reply within 24 hours" },
  { Icon: MapPin,  title: "Headquarters",      value: "London, United Kingdom",  sub: "Artisan partners across 5 continents" },
  { Icon: Clock,   title: "Support Hours",     value: "Mon–Fri, 9am–6pm GMT",   sub: "Weekend inquiries answered Monday" },
  { Icon: MessageCircle, title: "Live Chat",  value: "Available on site",       sub: "Average response under 5 minutes" },
];

const topics = ["Product inquiry", "Order support", "Wholesale / B2B", "Press & media", "Artisan partnership", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(8px)", fontSize: 14, color: "#1a1a1a",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const,
    transition: "border 150ms",
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>

        {/* Header */}
        <section style={{ padding: "60px 40px 48px", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, display: "inline-block", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", borderRadius: 20, padding: "6px 18px", border: "1px solid rgba(255,255,255,0.85)" }}>
            Get in Touch
          </div>
          <h1 style={{ fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", marginBottom: 14 }}>We'd love to hear from you</h1>
          <p style={{ fontSize: 16, color: "#666", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>Questions about an order, a wholesale inquiry, or just want to say hello — we're here.</p>
        </section>

        {/* Info cards */}
        <section style={{ padding: "0 40px 40px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {info.map(({ Icon, title, value, sub }) => (
              <div key={title} style={{ ...glass(0.70), padding: "24px 22px" }}>
                <div style={{ width: 44, height: 44, background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.18)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={18} color={GOLD} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12.5, color: "#888" }}>{sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Main grid */}
        <section style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 24, alignItems: "start" }}>

            {/* Form */}
            <div style={{ ...glass(0.72), padding: "40px 40px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <CheckCircle2 size={52} color="#059669" style={{ marginBottom: 20 }} />
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1a1a1a", marginBottom: 10, letterSpacing: "-0.03em" }}>Message sent!</h2>
                  <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, maxWidth: 320, margin: "0 auto 24px" }}>
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSent(false)} style={{ padding: "11px 28px", background: `rgba(184,134,11,0.88)`, color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1a1a1a", marginBottom: 4, letterSpacing: "-0.03em" }}>Send us a message</h2>
                  <p style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>Fill in the form and we'll be in touch shortly.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Full Name</label>
                      <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Email</label>
                      <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Topic</label>
                    <select required value={form.topic} onChange={e => set("topic", e.target.value)}
                      style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                      <option value="">Select a topic...</option>
                      {topics.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Message</label>
                    <textarea required value={form.message} onChange={e => set("message", e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      style={{ ...inputStyle, resize: "vertical" }} />
                  </div>

                  <button type="submit" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                    width: "100%", padding: "14px", background: "rgba(26,26,26,0.88)",
                    color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
                    cursor: "pointer", letterSpacing: "0.02em",
                  }}>
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Side info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ ...glass(0.70), overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=700&q=80"
                  alt="OUWIBO studio"
                  style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "22px" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", marginBottom: 6 }}>Visit our London Studio</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>We host monthly open studio days where you can meet the team, see products in person, and learn about our makers. Check our Instagram for dates.</div>
                </div>
              </div>

              <div style={{ ...glass(0.68), padding: "24px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 14 }}>Wholesale & B2B</div>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.75, marginBottom: 14 }}>Interested in stocking OUWIBO? We work with independent retailers, boutique hotels, and gift shops worldwide. Minimum orders start at 20 units per SKU.</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>wholesale@ouwibo.com</div>
              </div>

              <div style={{ ...glass(0.68), padding: "24px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 14 }}>Press & Media</div>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.75, marginBottom: 14 }}>For interviews, product samples, brand assets, or editorial features, our press team is ready to help.</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>press@ouwibo.com</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
