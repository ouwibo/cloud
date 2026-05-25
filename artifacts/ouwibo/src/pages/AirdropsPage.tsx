import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop, Backer } from "@/lib/mockData";
import {
  Star, ChevronRight, Search, LayoutList, LayoutGrid,
  CheckCircle2, HelpCircle, Banknote, ExternalLink,
} from "lucide-react";

/* ── Status ── */
const STATUS_ICON = {
  "Confirmed":       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
  "Potential":       <HelpCircle   className="w-3.5 h-3.5 text-amber-400  shrink-0" />,
  "Reward Available":<Banknote     className="w-3.5 h-3.5 text-blue-400   shrink-0" />,
} as const;

const STATUS_CLS = {
  "Confirmed":        "text-emerald-500",
  "Potential":        "text-amber-400",
  "Reward Available": "text-blue-400 font-semibold",
} as const;

/* ── Reward type ── */
const REWARD_CLS: Record<string, string> = {
  "Airdrop":          "text-primary",
  "Whitelist/Waitlist":"text-purple-400",
  "Points":           "text-cyan-400",
  "Token Sale":       "text-amber-400",
  "NFT":              "text-pink-400",
};

/* ── Task type badge ── */
const TYPE_CLS: Record<string, string> = {
  "Fill The Form":  "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Trading":        "bg-green-500/10 text-green-400 border border-green-500/20",
  "Testnet":        "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  "Social":         "bg-pink-500/10 text-pink-400 border border-pink-500/20",
  "Liquidity":      "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "Staking":        "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  "Mainnet":        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "Hold":           "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  "Referral":       "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  "Community":      "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

/* ── Shared: Project Logo ── */
function ProjectLogo({ airdrop, size = 36 }: { airdrop: Airdrop; size?: number }) {
  const [failed, setFailed] = useState(false);
  const s = `${size}px`;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold overflow-hidden shrink-0"
      style={{ width: s, height: s, background: airdrop.logoColor, fontSize: size * 0.3 }}
    >
      {airdrop.logoUrl && !failed
        ? <img src={airdrop.logoUrl} alt={airdrop.name} className="w-full h-full object-cover"
                onError={() => setFailed(true)} />
        : airdrop.logoInitial}
    </div>
  );
}

