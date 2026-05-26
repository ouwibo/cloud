import { Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop } from "@/lib/mockData";
import { TrendingUp, Zap, Clock, CheckCircle2, ChevronRight, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Moni score gradient bar (mini) ── */
function MiniBar({ score }: { score: number }) {
  const pct = Math.min(100, (score / 10000) * 100);
  return (
    <div className="relative h-1 w-full rounded-full overflow-hidden mt-1"
         style={{ background: "linear-gradient(to right,#ef4444,#f97316,#eab308,#22c55e)" }}><div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white border border-black/20"
           style={{ left: `max(0px, calc(${pct}% - 3px))` }} /></div>
  );
}

/* ── Status badge ── */
const S_EMOJI = { "Confirmed":"", "Potential":"", "Reward Available":"" } as const;

/* ── Compact airdrop row for dashboard ── */
function AirdropRow({ a, rank }: { a: Airdrop; rank: number }) {
  const task = a.tasks[0];
  return (
    <Link href={`/airdrops/${a.slug}`}><div className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer border-b border-border/30 last:border-0"><span className="text-[11px] text-muted-foreground w-5 text-center shrink-0">{rank}</span>

        {/* logo */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
             style={{ background: a.logoColor }}>
          {a.logoInitial}
        </div>

        {/* name + task */}
        <div className="flex-1 min-w-0"><div className="flex items-center gap-1.5 mb-0.5"><span className="text-[13px] font-semibold truncate">{a.name}</span>
            {a.ticker && <span className="text-[10px] text-muted-foreground shrink-0">{a.ticker}</span>}
            {a.isNew && <span className="text-[8px] bg-emerald-500 text-white px-1 py-0.5 rounded shrink-0">NEW</span>}
          </div>
          {task ? (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className={task.cost === 0 ? "text-emerald-500 font-medium" : "text-amber-500 font-medium"}>
                {task.cost === 0 ? "Free" : `$${task.cost}`}
              </span><span>· {task.timeMin}min ·</span><span className="truncate">{task.types[0]}</span></div>
          ) : (
            <span className="text-[11px] text-muted-foreground">No active tasks</span>
          )}
        </div>

        {/* status */}
        <div className="text-right shrink-0 hidden sm:block"><div className="text-[11px] flex items-center gap-1 justify-end"><span>{S_EMOJI[a.status]}</span><span className={cn("font-medium", a.status === "Reward Available" ? "text-blue-400" : "text-foreground")}>
              {a.status}
            </span></div><div className="text-[10px] text-muted-foreground">{a.statusDate}</div></div>

        {/* score */}
        <div className="shrink-0 w-20 hidden md:block"><div className="text-[12px] font-bold text-right">{(a.moniScore ?? 0).toLocaleString()}</div><MiniBar score={a.moniScore ?? 0} /></div><ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" /></div></Link>
  );
}

/* ═══════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════ */
export default function DashboardPage() {
  const airdrops = mockAirdrops;

  const total     = airdrops.length;
  const confirmed = airdrops.filter(a => a.status === "Confirmed").length;
  const potential = airdrops.filter(a => a.status === "Potential").length;
  const rewards   = airdrops.filter(a => a.status === "Reward Available").length;
  const free      = airdrops.filter(a => a.tasks.some(t => t.cost === 0)).length;

  const top     = [...airdrops].sort((a, b) => (b.moniScore ?? 0) - (a.moniScore ?? 0)).slice(0, 6);
  const newest  = airdrops.filter(a => a.isNew).slice(0, 4);
  const rewardA = airdrops.filter(a => a.status === "Reward Available");

  /* greeting */
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4"><div><h1 className="text-[20px] font-bold">{greet} </h1><p className="text-[13px] text-muted-foreground mt-0.5">
            {total} airdrops tracked · {confirmed} confirmed · {rewards} reward{rewards !== 1 ? "s" : ""} available
          </p></div><Link href="/airdrops"><button className="text-[12px] px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shrink-0">
            View All →
          </button></Link></div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",     value: total,     icon: <Zap className="w-4 h-4" />,          cls: "text-primary" },
          { label: "Confirmed", value: confirmed, icon: <CheckCircle2 className="w-4 h-4" />, cls: "text-emerald-500" },
          { label: "Potential", value: potential, icon: <Clock className="w-4 h-4" />,        cls: "text-amber-500" },
          { label: "Free Tasks",value: free,      icon: <Gift className="w-4 h-4" />,         cls: "text-blue-400" },
        ].map(({ label, value, icon, cls }) => (
          <div key={label} className="border border-border rounded-xl p-3.5 bg-card/60 backdrop-blur-sm"><div className={cn("mb-2", cls)}>{icon}</div><div className="text-[22px] font-bold leading-none">{value}</div><div className="text-[11px] text-muted-foreground mt-1">{label}</div></div>
        ))}
      </div>

      {/* ── Two columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Top ranked (2/3 width) */}
        <div className="lg:col-span-2 border border-border rounded-xl bg-card/60 backdrop-blur-sm overflow-hidden"><div className="flex items-center justify-between px-4 py-3 border-b border-border/50"><div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /><span className="text-[13px] font-semibold">Top Ranked</span></div><Link href="/airdrops" className="text-[11px] text-primary hover:underline">See all →</Link></div><div>
            {top.length === 0 ? (
              <p className="text-[13px] text-muted-foreground text-center py-8">No airdrops yet</p>
            ) : (
              top.map((a, i) => <AirdropRow key={a.id} a={a} rank={i + 1} />)
            )}
          </div></div>

        {/* Right column (1/3 width) */}
        <div className="space-y-4">

          {/* Reward Available */}
          <div className="border border-border rounded-xl bg-card/60 backdrop-blur-sm overflow-hidden"><div className="flex items-center gap-2 px-4 py-3 border-b border-border/50"><span className="text-base"></span><span className="text-[13px] font-semibold">Claim Now</span></div>
            {rewardA.length === 0 ? (
              <p className="text-[12px] text-muted-foreground text-center py-6">None available</p>
            ) : (
              <div>
                {rewardA.map((a) => (
                  <Link key={a.id} href={`/airdrops/${a.slug}`}><div className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer border-b border-border/30 last:border-0"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                           style={{ background: a.logoColor }}>
                        {a.logoInitial}
                      </div><div className="flex-1 min-w-0"><p className="text-[12px] font-medium truncate">{a.name}</p><p className="text-[10px] text-blue-400">Reward Available</p></div><ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" /></div></Link>
                ))}
              </div>
            )}
          </div>

          {/* New this week */}
          <div className="border border-border rounded-xl bg-card/60 backdrop-blur-sm overflow-hidden"><div className="flex items-center gap-2 px-4 py-3 border-b border-border/50"><span className="text-base"></span><span className="text-[13px] font-semibold">New This Week</span></div>
            {newest.length === 0 ? (
              <p className="text-[12px] text-muted-foreground text-center py-6">No new airdrops</p>
            ) : (
              <div>
                {newest.map((a) => (
                  <Link key={a.id} href={`/airdrops/${a.slug}`}><div className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer border-b border-border/30 last:border-0"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                           style={{ background: a.logoColor }}>
                        {a.logoInitial}
                      </div><div className="flex-1 min-w-0"><p className="text-[12px] font-medium truncate">{a.name}</p><p className="text-[10px] text-muted-foreground">
                          {a.tasks[0] ? (a.tasks[0].cost === 0 ? "Free" : `$${a.tasks[0].cost}`) : "—"} · {a.rewardType}
                        </p></div><span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-medium shrink-0">NEW</span></div></Link>
                ))}
              </div>
            )}
          </div></div></div></div>
  );
}
