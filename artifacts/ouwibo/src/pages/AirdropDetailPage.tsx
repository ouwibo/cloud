import { useState } from "react";
import { useParams, Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import type { Backer } from "@/lib/mockData";
import {
  ArrowLeft, ExternalLink, Star, Clock, DollarSign,
  CheckCircle2, HelpCircle, Banknote, ChevronRight,
  Zap, Users, TrendingUp, Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Task type colors ── */
const TYPE_CLS: Record<string, string> = {
  "Fill The Form": "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  "Trading":       "bg-green-500/15 text-green-400 border border-green-500/20",
  "Testnet":       "bg-purple-500/15 text-purple-400 border border-purple-500/20",
  "Social":        "bg-pink-500/15 text-pink-400 border border-pink-500/20",
  "Liquidity":     "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  "Staking":       "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20",
  "Mainnet":       "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  "Hold":          "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  "Referral":      "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
  "Community":     "bg-rose-500/15 text-rose-400 border border-rose-500/20",
};

const STATUS_ICON = {
  "Confirmed":        <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  "Potential":        <HelpCircle   className="w-4 h-4 text-amber-400" />,
  "Reward Available": <Banknote     className="w-4 h-4 text-blue-400" />,
} as const;

const STATUS_CLS = {
  "Confirmed":        "text-emerald-500",
  "Potential":        "text-amber-400",
  "Reward Available": "text-blue-400",
} as const;

/* ── Logo with fallback ── */
function Logo({ logoUrl, logoColor, logoInitial, size = 56 }: {
  logoUrl: string; logoColor: string; logoInitial: string; size?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden flex items-center justify-center text-white font-bold shrink-0"
      style={{ width: size, height: size, background: logoColor, fontSize: size * 0.28 }}
    >
      {logoUrl && !failed
        ? <img src={logoUrl} className="w-full h-full object-cover" onError={() => setFailed(true)} />
        : logoInitial}
    </div>
  );
}

/* ── Backer avatar ── */
function BackerAvatar({ b }: { b: Backer }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      title={b.name}
      className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-[9px] font-bold shrink-0 border-2 border-background"
      style={{ background: b.color }}
    >
      {b.logoUrl && !failed
        ? <img src={b.logoUrl} className="w-full h-full object-cover" onError={() => setFailed(true)} />
        : b.initial}
    </div>
  );
}

export default function AirdropDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const airdrop  = mockAirdrops.find(a => a.slug === slug);
  const [bookmarked, setBookmarked] = useState(false);

  if (!airdrop) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-center"><HelpCircle className="w-12 h-12 text-muted-foreground/30" /><h1 className="text-[18px] font-bold">Airdrop not found</h1><p className="text-[13px] text-muted-foreground">The project you're looking for doesn't exist.</p><Link href="/airdrops"><span className="text-[13px] text-primary hover:underline flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back to Airdrops
          </span></Link></div>
    );
  }

  const freeTasks = airdrop.tasks.filter(t => t.cost === 0);
  const paidTasks = airdrop.tasks.filter(t => t.cost > 0);

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link href="/airdrops"><span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back to Airdrops
        </span></Link>

      {/* ── Hero card ── */}
      <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
        {/* Colored accent bar */}
        <div className="h-1 w-full" style={{ background: airdrop.logoColor }} /><div className="p-5"><div className="flex items-start gap-4 flex-wrap"><Logo
              logoUrl={airdrop.logoUrl ?? ""}
              logoColor={airdrop.logoColor}
              logoInitial={airdrop.logoInitial}
              size={60}
            /><div className="flex-1 min-w-0"><div className="flex items-start justify-between gap-3 flex-wrap"><div><div className="flex items-center gap-2 flex-wrap mb-1"><h1 className="text-[22px] font-bold tracking-tight">{airdrop.name}</h1>
                    {airdrop.ticker && (
                      <span className="text-[13px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{airdrop.ticker}</span>
                    )}
                    {airdrop.isNew && (
                      <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
                    )}
                  </div><div className="flex items-center gap-2 flex-wrap"><div className="flex items-center gap-1.5">
                      {STATUS_ICON[airdrop.status]}
                      <span className={cn("text-[13px] font-semibold", STATUS_CLS[airdrop.status])}>{airdrop.status}</span></div><span className="text-muted-foreground/40">·</span><div className="flex items-center gap-1 text-[12px] text-muted-foreground"><Calendar className="w-3 h-3" /> {airdrop.statusDate}
                    </div><span className="text-muted-foreground/40">·</span><span className="text-[12px] text-muted-foreground">{airdrop.rewardType}</span></div></div><div className="flex items-center gap-2">
                  {airdrop.websiteUrl && (
                    <a href={airdrop.websiteUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground border border-border/60 rounded-lg px-3 py-1.5 transition-colors"><ExternalLink className="w-3.5 h-3.5" /> Website
                    </a>
                  )}
                  <button
                    onClick={() => setBookmarked(v => !v)}
                    className={cn("flex items-center gap-1.5 text-[12px] border rounded-lg px-3 py-1.5 transition-colors",
                      bookmarked
                        ? "border-amber-400/60 text-amber-400 bg-amber-400/5"
                        : "border-border/60 text-muted-foreground hover:text-foreground")}
                  ><Star className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} />
                    {bookmarked ? "Saved" : "Save"}
                  </button></div></div></div></div></div></div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <DollarSign className="w-4 h-4 text-primary" />, label: "Raise", value: airdrop.raiseFunds ?? "Undisclosed" },
          { icon: <Zap className="w-4 h-4 text-amber-400" />, label: "Total Tasks", value: airdrop.tasks.length.toString() },
          { icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, label: "Free Tasks", value: freeTasks.length.toString() },
          { icon: <Users className="w-4 h-4 text-blue-400" />, label: "Backers", value: airdrop.backers ? `${airdrop.backers.length}${(airdrop.backersExtra ?? 0) > 0 ? `+${airdrop.backersExtra}` : ""}` : "—" },
        ].map(({ icon, label, value }) => (
          <div key={label} className="border border-border/60 rounded-xl p-3.5 bg-card flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">{icon}</div><div><p className="text-[16px] font-bold leading-tight">{value}</p><p className="text-[10px] text-muted-foreground">{label}</p></div></div>
        ))}
      </div>

      {/* ── Tasks + Backers ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tasks — 2/3 width */}
        <div className="lg:col-span-2 border border-border/60 rounded-2xl bg-card overflow-hidden"><div className="px-5 py-3.5 border-b border-border/60 flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /><h2 className="text-[14px] font-bold">All Tasks</h2><span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">{airdrop.tasks.length}</span></div>

          {airdrop.tasks.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground"><div className="text-center"><CheckCircle2 className="w-10 h-10 mx-auto mb-2 opacity-20" /><p className="text-[13px]">No active tasks — reward may be claimable</p></div></div>
          ) : (
            <div className="divide-y divide-border/40">
              {airdrop.tasks.map((task, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-4 group/row hover:bg-muted/20 transition-colors"><div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-muted text-muted-foreground shrink-0">
                    {i + 1}
                  </div><div className="flex-1 min-w-0"><p className="text-[13px] font-semibold mb-1 truncate">{task.name}</p><div className="flex items-center gap-1.5 flex-wrap">
                      {task.types.map(t => (
                        <span key={t} className={cn("text-[9px] font-semibold px-1.5 py-0.5 rounded-md", TYPE_CLS[t] ?? "bg-muted text-muted-foreground")}>
                          {t}
                        </span>
                      ))}
                      <span className="text-muted-foreground/30 text-[10px]">·</span><span className={cn("text-[10px] font-semibold", task.cost === 0 ? "text-emerald-500" : "text-amber-400")}>
                        {task.cost === 0 ? "Free" : `$${task.cost}`}
                      </span><span className="text-muted-foreground/30 text-[10px]">·</span><div className="flex items-center gap-0.5 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" /> {task.timeMin} min
                      </div></div></div><a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 text-[11px] font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Go <ChevronRight className="w-3 h-3" /></a></div>
              ))}
            </div>
          )}
        </div>

        {/* Backers — 1/3 width */}
        <div className="space-y-3">
          {/* Backers card */}
          <div className="border border-border/60 rounded-2xl bg-card overflow-hidden"><div className="px-4 py-3.5 border-b border-border/60 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><h2 className="text-[14px] font-bold">Backers</h2></div><div className="p-4">
              {!airdrop.backers?.length ? (
                <p className="text-[12px] text-muted-foreground italic">Undisclosed</p>
              ) : (
                <div className="space-y-2">
                  {airdrop.backers.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5"><BackerAvatar b={b} /><span className="text-[12px] font-medium truncate">{b.name}</span></div>
                  ))}
                  {(airdrop.backersExtra ?? 0) > 0 && (
                    <p className="text-[11px] text-muted-foreground pt-1">+{airdrop.backersExtra} more investors</p>
                  )}
                </div>
              )}
            </div></div>

          {/* Summary card */}
          <div className="border border-border/60 rounded-2xl bg-card p-4 space-y-2.5"><h2 className="text-[13px] font-bold mb-3">Quick Summary</h2>
            {[
              { label: "Status",      value: airdrop.status,      cls: STATUS_CLS[airdrop.status] },
              { label: "Reward Type", value: airdrop.rewardType,  cls: "text-foreground" },
              { label: "Raise",       value: airdrop.raiseFunds ?? "Undisclosed", cls: "text-foreground font-semibold" },
              { label: "Free Tasks",  value: `${freeTasks.length} / ${airdrop.tasks.length}`, cls: "text-emerald-500 font-semibold" },
            ].map(({ label, value, cls }) => (
              <div key={label} className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">{label}</span><span className={cn("text-[11px]", cls)}>{value}</span></div>
            ))}
          </div></div></div></div>
  );
}