/* ── Shared: Backer Avatar ── */
function BackerRow({ backers, extra }: { backers?: Backer[]; extra?: number }) {
  if (!backers?.length && !extra) return <span className="text-[11px] text-muted-foreground">—</span>;
  return (
    <div className="flex items-center gap-0.5">
      {backers?.slice(0, 5).map((b, i) => {
        const [failed, setFailed] = useState(false);
        return (
          <div
            key={i}
            title={b.name}
            className="w-5 h-5 rounded-full overflow-hidden border border-background flex items-center justify-center text-white text-[7px] font-bold shrink-0"
            style={{ background: b.color, marginLeft: i > 0 ? "-4px" : 0, zIndex: 5 - i }}
          >
            {b.logoUrl && !failed
              ? <img src={b.logoUrl} alt={b.name} className="w-full h-full object-cover"
                      onError={() => setFailed(true)} />
              : b.initial}
          </div>
        );
      })}
      {(extra ?? 0) > 0 && (
        <span className="text-[9px] text-muted-foreground ml-1">+{extra}</span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TABLE ROW (desktop)
══════════════════════════════════════════════ */
const GRID = "grid grid-cols-[36px_minmax(190px,260px)_1fr_minmax(160px,200px)_120px_minmax(140px,180px)] items-center";

function TableRow({ a, bookmarked, onToggle }: { a: Airdrop; bookmarked: boolean; onToggle: () => void }) {
  const topTask = a.tasks[0];
  const extra   = a.tasks.length - 1;

  return (
    <div className={cn(GRID, "group border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors")}>
      {/* Star */}
      <div className="flex items-center justify-center h-full px-2 py-3"><button onClick={onToggle} className={cn("transition-colors", bookmarked ? "text-amber-400" : "text-muted-foreground/40 hover:text-amber-300")}><Star className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} /></button></div>

      {/* Name */}
      <div className="flex items-center gap-2.5 py-3 pr-2 min-w-0"><ProjectLogo airdrop={a} size={34} /><div className="min-w-0"><div className="flex items-center gap-1 flex-wrap"><span className="font-semibold text-[13px] truncate">{a.name}</span>
            {a.isNew && (
              <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide shrink-0">
                New
              </span>
            )}
          </div>
          {a.ticker && <span className="text-[10px] text-muted-foreground">{a.ticker}</span>}
        </div></div>

      {/* Task Type */}
      <div className="py-3 pr-3 min-w-0">
        {topTask ? (
          <div className="space-y-1"><p className="text-[10px] text-muted-foreground leading-none">
              Cost: <span className={topTask.cost === 0 ? "text-emerald-500 font-medium" : "text-amber-400 font-medium"}>
                {topTask.cost === 0 ? "Free" : `$${topTask.cost}`}
              </span><span className="mx-1.5 opacity-30">·</span>
              Time: <span className="text-foreground/70">{topTask.timeMin} min</span></p><div className="flex items-center gap-1.5 flex-nowrap overflow-hidden"><span className="text-[12px] font-medium truncate flex-shrink">{topTask.name}</span>
              {extra > 0 && <span className="text-[9px] text-cyan-400 font-bold shrink-0">+{extra}</span>}
              <Link href={`/airdrops/${a.slug}`} className="ml-auto shrink-0" onClick={e => e.stopPropagation()}><span className="inline-flex items-center gap-0.5 text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded-md font-semibold hover:opacity-90 transition-opacity">
                  View <ChevronRight className="w-2.5 h-2.5" /></span></Link></div><div className="flex items-center gap-1 flex-nowrap overflow-hidden">
              {topTask.types.slice(0, 2).map(t => (
                <span key={t} className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded", TYPE_CLS[t] ?? "bg-muted text-muted-foreground")}>
                  {t}
                </span>
              ))}
            </div></div>
        ) : (
          <span className="text-[11px] text-muted-foreground/60">No active tasks</span>
        )}
      </div>

      {/* Updated Status */}
      <div className="py-3 pr-2"><div className="flex items-center gap-1.5 mb-0.5">
          {STATUS_ICON[a.status]}
          <span className={cn("text-[11px] font-medium truncate", STATUS_CLS[a.status])}>{a.status}</span></div><p className="text-[10px] text-muted-foreground pl-5">{a.statusDate}</p></div>

      {/* Reward Type */}
      <div className="py-3 pr-2"><span className={cn("text-[11px] font-medium", REWARD_CLS[a.rewardType] ?? "text-foreground")}>
          {a.rewardType}
        </span></div>

      {/* Raise / Backers */}
      <div className="py-3 pr-3">
        {a.raiseFunds
          ? <p className="text-[12px] font-semibold mb-1">{a.raiseFunds}</p>
          : <p className="text-[11px] text-muted-foreground mb-1">—</p>
        }
        <BackerRow backers={a.backers} extra={a.backersExtra} /></div></div>
  );
}

/* ══════════════════════════════════════════════
   PREMIUM CARD (card view)
══════════════════════════════════════════════ */
function AirdropCard({ a, bookmarked, onToggle }: { a: Airdrop; bookmarked: boolean; onToggle: () => void }) {
  const topTask = a.tasks[0];
  return (
    <div className="flex flex-col border border-border/60 rounded-2xl bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 group">
      {/* Header */}
      <div className="p-4 pb-3"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-3"><ProjectLogo airdrop={a} size={44} /><div><div className="flex items-center gap-1.5 flex-wrap"><span className="font-bold text-[14px] leading-tight">{a.name}</span>
                {a.isNew && (
                  <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold uppercase">New</span>
                )}
              </div>
              {a.ticker && <span className="text-[11px] text-muted-foreground">{a.ticker}</span>}
            </div></div><div className="flex items-center gap-1.5"><div className="flex items-center gap-1">
              {STATUS_ICON[a.status]}
            </div><button onClick={onToggle} className={cn(bookmarked ? "text-amber-400" : "text-muted-foreground/30 hover:text-amber-300")}><Star className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} /></button></div></div>

        {/* Status + reward + funds */}
        <div className="flex items-center gap-2 text-[11px] mb-3 flex-wrap"><span className={cn("font-medium", STATUS_CLS[a.status])}>{a.status}</span><span className="text-muted-foreground/40">·</span><span className={cn("font-medium", REWARD_CLS[a.rewardType] ?? "")}>{a.rewardType}</span>
          {a.raiseFunds && (
            <><span className="text-muted-foreground/40">·</span><span className="font-semibold text-foreground">{a.raiseFunds}</span></>
          )}
        </div>

        {/* Top task card */}
        {topTask ? (
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3 mb-3"><div className="flex items-start justify-between gap-2 mb-1.5"><span className="text-[12px] font-semibold leading-tight">{topTask.name}</span>
              {a.tasks.length > 1 && (
                <span className="text-[9px] text-cyan-400 font-bold shrink-0">+{a.tasks.length - 1}</span>
              )}
            </div><div className="flex items-center gap-1.5 flex-wrap">
              {topTask.types.map(t => (
                <span key={t} className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-md", TYPE_CLS[t] ?? "bg-muted text-muted-foreground")}>
                  {t}
                </span>
              ))}
              <span className="text-muted-foreground/40 mx-0.5">·</span><span className={cn("text-[10px] font-semibold", topTask.cost === 0 ? "text-emerald-500" : "text-amber-400")}>
                {topTask.cost === 0 ? "Free" : `$${topTask.cost}`}
              </span><span className="text-muted-foreground/40">·</span><span className="text-[10px] text-muted-foreground">{topTask.timeMin} min</span></div></div>
        ) : (
          <div className="bg-muted/20 border border-border/30 rounded-xl p-3 mb-3 flex items-center justify-center"><span className="text-[11px] text-muted-foreground">No active tasks — check back soon</span></div>
        )}

        {/* Backers */}
        <BackerRow backers={a.backers} extra={a.backersExtra} /></div>

      {/* Footer */}
      <div className="mt-auto border-t border-border/40 px-4 py-2.5 flex items-center justify-between bg-muted/10"><span className="text-[10px] text-muted-foreground">{a.statusDate}</span><Link href={`/airdrops/${a.slug}`}><span className="text-[11px] font-semibold text-primary group-hover:underline flex items-center gap-0.5">
            View Details <ChevronRight className="w-3 h-3" /></span></Link></div></div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const FILTER_TABS = ["All", "Confirmed", "Potential", "Reward Available"];
const REWARD_TABS = ["All", "Airdrop", "Whitelist/Waitlist", "Points", "Token Sale"];

export default function AirdropsPage() {
  const [tab,         setTab]         = useState("All");
  const [rewardTab,   setRewardTab]   = useState("All");
  const [search,      setSearch]      = useState("");
  const [view,        setView]        = useState<"table" | "cards">("table");
  const [bookmarks,   setBookmarks]   = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setBookmarks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = mockAirdrops.filter(a => {
    if (tab !== "All" && a.status !== tab) return false;
    if (rewardTab !== "All" && a.rewardType !== rewardTab) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    confirmed: mockAirdrops.filter(a => a.status === "Confirmed").length,
    potential: mockAirdrops.filter(a => a.status === "Potential").length,
    reward:    mockAirdrops.filter(a => a.status === "Reward Available").length,
  };

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between"><div><h1 className="text-[20px] font-bold tracking-tight">Airdrop Radar</h1><p className="text-[12px] text-muted-foreground mt-0.5"><span className="text-emerald-500 font-medium">{counts.confirmed} Confirmed</span><span className="mx-1.5 text-muted-foreground/40">·</span><span className="text-amber-400 font-medium">{counts.potential} Potential</span><span className="mx-1.5 text-muted-foreground/40">·</span><span className="text-blue-400 font-medium">{counts.reward} Reward Available</span></p></div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40"><button
            onClick={() => setView("table")}
            className={cn("w-8 h-7 rounded-md flex items-center justify-center transition-colors",
              view === "table" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          ><LayoutList className="w-3.5 h-3.5" /></button><button
            onClick={() => setView("cards")}
            className={cn("w-8 h-7 rounded-md flex items-center justify-center transition-colors",
              view === "cards" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          ><LayoutGrid className="w-3.5 h-3.5" /></button></div></div>

      {/* Filters */}
      <div className="space-y-2">
        {/* Status tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {FILTER_TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-1 rounded-full text-[11px] font-medium transition-colors border",
                tab === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground border-border/40 hover:border-border hover:text-foreground bg-muted/20"
              )}
            >
              {t === "Confirmed" && <CheckCircle2 className="w-2.5 h-2.5 inline mr-1 text-emerald-400" />}
              {t === "Potential" && <HelpCircle className="w-2.5 h-2.5 inline mr-1 text-amber-400" />}
              {t === "Reward Available" && <Banknote className="w-2.5 h-2.5 inline mr-1 text-blue-400" />}
              {t}
            </button>
          ))}

          {/* Search */}
          <div className="ml-auto flex items-center gap-1.5 bg-muted/30 border border-border/40 rounded-full px-3 py-1"><Search className="w-3 h-3 text-muted-foreground" /><input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="text-[11px] bg-transparent outline-none w-32 placeholder:text-muted-foreground/50"
            /></div></div>

        {/* Reward type tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {REWARD_TABS.map(t => (
            <button
              key={t}
              onClick={() => setRewardTab(t)}
              className={cn(
                "px-2.5 py-0.5 rounded text-[10px] font-medium transition-colors",
                rewardTab === t ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div></div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="overflow-x-auto rounded-xl border border-border/60">
          {/* Header */}
          <div className={cn(GRID, "bg-muted/30 border-b border-border/60")}><div /><div className="py-2.5 pr-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Name</div><div className="py-2.5 pr-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Task Type</div><div className="py-2.5 pr-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</div><div className="py-2.5 pr-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Reward</div><div className="py-2.5 pr-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Raise / Backers</div></div>

          {/* Rows */}
          <div className="bg-card/60">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground"><Search className="w-8 h-8 opacity-30" /><p className="text-[13px]">No airdrops match your filter</p></div>
            ) : (
              filtered.map(a => (
                <TableRow key={a.id} a={a} bookmarked={bookmarks.has(a.id)} onToggle={() => toggle(a.id)} />
              ))
            )}
          </div></div>
      )}

      {/* CARDS VIEW */}
      {view === "cards" && (
        <>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground"><Search className="w-8 h-8 opacity-30" /><p className="text-[13px]">No airdrops match your filter</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(a => (
                <AirdropCard key={a.id} a={a} bookmarked={bookmarks.has(a.id)} onToggle={() => toggle(a.id)} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
