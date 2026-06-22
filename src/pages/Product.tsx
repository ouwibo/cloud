import { useState } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import { Star, ShoppingCart, Heart, Check, ChevronRight, ArrowLeft } from "lucide-react";

const GOLD = "#B8860B";
const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

const TABS = ["Description", "Details", "Shipping"];

interface Props { slug?: string }

export default function Product({ slug }: Props) {
  const product = products.find(p => p.slug === slug);
  const { add } = useCart();
  const { add: wAdd, remove: wRemove, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState(0);
  const [addedCart, setAddedCart] = useState(false);

  if (!product) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover" }}>
      <Navbar />
      <div style={{ ...glass(0.82), padding: "52px 60px", textAlign: "center", marginTop: 70 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#1a1a1a" }}>404</div>
        <p style={{ color: "#888", margin: "12px 0 24px" }}>Product not found</p>
        <Link href="/shop" style={{ color: GOLD, fontWeight: 700, textDecoration: "none" }}>← Back to Shop</Link>
      </div>
    </div>
  );

  const related = products.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const wished = has(product.id);

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) add(product);
    setAddedCart(true);
    setTimeout(() => setAddedCart(false), 1800);
  };

  const handleWishlist = () => wished ? wRemove(product.id) : wAdd(product);

  const tabContent = [
    <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>{product.desc}</p>,
    <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
      {product.details.map(d => <li key={d} style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{d}</li>)}
    </ul>,
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {["Free shipping on orders over $75", "Standard delivery: 5–7 business days", "Express delivery: 2–3 business days (add-on)", "Ships from Portland, OR", "Lifetime repair guarantee — contact ouwibodev@zo.computer"].map(s => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#555" }}>
          <Check size={14} color="#059669" style={{ flexShrink: 0 }} /> {s}
        </div>
      ))}
    </div>,
  ];

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, paddingTop: 100, maxWidth: 1200, margin: "0 auto", padding: "100px 40px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, fontSize: 13, color: "#888" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={13} />
          <Link href="/shop" style={{ color: "#888", textDecoration: "none" }}>Shop</Link>
          <ChevronRight size={13} />
          <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Back link */}
        <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600, color: "#555", textDecoration: "none", marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", marginBottom: 56 }}>

          {/* Image gallery */}
          <div>
            <div style={{ ...glass(0.80), overflow: "hidden", aspectRatio: "4/5", marginBottom: 12 }}>
              <img
                src={product.imgs[imgIdx]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {product.imgs.length > 1 && (
              <div style={{ display: "flex", gap: 10 }}>
                {product.imgs.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} style={{
                    width: 72, height: 72, borderRadius: 10, overflow: "hidden", border: i === imgIdx ? `2px solid ${GOLD}` : "2px solid transparent",
                    padding: 0, cursor: "pointer", flexShrink: 0,
                  }}>
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Tag */}
            {product.tag && (
              <div style={{ display: "inline-flex", marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 800, background: product.tagColor, color: "white", padding: "4px 14px", borderRadius: 20 }}>{product.tag}</span>
              </div>
            )}

            {/* Category */}
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{product.cat}</div>

            {/* Name */}
            <h1 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1 }}>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.round(product.rating) ? GOLD : "none"} color={i <= Math.round(product.rating) ? GOLD : "#ddd"} />)}
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#333" }}>{product.rating}</span>
              <span style={{ fontSize: 13, color: "#aaa" }}>({product.reviews}+ reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: GOLD }}>${product.price}</span>
              {product.originalPrice && (
                <span style={{ fontSize: 18, color: "#bbb", textDecoration: "line-through" }}>${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(5,150,105,0.1)", color: "#059669", borderRadius: 8, padding: "3px 10px" }}>
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            {product.stock <= 10 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "9px 14px", background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.18)", borderRadius: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC2626", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#DC2626" }}>Only {product.stock} left — order soon</span>
              </div>
            )}

            {/* Qty selector */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 8 }}>Quantity</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.88)", borderRadius: 10, width: "fit-content", overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ width: 40, textAlign: "center", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <button onClick={handleAddCart} style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                padding: "14px 20px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                background: addedCart ? "rgba(5,150,105,0.88)" : "rgba(26,26,26,0.9)", color: "white",
                transition: "background 200ms", boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}>
                {addedCart ? <><Check size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>
              <button onClick={handleWishlist} style={{
                width: 50, height: 50, borderRadius: 12, border: "1px solid rgba(255,255,255,0.88)",
                background: wished ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.65)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)", transition: "all 150ms",
              }}>
                <Heart size={18} fill={wished ? "#DC2626" : "none"} color={wished ? "#DC2626" : "#555"} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ ...glass(0.65), padding: "16px 20px", display: "flex", flexDirection: "column", gap: 9 }}>
              {["Slow-made & small-batch — never mass produced", "Lifetime repair guarantee", "Free returns within 30 days"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#555", fontWeight: 500 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#059669", flexShrink: 0 }} /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ ...glass(0.72), padding: "32px", marginBottom: 56 }}>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(0,0,0,0.08)", marginBottom: 28 }}>
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} style={{
                padding: "10px 24px", border: "none", background: "none", cursor: "pointer",
                fontSize: 14, fontWeight: tab === i ? 700 : 500,
                color: tab === i ? "#1a1a1a" : "#888",
                borderBottom: `2px solid ${tab === i ? GOLD : "transparent"}`,
                marginBottom: -1, transition: "all 150ms",
              }}>{t}</button>
            ))}
          </div>
          <div>{tabContent[tab]}</div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>More from {product.cat}</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: 24 }}>You might also like</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 18 }}>
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ ...glass(0.72), overflow: "hidden", transition: "transform 160ms" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{p.cat}</div>
                      <span style={{ fontSize: 17, fontWeight: 900, color: GOLD }}>${p.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
