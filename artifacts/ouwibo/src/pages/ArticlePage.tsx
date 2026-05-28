import { useParams, Link } from "wouter";
import type { ReactNode } from "react";
import { getAllArticles } from "@/lib/articleStore";
import { ArticleCard } from "@/components/ArticleCard";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

/* Inline markdown — handles **bold**, *italic*, `code`, and [text](url). */
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={key++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={key++}>{t.slice(1, -1)}</code>);
    else if (t.startsWith("[")) {
      const linkM = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(t);
      if (linkM) out.push(<a key={key++} href={linkM[2]} target="_blank" rel="noopener noreferrer">{linkM[1]}</a>);
      else out.push(t);
    } else out.push(<em key={key++}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const all     = getAllArticles();
  const article = all.find(a => a.slug === slug);
  const related = all.filter(a => a.slug !== slug && a.category === article?.category).slice(0, 3);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-3"><p className="text-4xl">📭</p><h1 className="text-[18px] font-bold">Article not found</h1><Link href="/news" className="text-[13px] text-primary hover:underline">← Back to News</Link></div>
    );
  }

  const pubDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">

      {/* ── Main content ── */}
      <article>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-4"><Link href="/" className="hover:text-foreground">Home</Link><span>/</span><Link href="/news" className="hover:text-foreground">News</Link><span>/</span><span className="text-foreground truncate max-w-[200px]">{article.title}</span></nav>

        {/* Category */}
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-primary mb-2">{article.category}</span>

        {/* Title */}
        <h1 className="text-[22px] sm:text-[26px] font-bold text-foreground leading-tight mb-3">{article.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground mb-4 pb-4 border-b border-border"><span className="font-medium text-foreground">{article.author}</span><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{pubDate}</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min read</span></div>

        {/* Cover image */}
        {article.coverImage && (
          <div className="rounded-xl overflow-hidden mb-6 border border-border"><img src={article.coverImage} alt={article.title} className="w-full h-auto object-cover max-h-[320px]" /></div>
        )}

        {/* Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-p:text-[14px] prose-p:leading-relaxed prose-p:text-foreground/90
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:text-[12px] prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
        ">
          {article.content.split("\n\n").map((para, i) => {
            if (para.startsWith("# "))    return <h1 key={i}>{renderInline(para.slice(2))}</h1>;
            if (para.startsWith("## "))   return <h2 key={i}>{renderInline(para.slice(3))}</h2>;
            if (para.startsWith("### "))  return <h3 key={i}>{renderInline(para.slice(4))}</h3>;
            if (para.startsWith("> "))    return <blockquote key={i}><p>{renderInline(para.slice(2))}</p></blockquote>;
            if (para.startsWith("- "))    return <ul key={i}>{para.split("\n").filter(Boolean).map((l, j) => <li key={j}>{renderInline(l.slice(2))}</li>)}</ul>;
            return <p key={i}>{renderInline(para)}</p>;
          })}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border"><Tag className="w-3.5 h-3.5 text-muted-foreground mt-0.5" />
            {article.tags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-8"><h3 className="text-[14px] font-bold mb-3">Related Articles</h3><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map(a => <ArticleCard key={a.id} article={a} />)}
            </div></section>
        )}
      </article>

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col gap-4 sticky top-[52px]"><div className="rounded-xl border border-border bg-card p-4"><h3 className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">More in {article.category}</h3><div className="space-y-3">
            {all.filter(a => a.category === article.category && a.slug !== slug).slice(0, 4).map(a => (
              <Link key={a.id} href={`/article/${a.slug}`} className="flex gap-2 group"><div className="w-14 h-10 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                  {a.coverImage
                    ? <img src={a.coverImage} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-primary/10" />
                  }
                </div><p className="text-[12px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{a.title}</p></Link>
            ))}
          </div></div></aside></div>
  );
}
