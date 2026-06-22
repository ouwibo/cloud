import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products, CATS } from "../data/products";
import { Search, Star, SlidersHorizontal, Check, ShoppingCart, X, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const GOLD = "#B8860B";
const SORTS = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Reviewed"];
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $40", min: 0, max: 40 },
  { label: "$40 – $70", min: 40, max: 70 },
  { label: "$70 – $100", min: 70, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];
const PAGE_SIZE = 12;

const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

export default function Shop() {
  const { add, items } = useCart();
  const { add: wAdd, remove: wRemove, has } = useWishlist();
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [priceIdx, setPriceIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [sideOpen, setSideOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inCart = (id: number) => items.some(i => i.product.id === id);

  const handleAdd = (p: typeof products[0]) => {
    add(p);
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1400);
  };

  const handleWishlist = (p: typeof products[0]) => {
    has(p.id) ? wRemove(p.id) : wAdd(p);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setShowSuggestions(val.trim().length > 0);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(val);
      setPage(1);
    }, 120);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const pr = PRICE_RANGES[priceIdx];

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat = cat === "All" || p.cat === cat;
      const matchPrice = p.price >= pr.min && p.price < pr.max;
      const q = debouncedQuery.trim().toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      return matchCat && matchPrice && matchQ;
    });
    if (sort === "Price: Low to High")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low")  list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated")           list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "Most Reviewed")       list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [cat, sort, priceIdx, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeFilter = (fn: () => void) => { fn(); setPage(1); };
  const hasFilters = cat !== "All" || priceIdx !== 0 || debouncedQuery !== "";

  const highlightMatch = (text: string, q: string) => {
    if (!q) return <span>{text}</span>;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return <span>{text}</span>;
    return (
      <span>
        {text.slice(0, idx)}
        <strong style={{ color: GOLD }}>{text.slice(idx, idx + q.length)}</strong>
        {text.slice(idx + q.length)}
      </span>
    );
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>
        {/* Header */}
        <section style={{ padding: "48px 40px 28px", maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>The Atlas &amp; Oak Collection</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", marginBottom: 4 }}>Shop All Products</h1>
              <p style={{ fontSize: 14, color: "#888" }}>{filtered.length} {filtered.length === 1 ? "product" : "products"} · Free shipping over $75</p>
            </div>
            {/* Search + Sort row */}
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              {/* Search with autocomplete */}
              <div ref={searchRef} style={{ position: "relative" }}>
                <Search size={15} color="#aaa" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }} />
                <input
                  value={query}
                  onChange={e => handleQueryChange(e.target.value)}
                  onFocus={() => query.trim() && setShowSuggestions(true)}
                  placeholder="Search products..."
                  style={{ paddingLeft: 36, paddingRight: query ? 32 : 14, paddingTop: 9, paddingBottom: 9, borderRadius: 11, border: "1px solid rgba(255,255,255,0.88)", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", fontSize: 13.5, color: "#333", outline: "none", fontFamily: "inherit", width: 220 }}
                />
                {query && <button onClick={() => { handleQueryChange(""); setShowSuggestions(false); }} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", zIndex: 1 }}><X size={14} color="#aaa" /></button>}

                {/* Autocomplete dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 8px 32px rgba(0,50,120,0.12)", zIndex: 50, overflow: "hidden", minWidth: 260 }}>
                    {suggestions.map(p => (
                      <Link key={p.id} href={`/product/${p.slug}`} onClick={() => setShowSuggestions(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.05)", transition: "background 100ms" }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,134,11,0.06)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = ""}>
                        <img src={p.img} alt={p.name} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 7, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1a1a1a" }}>{highlightMatch(p.name, query)}</div>
                          <div style={{ fontSize: 11.5, color: "#aaa" }}>{p.cat} · ${p.price}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Sort */}
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
                style={{ padding: "9px 14px", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.88)", borderRadius: 11, fontSize: 13.5, color: "#333", cursor: "pointer", fontWeight: 600, outline: "none", fontFamily: "inherit" }}>
                {SORTS.map(s => <option key={s}>{s}</option>)}
              </select>
              {/* Mobile filter toggle */}
              <button onClick={() => setSideOpen(true)} className="filter-toggle" style={{ display: "none", alignItems: "center", gap: 7, padding: "9px 14px", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.88)", borderRadius: 11, fontSize: 13.5, fontWeight: 600, color: "#333", cursor: "pointer" }}>
                <SlidersHorizontal size={15} /> Filters {hasFilters && <span style={{ background: GOLD, color: "white", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>!</span>}
              </button>
            </div>
          </div>
          {/* Active filters */}
          {hasFilters && (
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#999" }}>Active:</span>
              {cat !== "All" && <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(184,134,11,0.12)", color: GOLD, border: "1px solid rgba(184,134,11,0.25)", borderRadius: 20, padding: "3px 12px", display: "flex", alignItems: "center", gap: 6 }}>{cat} <button onClick={() => changeFilter(() => setCat("All"))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={11} /></button></span>}
              {priceIdx !== 0 && <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(184,134,11,0.12)", color: GOLD, border: "1px solid rgba(184,134,11,0.25)", borderRadius: 20, padding: "3px 12px", display: "flex", alignItems: "center", gap: 6 }}>{PRICE_RANGES[priceIdx].label} <button onClick={() => changeFilter(() => setPriceIdx(0))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={11} /></button></span>}
              {debouncedQuery && <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(184,134,11,0.12)", color: GOLD, border: "1px solid rgba(184,134,11,0.25)", borderRadius: 20, padding: "3px 12px", display: "flex", alignItems: "center", gap: 6 }}>"{debouncedQuery}" <button onClick={() => { handleQueryChange(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><X size={11} /></button></span>}
              <button onClick={() => { changeFilter(() => { setCat("All"); setPriceIdx(0); }); handleQueryChange(""); }} style={{ fontSize: 12, color: "#DC2626", background: "none", border: "none", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>Clear all</button>
            </div>
          )}
        </section>

        {/* Main layout: sidebar + grid */}
        <section style={{ padding: "0 40px 80px", maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
          {/* Sidebar */}
          <div className="shop-sidebar" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Categories */}
            <div style={{ ...glass(0.72), padding: "22px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Category</div>
              {CATS.map(c => (
                <button key={c} onClick={() => changeFilter(() => setCat(c))} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                  padding: "9px 12px", borderRadius: 9, fontSize: 13.5, fontWeight: cat === c ? 700 : 500,
                  color: cat === c ? "#1a1a1a" : "#666",
                  background: cat === c ? "rgba(184,134,11,0.1)" : "transparent",
                  border: `1px solid ${cat === c ? "rgba(184,134,11,0.22)" : "transparent"}`,
                  cursor: "pointer", marginBottom: 3, textAlign: "left",
                }}>
                  <span>{c}</span>
                  {cat === c && <Check size={13} color={GOLD} />}
                </button>
              ))}
            </div>
            {/* Price */}
            <div style={{ ...glass(0.72), padding: "22px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Price Range</div>
              {PRICE_RANGES.map((r, i) => (
                <button key={r.label} onClick={() => changeFilter(() => setPriceIdx(i))} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                  padding: "9px 12px", borderRadius: 9, fontSize: 13.5, fontWeight: priceIdx === i ? 700 : 500,
                  color: priceIdx === i ? "#1a1a1a" : "#666",
                  background: priceIdx === i ? "rgba(184,134,11,0.1)" : "transparent",
                  border: `1px solid ${priceIdx === i ? "rgba(184,134,11,0.22)" : "transparent"}`,
                  cursor: "pointer", marginBottom: 3, textAlign: "left",
                }}>
                  <span>{r.label}</span>
                  {priceIdx === i && <Check size={13} color={GOLD} />}
                </button>
              ))}
            </div>
            {/* Rating */}
            <div style={{ ...glass(0.70), padding: "22px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Customer Rating</div>
              {[5, 4, 3].map(r => (
                <button key={r} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 9, border: "1px solid transparent", background: "transparent", cursor: "pointer", marginBottom: 3 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill={i < r ? GOLD : "none"} color={i < r ? GOLD : "#ddd"} />)}
                  </div>
                  <span style={{ fontSize: 13, color: "#666" }}>{r === 3 ? "3+" : `${r} stars`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ ...glass(0.72), padding: "64px 40px", textAlign: "center" }}>
                <Search size={36} color="#ddd" style={{ marginBottom: 16 }} />
                <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>No products found</div>
                <p style={{ color: "#888", fontSize: 14, marginBottom: 20 }}>Try adjusting your search or filters</p>
                <button onClick={() => { changeFilter(() => { setCat("All"); setPriceIdx(0); }); handleQueryChange(""); }} style={{ padding: "10px 24px", background: "rgba(26,26,26,0.88)", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20, marginBottom: 32 }}>
                  {paginated.map(p => (
                    <div key={p.id} style={{ ...glass(0.72), overflow: "hidden", transition: "transform 160ms, box-shadow 160ms" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 14px 48px rgba(0,50,120,0.13)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = "0 4px 32px rgba(0,50,120,0.07)"; }}>
                      <Link href={`/product/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
                        <div style={{ position: "relative" }}>
                          <img src={p.img} alt={p.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                          {p.tag && <span style={{ position: "absolute", top: 11, left: 11, fontSize: 11, fontWeight: 800, background: p.tagColor, color: "white", padding: "4px 12px", borderRadius: 20 }}>{p.tag}</span>}
                          {p.stock <= 10 && <span style={{ position: "absolute", top: 11, right: 11, fontSize: 11, fontWeight: 700, background: "rgba(220,38,38,0.85)", color: "white", padding: "4px 10px", borderRadius: 20 }}>Only {p.stock} left</span>}
                          {/* Wishlist heart — top-right when no stock badge */}
                          {p.stock > 10 && (
                            <button onClick={e => { e.preventDefault(); e.stopPropagation(); handleWishlist(p); }} style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.88)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "all 150ms" }}>
                              <Heart size={14} fill={has(p.id) ? "#DC2626" : "none"} color={has(p.id) ? "#DC2626" : "#888"} />
                            </button>
                          )}
                        </div>
                      </Link>
                      <div style={{ padding: "16px 18px 18px" }}>
                        <Link href={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
                          <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1a1a1a", marginBottom: 2 }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>{p.cat}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                            <Star size={12} fill={GOLD} color={GOLD} />
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#333" }}>{p.rating}</span>
                            <span style={{ fontSize: 12, color: "#bbb" }}>({p.reviews}+)</span>
                          </div>
                        </Link>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 19, fontWeight: 900, color: GOLD }}>${p.price}</span>
                            {p.originalPrice && <span style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>${p.originalPrice}</span>}
                            {/* Wishlist toggle for low-stock products */}
                            {p.stock <= 10 && (
                              <button onClick={() => handleWishlist(p)} style={{ width: 28, height: 28, borderRadius: 7, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Heart size={13} fill={has(p.id) ? "#DC2626" : "none"} color={has(p.id) ? "#DC2626" : "#aaa"} />
                              </button>
                            )}
                          </div>
                          <button onClick={() => handleAdd(p)} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", borderRadius: 9, border: "none",
                            background: added === p.id ? "rgba(5,150,105,0.88)" : inCart(p.id) ? "rgba(184,134,11,0.88)" : "rgba(26,26,26,0.88)",
                            color: "white", transition: "background 200ms",
                          }}>
                            {added === p.id ? <><Check size={13} /> Added!</> : <><ShoppingCart size={13} /> {inCart(p.id) ? "Add More" : "Add"}</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.65)", fontSize: 13.5, fontWeight: 600, color: page === 1 ? "#ccc" : "#333", cursor: page === 1 ? "not-allowed" : "pointer", backdropFilter: "blur(8px)" }}>
                      <ChevronLeft size={15} /> Prev
                    </button>
                    <div style={{ display: "flex", gap: 6 }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button key={n} onClick={() => setPage(n)} style={{
                          width: 36, height: 36, borderRadius: 9, border: "1px solid",
                          borderColor: n === page ? "rgba(184,134,11,0.4)" : "rgba(255,255,255,0.85)",
                          background: n === page ? "rgba(184,134,11,0.88)" : "rgba(255,255,255,0.65)",
                          color: n === page ? "white" : "#333", fontSize: 13.5, fontWeight: n === page ? 800 : 500,
                          cursor: "pointer", backdropFilter: "blur(8px)",
                        }}>{n}</button>
                      ))}
                    </div>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.65)", fontSize: 13.5, fontWeight: 600, color: page === totalPages ? "#ccc" : "#333", cursor: page === totalPages ? "not-allowed" : "pointer", backdropFilter: "blur(8px)" }}>
                      Next <ChevronRight size={15} />
                    </button>
                    <span style={{ fontSize: 13, color: "#888", marginLeft: 8 }}>Page {page} of {totalPages}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {/* Mobile filter drawer */}
      {sideOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }} onClick={() => setSideOpen(false)} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 280, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(28px)", padding: "28px 20px", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>Filters</span>
              <button onClick={() => setSideOpen(false)} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 8, padding: "6px 9px", cursor: "pointer" }}><X size={15} color="#555" /></button>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Category</div>
            {CATS.map(c => <button key={c} onClick={() => { changeFilter(() => setCat(c)); setSideOpen(false); }} style={{ display: "block", width: "100%", padding: "10px 14px", textAlign: "left", borderRadius: 9, border: "none", background: cat === c ? "rgba(184,134,11,0.1)" : "transparent", fontSize: 14, fontWeight: cat === c ? 700 : 500, color: cat === c ? "#1a1a1a" : "#666", cursor: "pointer", marginBottom: 3 }}>{c}</button>)}
            <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", margin: "20px 0 10px" }}>Price</div>
            {PRICE_RANGES.map((r, i) => <button key={r.label} onClick={() => { changeFilter(() => setPriceIdx(i)); setSideOpen(false); }} style={{ display: "block", width: "100%", padding: "10px 14px", textAlign: "left", borderRadius: 9, border: "none", background: priceIdx === i ? "rgba(184,134,11,0.1)" : "transparent", fontSize: 14, fontWeight: priceIdx === i ? 700 : 500, color: priceIdx === i ? "#1a1a1a" : "#666", cursor: "pointer", marginBottom: 3 }}>{r.label}</button>)}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .shop-sidebar { display: none !important; }
          .filter-toggle { display: flex !important; }
        }
        section > div[style*="gridTemplateColumns: 220px"] {
          grid-template-columns: 220px 1fr;
        }
        @media (max-width: 900px) {
          section > div[style*="220px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
