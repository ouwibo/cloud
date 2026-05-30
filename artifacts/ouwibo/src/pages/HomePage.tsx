import { Link } from "wouter";
import { getAllArticles } from "@/lib/articleStore";
import { HeroArticleCard, ArticleCard } from "@/components/ArticleCard";
import { AirdropLogo } from "@/components/AirdropLogo";
import { mockAirdrops } from "@/lib/mockData";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";

export default function HomePage() {
  const all = getAllArticles();
  const hero = all.find((a) => a.featured) ?? all[0];
  const latest = all.filter((a) => a !== hero).slice(0, 6);
  const featuredAirdrops = mockAirdrops.slice(0, 5);

  return (
    <div className="premium-page space-y-8">
      {/* ── Hero + sidebar ── */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          {hero && <HeroArticleCard article={hero} />}

          <div className="flex flex-col gap-4">
            <div className="premium-panel rounded-2xl border p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <h3 className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Trending
                </h3>
              </div>
              <ol className="space-y-3">
                {all.slice(0, 4).map((a, i) => (
                  <li key={a.id}>
                    <Link
                      href={`/article/${a.slug}`}
                      className="flex gap-2.5 group"
                    >
                      <span className="text-[20px] font-bold text-border leading-none mt-0.5 flex-shrink-0 w-5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {a.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {a.readTime}m · {a.category}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest articles grid ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-foreground">
            Latest Articles
          </h2>
          <Link
            href="/news"
            className="flex items-center gap-1 text-[12px] text-primary font-medium hover:underline"
          >
            See all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* ── Featured Airdrops ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" />
            <h2 className="text-[15px] font-bold text-foreground">
              Featured Airdrops
            </h2>
          </div>
          <Link
            href="/airdrops"
            className="flex items-center gap-1 text-[12px] text-primary font-medium hover:underline"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="premium-panel overflow-hidden rounded-2xl border divide-y divide-border/60">
          {featuredAirdrops.map((drop) => (
            <Link
              key={drop.id}
              href={`/airdrops/${drop.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors w-full"
            >
              <AirdropLogo
                name={drop.name}
                logoUrl={drop.logoUrl}
                logoInitial={drop.logoInitial}
                logoColor={drop.logoColor}
                size={32}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-foreground truncate">
                    {drop.name}
                  </span>
                  {drop.isNew && (
                    <span className="text-[8px] bg-emerald-500 text-white px-1 py-0.5 rounded shrink-0">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">
                  {drop.rewardType} · {drop.chain ?? "Crypto"}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-[12px] font-semibold text-primary">
                  {drop.tasks[0]
                    ? drop.tasks[0].cost === 0
                      ? "Free"
                      : `$${drop.tasks[0].cost}`
                    : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {drop.status}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="premium-panel rounded-2xl border p-6 text-center">
        <h2 className="text-[16px] font-bold mb-1">
          Stay ahead of the next big airdrop
        </h2>
        <p className="text-[13px] text-muted-foreground mb-4">
          Weekly digest of the best opportunities, analysis, and news.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 h-9 px-3 rounded-lg border border-border bg-background text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
          />
          <button
            type="submit"
            className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
