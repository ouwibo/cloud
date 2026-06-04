import { useState, type CSSProperties } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/articleStore";

const CAT_COLORS: Record<string, string> = {
  DeFi: "hsl(var(--primary))",
  "Layer 1": "#3b82f6",
  "Layer 2": "#0ea5e9",
  Infrastructure: "#06b6d4",
  Gaming: "#8b5cf6",
  Guide: "#10b981",
  Analysis: "#6366f1",
  News: "hsl(var(--primary))",
};

function fmt(iso: string) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 3600000;
  if (diff < 1) return "Just now";
  if (diff < 24) return `${Math.floor(diff)}h ago`;
  const days = Math.floor(diff / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CategoryGlyph({
  category,
  color,
}: {
  category: string;
  color: string;
}) {
  if (category === "Gaming") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
        <path
          d="M15 19h18c5 0 9 4 9 9.2 0 4.6-2.8 7.8-6.2 7.8-2.2 0-3.6-1.1-5.3-3.4H17.5C15.8 34.9 14.4 36 12.2 36 8.8 36 6 32.8 6 28.2 6 23 10 19 15 19Z"
          fill={color}
          opacity="0.22"
        />
        <path
          d="M16 24v8M12 28h8M30 26h.1M36 30h.1M30.5 15.5 27 20M17.5 15.5 21 20"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (category.includes("Layer")) {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
        <path
          d="m24 7 16 8.5-16 8.5L8 15.5 24 7Z"
          fill={color}
          opacity="0.28"
        />
        <path
          d="m8 24 16 8.5L40 24M8 32.5 24 41l16-8.5M8 15.5 24 24l16-8.5"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (category === "Guide") {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
        <path d="M13 8h17l5 5v27H13V8Z" fill={color} opacity="0.22" />
        <path
          d="M30 8v7h7M18 22h13M18 28h13M18 34h8"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <path
        d="M24 6c8.8 0 16 7.2 16 16 0 12-16 20-16 20S8 34 8 22C8 13.2 15.2 6 24 6Z"
        fill={color}
        opacity="0.2"
      />
      <path
        d="M18 22h12M18 28h8M24 14v6l5 3"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LazyCoverImage({
  src,
  alt,
  eager = false,
  className,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="lazy-premium absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-[opacity,filter,transform] duration-700 ease-out group-hover:scale-[1.045]",
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
          className,
        )}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

function MetaClock() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
      <path
        d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 5v3.4l2.3 1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Compact grid card ── */
export function ArticleCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const color = CAT_COLORS[article.category] ?? "hsl(var(--primary))";
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "premium-card premium-card-hover article-card-motion group flex flex-col overflow-hidden rounded-3xl border",
        className,
      )}
      style={{ "--article-accent": color } as CSSProperties}
    >
      {/* Thumbnail */}
      <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden bg-muted">
        {article.coverImage ? (
          <LazyCoverImage src={article.coverImage} alt={article.title} />
        ) : (
          <div
            className="article-illustration relative h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${color}18, ${color}42)`,
            }}
          >
            <span className="article-floating-icon absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 opacity-70">
              <CategoryGlyph category={article.category} color={color} />
            </span>
          </div>
        )}
        <div className="article-image-sheen" />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white shadow-lg"
          style={{ background: color }}
        >
          {article.category}
        </span>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="line-clamp-2 text-[14px] font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-[12px] leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-2.5">
          <span className="truncate text-[11px] font-bold text-foreground/80">
            {article.author}
          </span>
          <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <MetaClock />
            <span>{fmt(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readTime}m</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Hero card (featured, large) ── */
export function HeroArticleCard({ article }: { article: Article }) {
  const color = CAT_COLORS[article.category] ?? "hsl(var(--primary))";
  return (
    <Link
      href={`/article/${article.slug}`}
      className="premium-card premium-card-hover article-card-motion hero-article-card group grid overflow-hidden rounded-[1.75rem] border lg:grid-cols-[1.15fr_0.85fr]"
      style={{ "--article-accent": color } as CSSProperties}
    >
      {/* Large thumbnail */}
      <div className="relative h-[230px] w-full overflow-hidden bg-muted sm:h-[290px] lg:h-full">
        {article.coverImage ? (
          <LazyCoverImage src={article.coverImage} alt={article.title} eager />
        ) : (
          <div
            className="article-illustration relative flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}20 0%, ${color}58 100%)`,
            }}
          >
            <span className="article-floating-icon h-28 w-28 opacity-75">
              <CategoryGlyph category={article.category} color={color} />
            </span>
          </div>
        )}
        <div className="article-image-sheen" />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg"
          style={{ background: color }}
        >
          {article.category}
        </span>
      </div>
      {/* Body */}
      <div className="flex flex-col justify-center p-5 sm:p-6">
        <span className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
          Pinned Post
        </span>
        <h2 className="mb-2 text-[20px] font-black leading-tight text-foreground transition-colors group-hover:text-primary sm:text-[26px]">
          {article.title}
        </h2>
        <p className="mb-5 line-clamp-3 text-[13px] leading-7 text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
          <span className="font-bold text-foreground">{article.author}</span>
          <span>·</span>
          <span>{fmt(article.publishedAt)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <MetaClock /> {article.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
