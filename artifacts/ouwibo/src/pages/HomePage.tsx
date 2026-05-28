import { Link } from "wouter";
import { getAllArticles } from "@/lib/articleStore";
import { HeroArticleCard, ArticleCard } from "@/components/ArticleCard";
import { mockAirdrops } from "@/lib/mockData";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  active:   "text-emerald-600 dark:text-emerald-400",
  upcoming: "text-amber-600 dark:text-amber-400",
  ended:    "text-muted-foreground",
};
const STATUS_BG: Record<string, string> = {
  active:   "bg-emerald-50 dark:bg-emerald-900/20",
  upcoming: "bg-amber-50 dark:bg-amber-900/20",
  ended:    "bg-muted",
};

export default function HomePage() {
  const all      = getAllArticles();
  const hero     = all.find(a => a.featured) ?? all[0];
  const latest   = all.filter(a => a !== hero).slice(0, 6);
  const airdrops = mockAirdrops.filter(a => a.status === "active").slice(0, 5);

  return (
    <div className="space-y-8">

      {/* ── Hero + sidebar ── */}
      <section><div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          {/* Hero article */}
          {hero && <HeroArticleCard article={hero} />}

          {/* Trending sidebar */}
          <div className="flex flex-col gap-4"><div className="rounded-xl border border-border bg-card p-4"><div className="flex items-center gap-1.5 mb-3"><TrendingUp className="w-3.5 h-3.5 text-primary" /><h3 className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Trending</h3></div><ol className="space-y-3">
                {all.slice(0, 4).map((a, i) => (
                  <li key={a.id}><Link href={`/article/${a.slug}`} className="flex gap-2.5 group"><span className="text-[20px] font-bold text-border leading-none mt-0.5 flex-shrink-0 w-5">{i + 1}</span><div><p className="text-[12px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{a.title}</p><p className="text-[11px] text-muted-foreground mt-0.5">{a.readTime}m · {a.category}</p></div></Link></li>
                ))}
              </ol></div></div></div></section>

      {/* ── Latest articles grid ── */}
      <section><div className="flex items-center justify-between mb-4"><h2 className="text-[15px] font-bold text-foreground">Latest Articles</h2><Link href="/news" className="flex items-center gap-1 text-[12px] text-primary font-medium hover:underline">
            See all <ArrowRight className="w-3 h-3" /></Link></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latest.map(a => <ArticleCard key={a.id} article={a} />)}
        </div></section>

      {/* ── Featured Airdrops ── */}
      <section><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /><h2 className="text-[15px] font-bold text-foreground">Active Airdrops</h2></div><Link href="/airdrops" className="flex items-center gap-1 text-[12px] text-primary font-medium hover:underline">
            View all <ArrowRight className="w-3 h-3" /></Link></div><div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {airdrops.map((drop) => (
            <Link key={drop.id} href={`/airdrops/${drop.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
              {/* Logo */}
              <div className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: drop.logoColor }}>
                {drop.logoInitial}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0"><div className="flex items-center gap-1.5"><span className="text-[13px] font-semibold text-foreground">{drop.name}</span>
                  {drop.isVerified && <span className="text-primary text-[10px]">✓</span>}
                </div><p className="text-[11px] text-muted-foreground truncate">{drop.category} · {drop.chain}</p></div>
              {/* Reward */}
              <div className="text-right flex-shrink-0"><p className="text-[12px] font-semibold text-primary">{drop.rewardEstimate}</p><p className="text-[10px] text-muted-foreground capitalize">{drop.difficulty}</p></div>
              {/* Status */}
              <span className={`hidden sm:inline text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 capitalize ${STATUS_COLOR[drop.status]} ${STATUS_BG[drop.status]}`}>
                {drop.status}
              </span></Link>
          ))}
        </div></section>

      {/* ── Newsletter CTA ── */}
      <section className="rounded-xl border border-border bg-card p-6 text-center"><h2 className="text-[16px] font-bold mb-1">Stay ahead of the next big airdrop</h2><p className="text-[13px] text-muted-foreground mb-4">Weekly digest of the best opportunities, analysis, and news.</p><form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"><input type="email" placeholder="your@email.com"
            className="flex-1 h-9 px-3 rounded-lg border border-border bg-background text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition" /><button type="submit"
            className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity">
            Subscribe
          </button></form></section></div>
  );
}
