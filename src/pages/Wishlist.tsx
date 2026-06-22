import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

const GOLD = "#B8860B";
const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { add } = useCart();

  const moveToCart = (product: typeof items[0]) => {
    add(product);
    remove(product.id);
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "100px 40px 80px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Your Account</div>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", marginBottom: 8 }}>Wishlist</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 36 }}>{items.length} {items.length === 1 ? "item" : "items"} saved</p>

        {items.length === 0 ? (
          <div style={{ ...glass(0.72), padding: "80px 40px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Heart size={30} color="#DC2626" />
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>Your wishlist is empty</div>
            <p style={{ color: "#888", marginBottom: 28, fontSize: 14 }}>Tap the heart on any product to save it here.</p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "rgba(26,26,26,0.88)", color: "white", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Browse the Shop <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
            {items.map(p => (
              <div key={p.id} style={{ ...glass(0.74), overflow: "hidden" }}>
                <div style={{ position: "relative" }}>
                  <Link href={`/product/${p.slug}`}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                  </Link>
                  <button onClick={() => remove(p.id)} style={{ position: "absolute", top: 10, right: 10, width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.88)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
                    <Trash2 size={14} color="#DC2626" />
                  </button>
                </div>
                <div style={{ padding: "16px 18px 18px" }}>
                  <Link href={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>{p.cat}</div>
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 19, fontWeight: 900, color: GOLD }}>${p.price}</span>
                      {p.originalPrice && <span style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through", marginLeft: 6 }}>${p.originalPrice}</span>}
                    </div>
                    <button onClick={() => moveToCart(p)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", borderRadius: 9, border: "none", background: "rgba(26,26,26,0.88)", color: "white" }}>
                      <ShoppingCart size={13} /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
