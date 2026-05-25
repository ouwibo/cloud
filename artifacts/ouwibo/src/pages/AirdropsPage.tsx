import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop } from "@/lib/mockData";
import { Star, ChevronRight } from "lucide-react";

/* ── Status config ── */
const STATUS_EMOJI = { "Confirmed": "👌", "Potential": "🤔", "Reward Available": "🤑" } as const;
const STATUS_CLS   = {
  "Confirmed":       "text-foreground",
  "Potential":       "text-foreground",
  "Reward Available":"text-blue-400 font-semibold",
} as const;

/* ── Reward type color ── */
const REWARD_CLS: Record<string, string> = {
  "Airdrop":          "text-foreground",
  "Whitelist/Waitlist":"text-purple-400",
  "Points":           "text-amber-400",
  "Token Sale":       "text-green-400",
  "NFT":              "text-pink-400",
};

/* ── Task type badge color ── */
const TYPE_CLS: Record<string, string> = {
  "Fill The Form":  "text-blue-400",
  "Trading":        "text-green-400",
  "Testnet":        "text-purple-400",
  "Social":         "text-pink-400",
  "Liquidity":      "text-amber-400",
  "Staking":        "text-indigo-400",
  "Mainnet":        "text-emerald-400",
  "Hold":           "text-orange-400",
  "Referral":       "text-cyan-400",
  "Community":      "text-rose-400",
  "NFT":            "text-fuchsia-400",
};

/* ── Moni Score bar ── */
function MoniBar({ score }: { score: number }) {
  const MAX = 8000;
  const pct = Math.min(100, (score / MAX) * 100);
  const dotColor = pct > 66 ? "#4ade80" : pct > 33 ? "#facc15" : "#f87171";
  return (
    <div className="flex flex-col items-start gap-1.5 w-full">
      <span className="text-[15px] font-bold tracking-tight text-foreground leading-none">
        {score.toLocaleString()}
      </span>
      <div
        className="relative w-full h-[5px] rounded-full overflow-visible"
        style={{ background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e)" }}
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-background shadow"
          style={{ left: `calc(${pct}% - 6px)`, background: dotColor }}
        />
      </div>
    </div>
  );
}

/* ── Backer avatars ── */
function BackerStack({ backers, extra }: { backers?: Airdrop["backers"]; extra?: number }) {
  if (!backers?.length) return <span className="text-[13px] text-muted-foreground">-</span>;
  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-1.5">
        {backers.slice(0, 4).map((b, i) => (
          <span
            key={i}
            className="w-6 h-6 rounded-full border-2 border-card flex items-center justify-center text-[9px] font-bold text-white shrink-0"
            style={{ background: b.color }}
          >
            {b.initial}
          </span>
        ))}
      </div>
      {extra ? <span className="text-[11px] text-muted-foreground ml-0.5">+{extra}</span> : null}
    </div>
  );
}

/* ── Task type cell ── */
function TaskCell({ airdrop, bookmarked }: { airdrop: Airdrop; bookmarked: boolean }) {
  const top = airdrop.tasks[0];
  if (!top) {
    return (
      <div className="flex items-center justify-between gap-2 w-full">
        <span className="text-[12px] text-orange-400">No active tasks</span>
        <Link href={`/airdrops/${airdrop.slug}`}>
          <button className="shrink-0 w-7 h-7 rounded-lg bg-primary/80 hover:bg-primary flex items-center justify-center transition-colors">
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </button>
        </Link>
      </div>
    );
  }
  const extra = airdrop.tasks.length - 1;
  const shownTypes = top.types.slice(0, 2);
  const moreTypes  = (top.types.length - 2) + (airdrop.tasks.length - 1);

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground leading-none mb-1">
          Cost: <span className="text-foreground font-medium">${top.cost}</span>
          {"  "}Time: <span className="text-foreground font-medium">{top.timeMin} min</span>
        </p>
        <p className="text-[13px] font-medium leading-none flex items-center gap-1.5 flex-wrap">
          {shownTypes.map(t => (
            <span key={t} className={cn("font-medium", TYPE_CLS[t] ?? "text-foreground")}>{t}</span>
          ))}
          {shownTypes.length > 1 && <span className="text-muted-foreground">,</span>}
          {moreTypes > 0 && (
            <span className="text-[11px] text-cyan-400 font-semibold">+{moreTypes}</span>
          )}
        </p>
      </div>
      <Link href={`/airdrops/${airdrop.slug}`}>
        <button className={cn(
          "shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
          bookmarked ? "bg-primary" : "bg-primary/70 hover:bg-primary"
        )}>
          <ChevronRight className="w-3.5 h-3.5 text-white" />
        </button>
      </Link>
    </div>
  );
}

