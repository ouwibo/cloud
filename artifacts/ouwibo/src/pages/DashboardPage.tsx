import { Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop } from "@/lib/mockData";
import { TrendingUp, Zap, Clock, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Tier badge ── */
const TIER_CLS: Record<string, string> = {
  S: "bg-amber-500 text-white",
  A: "bg-blue-500 text-white",
  B: "bg-slate-500 text-white",
  C: "bg-slate-400 text-white",
};
function Tier({ t }: { t: string }) {
  return <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded", TIER_CLS[t] ?? "bg-muted text-muted-foreground")}>{t}</span>;
}

/* ── Score dot ── */
function Dot({ v }: { v: number }) {
  return <span className={cn("text-[10px] font-bold tabular-nums",
    v >= 9 ? "text-emerald-500" : v >= 7 ? "text-amber-500" : "text-red-400")}>{v}</span>;
}

/* ── Compact landscape airdrop row ── */
function AirdropRow({ a, rank }: { a: Airdrop; rank: number }) {
  const topTask = a.tasks[0];
  return (
    <Link href={`/airdrops/${a.slug}`}>
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border/40 hover:bg-muted/30 transition-colors cursor-pointer group">
        {/* Rank */}
        <span className="w-5 text-[10px] text-muted-foreground text-center tabular-nums shrink-0">
          {rank}
        </span>

        {/* Logo */}
        <div
          className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden"
          style={{ background: a.logoColor }}
        >
          {a.logoUrl
            ? <img src={a.logoUrl} alt={a.name} className="w-full h-full object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
            : a.logoInitial}
        </div>

        {/* Name + tier */}
        <div className="w-36 shrink-0 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold truncate">{a.name}</span>
            <Tier t={a.tier} />
          </div>
          {a.ticker && <span className="text-[10px] text-muted-foreground">${a.ticker}</span>}
        </div>

        {/* Funding + heat */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-muted-foreground w-44 shrink-0">
          <span>Funding <strong className="text-foreground">{a.funding}</strong></span>
          <span>Heat <strong className="text-foreground">{a.heat.toLocaleString()}</strong></span>
        </div>

        {/* Top task */}
        <div className="flex-1 min-w-0 hidden md:block">
          {topTask && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground truncate">{topTask.name}</span>
              <span className={cn("text-[9px] font-medium shrink-0",
                topTask.cost === "Free" ? "text-emerald-500" : "text-amber-500")}>
                {topTask.cost}
              </span>
            </div>
          )}
        </div>

        {/* Scores */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex flex-col items-center w-7">
            <Dot v={a.scores.token} />
            <span className="text-[8px] text-muted-foreground leading-none">Tok</span>
          </div>
          <div className="flex flex-col items-center w-7">
            <Dot v={a.scores.value} />
            <span className="text-[8px] text-muted-foreground leading-none">Val</span>
          </div>
          <div className="flex flex-col items-center w-7">
            <Dot v={a.scores.heat} />
            <span className="text-[8px] text-muted-foreground leading-none">Heat</span>
          </div>
          <span className="text-[11px] font-bold text-primary ml-1 w-12 text-right">
            {a.score}/100
          </span>
        </div>

        {/* Go button */}
        {topTask && (
          <a
            href={topTask.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="shrink-0 text-[10px] px-2 py-1 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Go →
          </a>
        )}

        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
      </div>
    </Link>
  );
}

/* ── Stat strip ── */
const STATS = [
  { label: "Total",      icon: Zap,          color: "text-primary"        },
  { label: "Active",     icon: TrendingUp,   color: "text-emerald-500"    },
  { label: "Not Listed", icon: Clock,        color: "text-amber-500"      },
  { label: "Tasks",      icon: CheckCircle2, color: "text-blue-500"       },
];

export default function DashboardPage() {
  const airdrops   = mockAirdrops;
  const active     = airdrops.filter(a => a.badges.includes("Active")).length;
  const notListed  = airdrops.filter(a => !a.isListed).length;
  const totalTasks = airdrops.reduce((s, a) => s + a.tasksTotal, 0);
  const statValues = [airdrops.length, active, notListed, totalTasks];

  const hour    = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const top      = [...airdrops].sort((a, b) => b.score - a.score).slice(0, 5);
  const newest   = [...airdrops].slice(0, 6);

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">{greeting} 👋</p>
          <h1 className="text-[22px] font-bold tracking-tight leading-tight">
            Ouwibo <span className="text-primary">Cloud</span>
          </h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Track and join the best crypto airdrops
          </p>
        </div>
        <Link href="/airdrops">
          <span className="text-[12px] text-primary font-medium hover:underline">
            View all →
          </span>
        </Link>
      </div>

      {/* ── Stat strip ── */}
      <div className="grid grid-cols-4 gap-2.5">
        {STATS.map((s, i) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-3.5 py-3 flex items-center gap-2.5">
            <s.icon className={cn("w-4 h-4 shrink-0", s.color)} />
            <div>
              <p className="text-[18px] font-bold leading-none">{statValues[i]}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        {/* Left: airdrop list */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="text-[13px] font-semibold">Latest Airdrops</h2>
            <Link href="/airdrops">
              <span className="text-[11px] text-primary hover:underline">See all →</span>
            </Link>
          </div>

          {airdrops.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-3xl mb-3">🪂</span>
              <p className="text-[14px] font-semibold">No airdrops yet</p>
              <p className="text-[12px] text-muted-foreground mt-1">Add data in mockData.ts to get started</p>
            </div>
          ) : (
            newest.map((a, i) => <AirdropRow key={a.id} a={a} rank={i + 1} />)
          )}
        </div>

        {/* Right: top ranked + quick links */}
        <div className="space-y-3">
          {/* Top by score */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-[13px] font-semibold">🏆 Top Ranked</h2>
            </div>
            {top.length === 0 ? (
              <p className="text-[12px] text-muted-foreground px-4 py-4">No data yet</p>
            ) : top.map((a, i) => (
              <Link href={`/airdrops/${a.slug}`} key={a.id}>
                <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <span className="text-[10px] text-muted-foreground w-4 tabular-nums">{i + 1}</span>
                  <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-[9px] font-bold overflow-hidden"
                    style={{ background: a.logoColor }}>
                    {a.logoUrl
                      ? <img src={a.logoUrl} alt={a.name} className="w-full h-full object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
                      : a.logoInitial}
                  </div>
                  <span className="flex-1 text-[12px] font-medium truncate">{a.name}</span>
                  <Tier t={a.tier} />
                  <span className="text-[11px] font-bold text-primary">{a.score}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Free / low cost picks */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-[13px] font-semibold">🆓 Free Picks</h2>
            </div>
            {airdrops.filter(a => a.suitableFor.includes("Free")).length === 0 ? (
              <p className="text-[12px] text-muted-foreground px-4 py-4">No free airdrops yet</p>
            ) : airdrops.filter(a => a.suitableFor.includes("Free")).slice(0, 4).map(a => (
              <Link href={`/airdrops/${a.slug}`} key={a.id}>
                <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="w-6 h-6 rounded-md shrink-0 flex items-center justify-center text-white text-[8px] font-bold overflow-hidden"
                    style={{ background: a.logoColor }}>
                    {a.logoInitial}
                  </div>
                  <span className="flex-1 text-[12px] font-medium truncate">{a.name}</span>
                  <span className="text-[9px] text-emerald-500 font-medium border border-emerald-200 dark:border-emerald-800 rounded-full px-1.5 py-0.5">
                    Free
                  </span>
                  {a.tasks[0] && (
                    <a href={a.tasks[0].url} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-[9px] px-1.5 py-0.5 bg-primary text-primary-foreground rounded font-medium hover:opacity-90">
                      Go
                    </a>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
