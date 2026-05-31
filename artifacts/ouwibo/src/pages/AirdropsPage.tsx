import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop, Backer } from "@/lib/mockData";
import {
  Banknote,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  LayoutGrid,
  LayoutList,
  Search,
  Star,
} from "lucide-react";
import { useScrollAnim } from "@/hooks/useScrollAnim";

const STATUS_ICON = {
  Confirmed: <CheckCircle2 className="h-3 w-3 shrink-0" />,
  Potential: <HelpCircle className="h-3 w-3 shrink-0" />,
  "Reward Available": <Banknote className="h-3 w-3 shrink-0" />,
} as const;

const STATUS_BADGE = {
  Confirmed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  Potential: "border-amber-500/25 bg-amber-500/10 text-amber-400",
  "Reward Available": "border-sky-500/25 bg-sky-500/10 text-sky-400",
} as const;

const TYPE_CLS: Record<string, string> = {
  "Fill The Form": "border-sky-500/20 bg-sky-500/10 text-sky-400",
  Trading: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Testnet: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  Social: "border-pink-500/20 bg-pink-500/10 text-pink-400",
  Liquidity: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Staking: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
  Mainnet: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Hold: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  Referral: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  Community: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

const FILTER_TABS = ["All", "Confirmed", "Potential", "Reward Available"];
const REWARD_TABS = [
  "All",
  "Airdrop",
  "Whitelist/Waitlist",
  "Points",
  "Token Sale",
];

function ProjectLogo({
  airdrop,
  size = 44,
}: {
  airdrop: Airdrop;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="grid shrink-0 place-items-center overflow-hidden rounded-2xl text-white shadow-sm ring-1 ring-white/10"
      style={{ width: size, height: size, background: airdrop.logoColor }}
    >
      {airdrop.logoUrl && !failed ? (
        <img
          src={airdrop.logoUrl}
          alt={airdrop.name}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-[13px] font-black tracking-tight">
          {airdrop.logoInitial}
        </span>
      )}
    </div>
  );
}

function BackerAvatar({ backer, index }: { backer: Backer; index: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      title={backer.name}
      className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-card text-[7px] font-black text-white shadow-sm"
      style={{
        background: backer.color,
        marginLeft: index > 0 ? "-7px" : 0,
        zIndex: 10 - index,
      }}
    >
      {backer.logoUrl && !failed ? (
        <img
          src={backer.logoUrl}
          alt={backer.name}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        backer.initial
      )}
    </div>
  );
}

function BackerRow({ backers, extra }: { backers?: Backer[]; extra?: number }) {
  if (!backers?.length && !extra)
    return <span className="text-[11px] text-muted-foreground">—</span>;

  return (
    <div className="flex items-center justify-end">
      {backers?.slice(0, 4).map((b, i) => (
        <BackerAvatar key={`${b.name}-${i}`} backer={b} index={i} />
      ))}
      {(extra ?? 0) > 0 && (
        <span className="ml-2 text-[11px] font-semibold text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Airdrop["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-bold",
        STATUS_BADGE[status],
      )}
    >
      {STATUS_ICON[status]}
      {status}
    </span>
  );
}

function TypePills({ types, max = 2 }: { types: string[]; max?: number }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
      {types.slice(0, max).map((type) => (
        <span
          key={type}
          className={cn(
            "rounded-md border px-2 py-1 text-[10px] font-bold leading-none",
            TYPE_CLS[type] ?? "border-border bg-muted text-muted-foreground",
          )}
        >
          {type}
        </span>
      ))}
      {types.length > max && (
        <span className="text-[10px] font-black text-primary">
          +{types.length - max}
        </span>
      )}
    </div>
  );
}