/* ── Filters ── */
const STATUS_FILTERS = ["All", "Confirmed", "Potential", "Reward Available"] as const;
const REWARD_FILTERS = ["All", "Airdrop", "Whitelist/Waitlist", "Points", "Token Sale", "NFT"] as const;

export default function AirdropsPage() {
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [statusF, setStatusF]     = useState("All");
  const [rewardF, setRewardF]     = useState("All");
  const [search, setSearch]       = useState("");

  function toggleBookmark(id: number) {
    setBookmarks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = mockAirdrops.filter(a => {
    if (statusF !== "All" && a.status !== statusF) return false;
    if (rewardF !== "All" && a.rewardType !== rewardF) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-3">
      {/* Page header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-[18px] font-bold">Airdrop Radar</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            {mockAirdrops.filter(a => a.status !== "Reward Available").length} active ·{" "}
            {mockAirdrops.filter(a => a.status === "Reward Available").length} reward available
          </p>
        </div>
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search projects…"
          className="text-[13px] bg-card border border-border rounded-lg px-3 py-1.5 outline-none focus:border-primary/60 w-52 placeholder:text-muted-foreground"
        />
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          {STATUS_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setStatusF(f)}
              className={cn(
                "text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors",
                statusF === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1 flex-wrap">
          {REWARD_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setRewardF(f)}
              className={cn(
                "text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors",
                rewardF === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[860px] border-collapse">
          {/* Head */}
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="w-8 px-3 py-2.5" />
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-[220px]">Name</th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Task Type</th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-[170px]">Updated Status</th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-[140px]">Reward Type</th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-[160px]">Raise / Funds</th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-[130px]">Moni Score</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border/50 bg-card">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 text-center text-[13px] text-muted-foreground">
                  No airdrops found
                </td>
              </tr>
            )}
            {filtered.map(a => {
              const bk = bookmarks.has(a.id);
              return (
                <tr key={a.id} className="hover:bg-muted/20 transition-colors group">
                  {/* Star */}
                  <td className="px-3 py-3 w-8">
                    <button
                      onClick={() => toggleBookmark(a.id)}
                      className={cn("transition-colors", bk ? "text-amber-400" : "text-muted-foreground/40 hover:text-amber-400")}
                    >
                      <Star className={cn("w-3.5 h-3.5", bk && "fill-amber-400")} />
                    </button>
                  </td>

                  {/* Name */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative shrink-0">
                        {a.isNew && (
                          <span className="absolute -top-1.5 -left-1 text-[8px] font-bold bg-blue-500 text-white px-1 rounded z-10 leading-none py-0.5">
                            New
                          </span>
                        )}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 overflow-hidden"
                          style={{ background: a.logoColor }}
                        >
                          {a.logoUrl
                            ? <img src={a.logoUrl} alt={a.name} className="w-full h-full object-cover" />
                            : a.logoInitial}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold leading-tight truncate">{a.name}</p>
                        {a.ticker && (
                          <p className="text-[11px] text-muted-foreground leading-tight">{a.ticker}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Task type */}
                  <td className="px-3 py-3">
                    <TaskCell airdrop={a} bookmarked={bk} />
                  </td>

                  {/* Updated status */}
                  <td className="px-3 py-3">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[16px] leading-none mt-0.5">
                        {STATUS_EMOJI[a.status]}
                      </span>
                      <div>
                        <p className={cn("text-[12px] font-medium leading-tight", STATUS_CLS[a.status])}>
                          {a.status}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{a.statusDate}</p>
                      </div>
                    </div>
                  </td>

                  {/* Reward type */}
                  <td className="px-3 py-3">
                    <span className={cn("text-[12px] font-medium", REWARD_CLS[a.rewardType] ?? "text-foreground")}>
                      {a.rewardType}
                    </span>
                  </td>

                  {/* Raise / Funds */}
                  <td className="px-3 py-3">
                    <div className="space-y-1">
                      {a.raiseFunds
                        ? <p className="text-[12px] font-semibold">{a.raiseFunds}</p>
                        : <p className="text-[12px] text-muted-foreground">-</p>}
                      <BackerStack backers={a.backers} extra={a.backersExtra} />
                    </div>
                  </td>

                  {/* Moni score */}
                  <td className="px-3 py-3">
                    <MoniBar score={a.moniScore} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
