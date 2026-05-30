import { useState } from "react";
import { getAllArticles } from "@/lib/articleStore";
import { ArticleCard, HeroArticleCard } from "@/components/ArticleCard";
import { Search } from "lucide-react";

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
    <div className="premium-page space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[18px] font-bold">News & Analysis</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Crypto airdrops, DeFi, and Web3 coverage
          </p>
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search articles…"
            className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-card text-[12px] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`flex-shrink-0 h-7 px-3 rounded-full text-[12px] font-medium transition-colors ${
              cat === c
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center gap-3">
          <p className="text-4xl"></p>
          <p className="text-[14px] font-semibold">No articles found</p>
          <p className="text-[12px] text-muted-foreground">
            Try a different category or search term.
          </p>
        </div>
      ) : (
        <div className="premium-page space-y-6">
          {hero && <HeroArticleCard article={hero} />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
