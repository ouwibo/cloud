import { useState } from "react";
import { getAllArticles } from "@/lib/articleStore";
import { ArticleCard, HeroArticleCard } from "@/components/ArticleCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Search, Sparkles } from "lucide-react";

const CATS = [
  "All",
  "News",
  "DeFi",
  "Layer 1",
  "Layer 2",
  "Infrastructure",
  "Gaming",
  "Guide",
  "Analysis",
];

export default function NewsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const all = getAllArticles();
  const filtered = all.filter(
    (a) =>
      (cat === "All" || a.category === cat) &&
      (!q ||
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(q.toLowerCase())),
  );
  const hero = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="premium-page space-y-4 pb-8 sm:space-y-5">
      {/* Header */}
      <ScrollReveal>
        <div className="premium-panel relative overflow-hidden rounded-3xl border p-4 sm:p-6">
          <div className="pointer-events-none absolute right-4 top-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative grid gap-4 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <div className="mb-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3 w-3 shrink-0" />
                <span className="truncate">Airdrop Journal</span>
              </div>
              <h1 className="premium-heading text-[24px] font-black leading-tight sm:text-[34px]">
                News & Analysis
              </h1>
              <p className="mt-1 max-w-2xl text-[13px] leading-6 text-muted-foreground">
                Update airdrop, DeFi, dan Web3 tersusun rapi untuk dibaca cepat
                di desktop maupun ponsel.
              </p>
            </div>
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search articles…"
                className="h-11 w-full rounded-2xl border border-border bg-card/75 pl-10 pr-3 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Category tabs */}
      <ScrollReveal delay={80}>
        <div className="flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-none [-webkit-overflow-scrolling:touch]">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`h-8 flex-shrink-0 rounded-full px-3.5 text-[12px] font-bold transition-[background-color,color,transform,box-shadow] hover:-translate-y-0.5 ${
                cat === c
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                  : "bg-card/70 text-muted-foreground ring-1 ring-border/50 hover:bg-muted hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-[14px] font-semibold">No articles found</p>
            <p className="text-[12px] text-muted-foreground">
              Try a different category or search term.
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="space-y-6">
          {hero && (
            <ScrollReveal delay={120}>
              <HeroArticleCard article={hero} />
            </ScrollReveal>
          )}
          {rest.length > 0 && (
            <section className="space-y-3">
              <ScrollReveal delay={160}>
                <div className="flex items-center justify-between">
                  <h2 className="text-[14px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    Postingan Terbaru
                  </h2>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground">
                    {rest.length} posts
                  </span>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {rest.map((a, index) => (
                  <ScrollReveal key={a.id} delay={Math.min(index * 70, 280)}>
                    <ArticleCard article={a} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
