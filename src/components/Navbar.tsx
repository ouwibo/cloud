import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const NAV = [
  { label: "Home",    href: "/" },
  { label: "Shop",    href: "/shop" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.45)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#1a1a1a", letterSpacing: "0.12em", textTransform: "uppercase" }}>OUWIBO</span>
              <span style={{ fontSize: 8.5, fontWeight: 600, color: "#B8860B", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 2 }}>Artisan Goods</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="desk-nav" style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {NAV.map(({ label, href }) => {
              const active = href === "/" ? location === "/" : location.startsWith(href);
              return (
                <Link key={href} href={href} style={{
                  padding: "8px 18px", borderRadius: 8,
                  fontSize: 13.5, fontWeight: active ? 700 : 500,
                  color: active ? "#1a1a1a" : "#555",
                  background: active ? "rgba(255,255,255,0.65)" : "transparent",
                  border: active ? "1px solid rgba(255,255,255,0.8)" : "1px solid transparent",
                  textDecoration: "none", transition: "all 150ms",
                  letterSpacing: "0.01em",
                }}>
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="desk-cta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/cart" style={{
              position: "relative", display: "flex", alignItems: "center", gap: 8,
              padding: "9px 18px",
              background: count > 0 ? "rgba(26,26,26,0.88)" : "rgba(255,255,255,0.65)",
              color: count > 0 ? "white" : "#555",
              borderRadius: 10, fontSize: 13.5, fontWeight: 600, textDecoration: "none",
              border: count > 0 ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)", transition: "all 200ms",
            }}>
              <ShoppingCart size={15} />
              {count > 0 ? `Cart (${count})` : "Cart"}
              {count > 0 && (
                <span style={{ position: "absolute", top: -8, right: -8, width: 20, height: 20, background: "#B8860B", color: "white", borderRadius: "50%", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
              )}
            </Link>
            <Link href="/shop" style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 20px",
              background: "rgba(184,134,11,0.88)",
              color: "white", borderRadius: 10, fontSize: 13.5, fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 2px 14px rgba(184,134,11,0.25)",
              border: "1px solid rgba(184,134,11,0.5)",
            }}>
              <ShoppingBag size={14} /> Shop Now
            </Link>
          </div>

          {/* Mobile: cart + menu */}
          <div className="mob-right" style={{ display: "none", alignItems: "center", gap: 8 }}>
            <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.88)", borderRadius: 9, color: "#333", textDecoration: "none" }}>
              <ShoppingCart size={17} />
              {count > 0 && <span style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, background: "#B8860B", color: "white", borderRadius: "50%", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
            </Link>
            <button onClick={() => setOpen(true)} style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: 9, padding: "8px 11px", cursor: "pointer", color: "#333", display: "flex" }}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 280, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(28px)", padding: "28px 24px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.1em", color: "#1a1a1a" }}>OUWIBO</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#B8860B", letterSpacing: "0.2em", textTransform: "uppercase" }}>Artisan Goods</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 8, padding: "6px 9px", cursor: "pointer" }}>
                <X size={16} color="#555" />
              </button>
            </div>
            {NAV.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{ display: "block", padding: "14px 18px", fontSize: 16, fontWeight: 600, color: "#1a1a1a", textDecoration: "none", borderRadius: 10, marginBottom: 4, background: (href === "/" ? location === "/" : location.startsWith(href)) ? "rgba(184,134,11,0.08)" : "transparent" }}>
                {label}
              </Link>
            ))}
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/cart" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px", textAlign: "center", background: "rgba(26,26,26,0.88)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", justifyContent: "center" }}>
                <ShoppingCart size={16} /> Cart {count > 0 && `(${count})`}
              </Link>
              <Link href="/shop" onClick={() => setOpen(false)} style={{ display: "block", padding: "13px", textAlign: "center", background: "rgba(184,134,11,0.88)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .desk-cta { display: none !important; }
          .mob-right { display: flex !important; }
        }
      `}</style>
    </>
  );
}
