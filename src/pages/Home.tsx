import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { ArrowRight, Star, Truck, RefreshCw, Shield, Leaf, ChevronRight, Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

const featured = [
  {
    id: "linen-journal-a5",
    name: "Linen Journal",
    subtitle: "Handbound Collection",
    price: "$48",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    tag: "Bestseller",
    tagColor: "#B8860B",
  },
  {
    id: "ceramic-pour-over-set",
    name: "Ceramic Pour-Over Set",
    subtitle: "Matte White & Sage",
    price: "$94",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    tag: "New",
    tagColor: "#059669",
  },
  {
    id: "botanica-soy-candle",
    name: "Botanica Candle",
    subtitle: "Hand-poured Soy Wax",
    price: "$36",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    tag: "Fan Favourite",
    tagColor: "#7C3AED",
  },
  {
    id: "leather-desk-tray",
    name: "Leather Desk Tray",
    subtitle: "Full-grain Tan Leather",
    price: "$72",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    tag: null,
    tagColor: "#4F46E5",
  },
];

const values = [
  { Icon: Leaf,      title: "Slow-made & Small-batch",  desc: "Every piece is made in small runs by independent makers who care about their craft." },
  { Icon: Shield,    title: "Lifetime Repair Guarantee", desc: "We stand behind our craft. If it breaks, we fix or replace it — always, for life." },
  { Icon: Truck,     title: "Free Global Shipping",      desc: "Free shipping on all orders over $75, delivered anywhere in the world." },
  { Icon: RefreshCw, title: "Easy 30-Day Returns",       desc: "Not in love? Send it back within 30 days, no questions asked." },
];

const testimonials = [
  { name: "Maya R.",   loc: "Brooklyn, USA",    stars: 5, text: "The linen journal is absolutely stunning. The quality blew me away — I'll be a customer for life." },
  { name: "Marco T.",  loc: "Milan, Italy",     stars: 5, text: "Ordered the ceramic pour-over set and a candle. Packaging was exquisite, products even better." },
  { name: "Suki P.",   loc: "Portland, USA",    stars: 5, text: "Atlas & Oak is the only brand I trust for my home goods. Every piece is made to outlive trends." },
];

const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

const GOLD = "#B8860B";

export default function Home() {
  const { add: wAdd, remove: wRemove, has } = useWishlist();

  const handleWishlist = (slug: string) => {
    const p = products.find(pr => pr.slug === slug);
    if (!p) return;
    has(p.id) ? wRemove(p.id) : wAdd(p);
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      {/* ——— HERO ——— */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: 24, padding: "6px 18px", marginBottom: 28, fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              New Collection — 2026
            </div>
            <h1 style={{ fontSize: "clamp(38px,5vw,68px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", lineHeight: 1.04, marginBottom: 24 }}>
              Slow-made for those<br />
              <span style={{ color: GOLD }}>who seek the</span><br />
              extraordinary.
            </h1>
            <p style={{ fontSize: 17, color: "#555", lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              Atlas &amp; Oak makes small-batch handcrafted objects for your home, desk, and daily ritual. Every piece made to outlive trends.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/shop" style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "15px 36px",
                background: "rgba(26,26,26,0.9)", color: "white",
                borderRadius: 12, fontSize: 15, fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link href="/about" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "15px 30px",
                background: "rgba(255,255,255,0.68)",
                color: "#1a1a1a", borderRadius: 12, fontSize: 15, fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
              }}>
                Our Story <ChevronRight size={15} />
              </Link>
            </div>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
              {["Free Global Shipping", "Lifetime Repair Guarantee", "Independent Makers"].map(b => (
                <span key={b} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "5px 14px", border: "1px solid rgba(255,255,255,0.85)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669", display: "inline-block" }} />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div style={{ position: "relative" }}>
            <div style={{ ...glass(0.75), overflow: "hidden", aspectRatio: "4/5", position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=85"
                alt="Atlas & Oak Linen Journal"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* floating price badge */}
              <div style={{ position: "absolute", bottom: 20, left: 20, ...glass(0.85), borderRadius: 14, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase" }}>Bestseller</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>Linen Journal</span>
                <span style={{ fontSize: 13, color: "#888" }}>From $48</span>
              </div>
            </div>
            {/* floating review bubble */}
            <div style={{ position: "absolute", top: -20, right: -20, ...glass(0.85), borderRadius: 16, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 4, minWidth: 160 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={GOLD} color={GOLD} />)}
              </div>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#1a1a1a" }}>4.97</span>
              <span style={{ fontSize: 11, color: "#888" }}>from 400+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FEATURED PRODUCTS ——— */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Featured</div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>Crafted with intent</h2>
          </div>
          <Link href="/shop" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: GOLD, textDecoration: "none" }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
          {featured.map(({ id, name, subtitle, price, img, tag, tagColor }) => {
            const prod = products.find(p => p.slug === id);
            const wished = prod ? has(prod.id) : false;
            return (
              <div key={id} style={{ ...glass(0.72), overflow: "hidden", cursor: "pointer", transition: "transform 160ms, box-shadow 160ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 48px rgba(0,50,120,0.13)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 32px rgba(0,50,120,0.07)"; }}>
                <Link href={`/product/${id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={img} alt={name} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
                    {tag && (
                      <span style={{ position: "absolute", top: 12, left: 12, fontSize: 11, fontWeight: 800, background: tagColor, color: "white", padding: "4px 12px", borderRadius: 20 }}>
                        {tag}
                      </span>
                    )}
                    <button
                      onClick={e => { e.preventDefault(); e.stopPropagation(); handleWishlist(id); }}
                      style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.88)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "all 150ms" }}>
                      <Heart size={14} fill={wished ? "#DC2626" : "none"} color={wished ? "#DC2626" : "#888"} />
                    </button>
                  </div>
                </Link>
                <div style={{ padding: "18px 20px" }}>
                  <Link href={`/product/${id}`} style={{ textDecoration: "none" }}>
                    <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1a1a", marginBottom: 3 }}>{name}</div>
                    <div style={{ fontSize: 12.5, color: "#888", marginBottom: 12 }}>{subtitle}</div>
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 900, color: GOLD }}>{price}</span>
                    <Link href={`/product/${id}`} style={{ fontSize: 12, fontWeight: 700, color: "#555", background: "rgba(0,0,0,0.05)", borderRadius: 8, padding: "5px 12px", textDecoration: "none" }}>View →</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ——— BRAND STORY STRIP ——— */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ ...glass(0.70), overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=85"
            alt="Atlas & Oak workshop"
            style={{ width: "100%", height: "100%", minHeight: 380, objectFit: "cover", display: "block" }}
          />
          <div style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Our Story</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.2 }}>Built on the belief that everyday objects should be beautiful</h2>
            <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8, marginBottom: 28 }}>
              Atlas &amp; Oak was built by one person out of a Portland garage — the belief that the world didn't need more disposable goods. We work with a small circle of independent makers to bring you objects built to be loved for generations.
            </p>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: GOLD, textDecoration: "none" }}>
              Read our full story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— VALUES ——— */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Why Atlas &amp; Oak</div>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>Our promise to you</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
          {values.map(({ Icon, title, desc }) => (
            <div key={title} style={{ ...glass(0.70), padding: "28px 24px", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                <Icon size={22} color={GOLD} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— TESTIMONIALS ——— */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Reviews</div>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>What our customers say</h2>
          <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 10 }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={GOLD} color={GOLD} />)}
            <span style={{ marginLeft: 8, fontSize: 14, color: "#666", fontWeight: 600 }}>4.97 · 400+ reviews</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
          {testimonials.map(({ name, loc, stars, text }) => (
            <div key={name} style={{ ...glass(0.72), padding: "28px 26px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {Array.from({ length: stars }).map((_, i) => <Star key={i} size={13} fill={GOLD} color={GOLD} />)}
              </div>
              <p style={{ fontSize: 14, color: "#333", lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{text}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>{name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{loc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— CTA BANNER ——— */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(26,26,26,0.88),rgba(50,35,10,0.88))", backdropFilter: "blur(24px)", borderRadius: 24, padding: "72px 64px", textAlign: "center", border: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: "rgba(184,134,11,0.07)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: -80, left: -80, width: 240, height: 240, background: "rgba(184,134,11,0.05)", borderRadius: "50%" }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(184,134,11,0.9)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>Small-batch drops</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "white", marginBottom: 16, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            New arrivals, every month.<br />Be the first to know.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 36, fontSize: 15, maxWidth: 420, margin: "0 auto 36px" }}>
            Join our community and get early access to new collections, exclusive offers, and stories from our makers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <input placeholder="Your email address" style={{ padding: "13px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "white", fontSize: 14, width: 280, outline: "none", backdropFilter: "blur(8px)" }} />
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "rgba(184,134,11,0.9)", color: "white", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(184,134,11,0.3)" }}>
              Subscribe &amp; Save 10%
            </Link>
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.5)", padding: "40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.08em", color: "#1a1a1a", marginBottom: 4 }}>ATLAS &amp; OAK</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Slow-made Artisan Goods</div>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.75, maxWidth: 260 }}>Handcrafted objects for the home, desk, and daily ritual. Made to outlive trends.</p>
          </div>
          {[
            { title: "Shop", links: ["All Products", "New Arrivals", "Bestsellers", "Gift Sets"] },
            { title: "Company", links: ["About Us", "Our Makers", "Sustainability", "Careers"] },
            { title: "Support", links: ["Contact", "Shipping Info", "Returns", "Track Order"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13.5, color: "#666", marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 12.5, color: "#999" }}>© 2026 OUWIBO. All rights reserved.</span>
          <span style={{ fontSize: 12.5, color: "#999" }}>Built for Zo Ambassador Build Challenge · June 2026</span>
        </div>
      </footer>
    </div>
  );
}
