import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import {
  isAdminLoggedIn, adminLogout, getAllArticles, saveArticle, deleteArticle, slugify
} from "@/lib/articleStore";
import type { Article } from "@/lib/articleStore";
import { PenLine, Trash2, Eye, EyeOff, Plus, LogOut, ArrowLeft } from "lucide-react";

const CATEGORIES = ["News", "DeFi", "Layer 1", "Layer 2", "Infrastructure", "Gaming", "Guide", "Analysis"];
const EMPTY = {
  title: "", slug: "", excerpt: "", content: "", category: "News",
  tags: "", author: "OuwiboCloud", coverImage: "", featured: false,
};

export default function AdminPage() {
  const [, nav]      = useLocation();
  const [view, setView] = useState<"list" | "write">("list");
  const [form, setForm] = useState({ ...EMPTY });
  const [preview, setPreview] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!isAdminLoggedIn()) nav("/admin/login");
    else setArticles(getAllArticles());
  }, []);

  function refresh() { setArticles(getAllArticles()); }

  function set(k: string, v: any) { setForm(f => ({ ...f, [k]: v })); }

  function handleSave() {
    if (!form.title || !form.content) return;
    saveArticle({
      title:      form.title,
      slug:       form.slug || slugify(form.title),
      excerpt:    form.excerpt,
      content:    form.content,
      category:   form.category,
      tags:       form.tags.split(",").map(t => t.trim()).filter(Boolean),
      author:     form.author,
      coverImage: form.coverImage,
      featured:   form.featured,
    });
    setSaved(true);
    setTimeout(() => { setSaved(false); setForm({ ...EMPTY }); setView("list"); refresh(); }, 1000);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    deleteArticle(id);
    refresh();
  }

  if (!isAdminLoggedIn()) return null;

  /* ── Write form ── */
  if (view === "write") {
    return (
      <div className="max-w-3xl mx-auto"><div className="flex items-center justify-between mb-5"><button onClick={() => setView("list")} className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3.5 h-3.5" /> Back
          </button><div className="flex items-center gap-2"><button onClick={() => setPreview(v => !v)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {preview ? "Edit" : "Preview"}
            </button><button onClick={handleSave} disabled={!form.title || !form.content}
              className="h-8 px-4 rounded-lg bg-primary text-primary-foreground text-[12px] font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
              {saved ? "Saved ✓" : "Publish"}
            </button></div></div>

        {preview ? (
          <div className="rounded-xl border border-border bg-card p-6"><span className="text-[11px] text-primary font-semibold uppercase tracking-wide">{form.category}</span><h1 className="text-[22px] font-bold mt-1 mb-2">{form.title || "Untitled"}</h1><p className="text-[13px] text-muted-foreground mb-4">{form.excerpt}</p><div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-[14px]">
              {form.content.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div></div>
        ) : (
          <div className="space-y-3"><input value={form.title} onChange={e => set("title", e.target.value)}
              placeholder="Article title…"
              className="w-full h-10 px-3 rounded-lg border border-border bg-card text-[15px] font-semibold outline-none focus:border-primary placeholder:text-muted-foreground transition" /><div className="grid grid-cols-2 sm:grid-cols-4 gap-2"><select value={form.category} onChange={e => set("category", e.target.value)}
                className="h-8 px-2 rounded-lg border border-border bg-card text-[12px] outline-none focus:border-primary">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select><input value={form.author} onChange={e => set("author", e.target.value)}
                placeholder="Author" className="h-8 px-2 rounded-lg border border-border bg-card text-[12px] outline-none focus:border-primary placeholder:text-muted-foreground" /><input value={form.tags} onChange={e => set("tags", e.target.value)}
                placeholder="Tags (comma sep.)" className="h-8 px-2 rounded-lg border border-border bg-card text-[12px] outline-none focus:border-primary placeholder:text-muted-foreground col-span-2" /></div><input value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
              placeholder="Short excerpt (shown in cards)…"
              className="w-full h-8 px-3 rounded-lg border border-border bg-card text-[12px] outline-none focus:border-primary placeholder:text-muted-foreground transition" /><input value={form.coverImage} onChange={e => set("coverImage", e.target.value)}
              placeholder="Cover image URL (optional)…"
              className="w-full h-8 px-3 rounded-lg border border-border bg-card text-[12px] outline-none focus:border-primary placeholder:text-muted-foreground transition" /><textarea value={form.content} onChange={e => set("content", e.target.value)}
              placeholder={"Write your article here…\n\nUse ## for headings, > for quotes, - for lists.\n\nSeparate paragraphs with blank lines."}
              rows={18}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-[13px] leading-relaxed outline-none focus:border-primary placeholder:text-muted-foreground resize-y transition font-mono" /><label className="flex items-center gap-2 text-[12px] text-muted-foreground cursor-pointer select-none"><input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)}
                className="w-3.5 h-3.5 accent-primary" />
              Feature this article on the home page
            </label></div>
        )}
      </div>
    );
  }

  /* ── Article list ── */
  return (
    <div><div className="flex items-center justify-between mb-5"><div><h1 className="text-[17px] font-bold">Editorial Panel</h1><p className="text-[12px] text-muted-foreground mt-0.5">{articles.length} articles total</p></div><div className="flex items-center gap-2"><button onClick={() => { setView("write"); setForm({ ...EMPTY }); }}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-[12px] font-semibold hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> New Article
          </button><button onClick={() => { adminLogout(); nav("/"); }}
            className="h-8 px-3 rounded-lg border border-border text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"><LogOut className="w-3.5 h-3.5" /> Logout
          </button></div></div><div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
        {articles.length === 0 && (
          <div className="flex flex-col items-center py-10 text-center gap-2"><PenLine className="w-6 h-6 text-muted-foreground" /><p className="text-[13px] font-medium">No articles yet</p><p className="text-[12px] text-muted-foreground">Click "New Article" to write your first post.</p></div>
        )}
        {articles.map(a => (
          <div key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"><div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-[10px] font-semibold text-primary uppercase tracking-wide">{a.category}</span>
                {a.featured && <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">FEATURED</span>}
              </div><p className="text-[13px] font-semibold text-foreground truncate">{a.title}</p><p className="text-[11px] text-muted-foreground">{a.author} · {new Date(a.publishedAt).toLocaleDateString()} · {a.readTime}m</p></div><div className="flex items-center gap-1.5 flex-shrink-0"><Link href={`/article/${a.slug}`}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5" /></Link><button onClick={() => handleDelete(a.id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></div></div>
        ))}
      </div></div>
  );
}
