import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/articleStore";

const CAT_COLORS: Record<string, string> = {
  "DeFi":           "hsl(var(--primary))",
  "Layer 1":        "#8b5cf6",
  "Layer 2":        "#3b82f6",
  "Infrastructure": "#06b6d4",
  "Gaming":         "#f43f5e",
  "Guide":          "#f59e0b",
  "Analysis":       "#a855f7",
  "News":           "hsl(var(--primary))",
};

function fmt(iso: string) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 3600000;
  if (diff < 1)  return "Just now";
  if (diff < 24) return `${Math.floor(diff)}h ago`;
  const days = Math.floor(diff / 24);
  if (days < 7)  return `${days}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ── Compact grid card ── */
export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  const color = CAT_COLORS[article.category] ?? "hsl(var(--primary))";
  return (
    <Link href={`/article/${article.slug}`}
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-[transform,box-shadow,opacity,border-color,background-color] duration-200",
        className
      )}>
      {/* Thumbnail */}
      <div className="h-[140px] w-full overflow-hidden bg-muted flex items-center justify-center relative">
        {article.coverImage
          ? <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
          : <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}><span className="absolute inset-0 flex items-center justify-center text-3xl opacity-30 select-none">
                {article.category === "DeFi" ? "" : article.category === "Layer 1" ? "⛓️" : article.category === "Gaming" ? "🎮" : "📰"}
              </span></div>
        }
      </div>
      {/* Body */}
      <div className="p-3 flex flex-col flex-1 gap-1.5"><span className="text-[10px] font-semibold tracking-wide uppercase" style={{ color }}>{article.category}</span><h3 className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3><p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">{article.excerpt}</p><div className="flex items-center justify-between mt-auto pt-1.5 border-t border-border/50"><span className="text-[11px] text-muted-foreground font-medium">{article.author}</span><div className="flex items-center gap-2 text-[11px] text-muted-foreground"><span>{fmt(article.publishedAt)}</span><span>·</span><span>{article.readTime}m</span></div></div></div></Link>
  );
}

/* ── Hero card (featured, large) ── */
export function HeroArticleCard({ article }: { article: Article }) {
  const color = CAT_COLORS[article.category] ?? "hsl(var(--primary))";
  return (
    <Link href={`/article/${article.slug}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-[transform,box-shadow,opacity,border-color,background-color] duration-200">
      {/* Large thumbnail */}
      <div className="h-[220px] sm:h-[260px] w-full overflow-hidden bg-muted relative">
        {article.coverImage
          ? <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
          : <div className="w-full h-full flex items-center justify-center"
               style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}55 100%)` }}><span className="text-6xl opacity-25 select-none">📰</span></div>
        }
        <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full text-white"
          style={{ background: color }}>{article.category}</span></div>
      {/* Body */}
      <div className="p-4"><h2 className="text-[17px] sm:text-[19px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-1.5">{article.title}</h2><p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p><div className="flex items-center gap-2 text-[12px] text-muted-foreground"><span className="font-medium text-foreground">{article.author}</span><span>·</span><span>{fmt(article.publishedAt)}</span><span>·</span><span>{article.readTime} min read</span></div></div></Link>
  );
}