function AirdropRow({
  a,
  bookmarked,
  onToggle,
}: {
  a: Airdrop;
  bookmarked: boolean;
  onToggle: () => void;
}) {
  const topTask = a.tasks[0];
  const totalCost = a.tasks.reduce((sum, task) => sum + task.cost, 0);
  const totalTime = a.tasks.reduce((sum, task) => sum + task.timeMin, 0);

  return (
    <Link href={`/airdrops/${a.slug}`} className="group block">
      <article className="premium-card premium-card-hover grid min-h-[92px] grid-cols-1 gap-4 rounded-2xl border p-4 sm:grid-cols-[minmax(220px,1.15fr)_120px_minmax(220px,1fr)_130px_44px] sm:items-center lg:grid-cols-[minmax(260px,1.25fr)_130px_minmax(280px,1fr)_150px_44px]">
        <div className="flex min-w-0 items-center gap-3">
          <ProjectLogo airdrop={a} />
          <div className="min-w-0 space-y-2">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-[14px] font-black leading-tight tracking-tight text-foreground group-hover:text-primary">
                {a.name}
              </h3>
              {a.isNew && (
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black uppercase leading-none text-white">
                  New
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <StatusBadge status={a.status} />
              <span className="inline-flex h-7 items-center rounded-full border border-border/70 bg-background/60 px-2.5 text-[11px] font-bold text-muted-foreground">
                {a.rewardType}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-1 sm:border-l sm:border-border/40 sm:pl-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:hidden">
            Cost / time
          </div>
          <div className="flex items-center gap-3 sm:block">
            <p
              className={cn(
                "text-[15px] font-black leading-none",
                totalCost === 0 ? "text-emerald-400" : "text-amber-400",
              )}
            >
              {totalCost === 0 ? "Free" : `$${totalCost}`}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Clock className="h-3 w-3" /> {totalTime} min
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <p className="truncate text-[13px] font-bold leading-tight text-foreground">
            {topTask?.name ?? "No active tasks"}
          </p>
          {topTask ? (
            <TypePills types={topTask.types} />
          ) : (
            <span className="text-[11px] text-muted-foreground">
              No requirement listed
            </span>
          )}
          {a.tasks.length > 1 && (
            <p className="text-[11px] font-semibold text-muted-foreground">
              +{a.tasks.length - 1} more task{a.tasks.length > 2 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Funding
            </p>
            <p className="mt-1 text-[12px] font-black text-foreground">
              {a.raiseFunds ?? "—"}
            </p>
          </div>
          <div className="mt-0 sm:mt-3">
            <BackerRow backers={a.backers} extra={a.backersExtra} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/40 pt-3 sm:block sm:border-t-0 sm:pt-0 sm:text-right">
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggle();
            }}
            className={cn(
              "inline-grid h-10 w-10 place-items-center rounded-xl border transition-all duration-200 hover:scale-105",
              bookmarked
                ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                : "border-border/60 bg-background/50 text-muted-foreground hover:text-amber-300",
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark airdrop"}
          >
            <Star
              className="h-4 w-4"
              fill={bookmarked ? "currentColor" : "none"}
            />
          </button>
          <span className="inline-flex items-center gap-1 text-[12px] font-black text-primary sm:mt-3">
            View <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function AirdropCard({
  a,
  bookmarked,
  onToggle,
}: {
  a: Airdrop;
  bookmarked: boolean;
  onToggle: () => void;
}) {
  const topTask = a.tasks[0];
  const totalCost = a.tasks.reduce((sum, task) => sum + task.cost, 0);
  const totalTime = a.tasks.reduce((sum, task) => sum + task.timeMin, 0);

  return (
    <Link href={`/airdrops/${a.slug}`} className="group block h-full">
      <article className="premium-card premium-card-hover flex h-full min-h-[320px] flex-col rounded-2xl border p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <ProjectLogo airdrop={a} />
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="truncate text-[15px] font-black leading-tight group-hover:text-primary">
                  {a.name}
                </h3>
                {a.isNew && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black uppercase leading-none text-white">
                    New
                  </span>
                )}
              </div>
              {a.ticker && (
                <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                  {a.ticker}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggle();
            }}
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-all",
              bookmarked
                ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                : "border-border/60 bg-background/50 text-muted-foreground",
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark airdrop"}
          >
            <Star
              className="h-4 w-4"
              fill={bookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status={a.status} />
          <span className="inline-flex h-7 items-center rounded-full border border-border/70 bg-background/60 px-2.5 text-[11px] font-bold text-muted-foreground">
            {a.rewardType}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-border/50 bg-background/45 p-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Cost
            </p>
            <p
              className={cn(
                "mt-1 text-[13px] font-black",
                totalCost === 0 ? "text-emerald-400" : "text-amber-400",
              )}
            >
              {totalCost === 0 ? "Free" : `$${totalCost}`}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Time
            </p>
            <p className="mt-1 text-[13px] font-black text-foreground">
              {totalTime}m
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Tasks
            </p>
            <p className="mt-1 text-[13px] font-black text-foreground">
              {a.tasks.length}
            </p>
          </div>
        </div>

        <div className="mt-4 min-w-0 flex-1 space-y-2">
          <p className="truncate text-[13px] font-bold">
            {topTask?.name ?? "No active tasks"}
          </p>
          {topTask ? (
            <TypePills types={topTask.types} max={2} />
          ) : (
            <span className="text-[11px] text-muted-foreground">
              No requirement listed
            </span>
          )}
        </div>

        <div className="mt-5 border-t border-border/50 pt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Funding
              </p>
              <p className="mt-1 text-[12px] font-black text-foreground">
                {a.raiseFunds ?? "—"}
              </p>
            </div>
            <BackerRow backers={a.backers} extra={a.backersExtra} />
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px] font-black text-primary">
            <span>{a.statusDate}</span>
            <span className="inline-flex items-center gap-1">
              View Details <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function AnimatedItem({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useScrollAnim();
  return (
    <div
      ref={ref}
      className="anim anim-up"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      {children}
    </div>
  );
}

export default function AirdropsPage() {
  const [location] = useLocation();
  const [tab, setTab] = useState("All");
  const [rewardTab, setRewardTab] = useState("All");
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("search") ?? "";
  });
  const [view, setView] = useState<"list" | "cards">("list");
  const [isCompact, setIsCompact] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextSearch =
      new URLSearchParams(window.location.search).get("search") ?? "";
    setSearch(nextSearch);
  }, [location]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const counts = useMemo(
    () => ({
      confirmed: mockAirdrops.filter((a) => a.status === "Confirmed").length,
      potential: mockAirdrops.filter((a) => a.status === "Potential").length,
      reward: mockAirdrops.filter((a) => a.status === "Reward Available")
        .length,
    }),
    [],
  );

  const filtered = useMemo(
    () =>
      mockAirdrops.filter((airdrop) => {
        const query = search.trim().toLowerCase();
        if (tab !== "All" && airdrop.status !== tab) return false;
        if (rewardTab !== "All" && airdrop.rewardType !== rewardTab)
          return false;
        if (
          query &&
          !`${airdrop.name} ${airdrop.ticker ?? ""}`
            .toLowerCase()
            .includes(query)
        )
          return false;
        return true;
      }),
    [rewardTab, search, tab],
  );

  const effectiveView = isCompact ? "cards" : view;

  const toggle = (id: number) => {
    setBookmarks((previous) => {
      const next = new Set(previous);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="premium-page space-y-5 pb-8">
      <section className="premium-panel rounded-3xl border p-4 sm:p-5 anim anim-up">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Airdrop Radar
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Find campaigns worth farming
            </h1>
            <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted-foreground sm:text-sm">
              Campaign aktif, potential, dan reward-ready dirapikan dengan
              sinyal cost, waktu, task, dan funding untuk scanning cepat.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:min-w-[360px]">
            <div className="premium-stat rounded-2xl border border-emerald-500/25 p-2.5 text-center text-emerald-400 anim anim-scale anim-delay-1 sm:p-3">
              <p className="text-xl font-black text-emerald-400 sm:text-2xl">
                {counts.confirmed}
              </p>
              <p className="mt-1 truncate text-[10px] font-bold text-emerald-300/80 sm:text-[11px]">
                Confirmed
              </p>
            </div>
            <div className="premium-stat rounded-2xl border border-amber-500/25 p-2.5 text-center text-amber-400 anim anim-scale anim-delay-2 sm:p-3">
              <p className="text-xl font-black text-amber-400 sm:text-2xl">
                {counts.potential}
              </p>
              <p className="mt-1 truncate text-[10px] font-bold text-amber-300/80 sm:text-[11px]">
                Potential
              </p>
            </div>
            <div className="premium-stat rounded-2xl border border-sky-500/25 p-2.5 text-center text-sky-400 anim anim-scale anim-delay-3 sm:p-3">
              <p className="text-xl font-black text-sky-400 sm:text-2xl">
                {counts.reward}
              </p>
              <p className="mt-1 truncate text-[10px] font-bold text-sky-300/80 sm:text-[11px]">
                Rewards
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-panel rounded-3xl border p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:items-center sm:overflow-visible sm:pb-0 [-webkit-overflow-scrolling:touch]">
            {FILTER_TABS.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center justify-center rounded-full border px-3 text-center text-[11px] font-bold transition-colors sm:text-[12px]",
                  tab === item
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/60 bg-background/45 text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-border/60 bg-background/55 px-3 sm:min-w-64 lg:w-72 lg:flex-none">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
                className="min-w-0 flex-1 bg-transparent text-[13px] font-medium outline-none placeholder:text-muted-foreground/50"
              />
            </label>

            <div className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/55 p-1 sm:flex">
              <button
                onClick={() => setView("list")}
                disabled={isCompact}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition-colors",
                  view === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  isCompact && "cursor-not-allowed opacity-40",
                )}
                aria-label="List view"
              >
                <LayoutList className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("cards")}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition-colors",
                  view === "cards"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  isCompact && "cursor-not-allowed opacity-40",
                )}
                aria-label="Card view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          {REWARD_TABS.map((item) => (
            <button
              key={item}
              onClick={() => setRewardTab(item)}
              className={cn(
                "h-8 shrink-0 rounded-full px-3 text-[11px] font-bold transition-colors",
                rewardTab === item
                  ? "bg-foreground text-background"
                  : "bg-background/45 text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="grid min-h-64 place-items-center rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center text-muted-foreground anim anim-up">
          <div>
            <Search className="mx-auto h-9 w-9 opacity-40" />
            <p className="mt-3 text-sm font-bold">
              No airdrops match your filter
            </p>
          </div>
        </section>
      ) : effectiveView === "cards" ? (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((airdrop, index) => (
            <AnimatedItem key={airdrop.id} index={index}>
              <AirdropCard
                a={airdrop}
                bookmarked={bookmarks.has(airdrop.id)}
                onToggle={() => toggle(airdrop.id)}
              />
            </AnimatedItem>
          ))}
        </section>
      ) : (
        <section className="space-y-3">
          {filtered.map((airdrop, index) => (
            <AnimatedItem key={airdrop.id} index={index}>
              <AirdropRow
                a={airdrop}
                bookmarked={bookmarks.has(airdrop.id)}
                onToggle={() => toggle(airdrop.id)}
              />
            </AnimatedItem>
          ))}
        </section>
      )}
    </div>
  );
}
