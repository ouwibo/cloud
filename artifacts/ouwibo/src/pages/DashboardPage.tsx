import { Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop } from "@/lib/mockData";
import {
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  Clock,
  Gift,
  Mic,
  Plus,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AirdropLogo } from "@/components/AirdropLogo";
import ScrollReveal from "@/components/ScrollReveal";

const PROMPT_SUGGESTIONS = [
  { label: "Find free tasks", tone: "from-cyan-400 to-blue-500" },
  { label: "Show claim-ready", tone: "from-emerald-400 to-teal-500" },
  { label: "Rank high potential", tone: "from-violet-400 to-fuchsia-500" },
  { label: "Low time campaigns", tone: "from-amber-300 to-orange-500" },
];

function AirdropRow({ a, rank }: { a: Airdrop; rank: number }) {
  const task = a.tasks[0];
  return (
    <Link href={`/airdrops/${a.slug}`}>
      <div className="group flex cursor-pointer items-center gap-3 rounded-[1.25rem] border border-slate-200/70 bg-white/95 px-3.5 py-3 shadow-[0_8px_24px_rgb(15,23,42,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-sky-200 hover:bg-sky-50/60 hover:shadow-[0_16px_38px_rgb(14,116,144,0.10)]">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-50 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200/80">
          {rank}
        </span>
        <AirdropLogo
          name={a.name}
          logoUrl={a.logoUrl}
          logoInitial={a.logoInitial}
          logoColor={a.logoColor}
          size={36}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-1.5">
            <span className="truncate text-[13px] font-bold text-slate-900">
              {a.name}
            </span>
            {a.ticker && (
              <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                {a.ticker}
              </span>
            )}
            {a.isNew && (
              <span className="shrink-0 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-black text-emerald-600 ring-1 ring-emerald-100">
                NEW
              </span>
            )}
          </div>
          {task ? (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <span
                className={cn(
                  "font-bold",
                  task.cost === 0 ? "text-emerald-500" : "text-sky-500",
                )}
              >
                {task.cost === 0 ? "Free" : `$${task.cost}`}
              </span>
              <span>· {task.timeMin}min ·</span>
              <span className="truncate">{task.types[0]}</span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-500">No active tasks</span>
          )}
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <div className="text-[11px] font-bold text-slate-700">{a.status}</div>
          <div className="text-[10px] text-slate-400">{a.statusDate}</div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-500" />
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const airdrops = mockAirdrops;
  const total = airdrops.length;
  const confirmed = airdrops.filter((a) => a.status === "Confirmed").length;
  const potential = airdrops.filter((a) => a.status === "Potential").length;
  const rewards = airdrops.filter(
    (a) => a.status === "Reward Available",
  ).length;
  const newest = airdrops.filter((a) => a.isNew).slice(0, 4);
  const rewardA = airdrops.filter((a) => a.status === "Reward Available");
  const top = [...airdrops]
    .sort(
      (a, b) =>
        b.tasks.length +
        (b.raiseFunds ? 1 : 0) -
        (a.tasks.length + (a.raiseFunds ? 1 : 0)),
    )
    .slice(0, 6);

  return (
    <div className="premium-page mx-auto flex w-full max-w-[1120px] flex-col gap-5 pb-8">
      <ScrollReveal>
        <section className="hero-prompt-panel mx-auto flex w-full flex-col items-center gap-6 rounded-[2rem] border p-5 text-center sm:rounded-[2rem] sm:p-7 lg:p-8">
          <div className="inline-flex rounded-full border border-white/35 bg-white/20 p-1.5 shadow-[0_10px_30px_rgb(14,116,144,0.12)] backdrop-blur-md">
            <span className="rounded-full bg-white px-5 py-2 text-[12px] font-black text-slate-900 shadow-sm">
              Web App
            </span>
            <span className="rounded-full px-5 py-2 text-[12px] font-bold text-white/85">
              Mobile App
            </span>
          </div>

          <div className="space-y-3">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md sm:text-[11px]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-sky-500 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" fill="currentColor" />
              </span>
              Airdrop intelligence workspace
            </div>
            <h1 className="premium-heading text-balance text-[32px] font-semibold leading-[1.04] text-white drop-shadow-[0_10px_28px_rgb(14,116,144,0.22)] sm:text-5xl lg:text-[58px]">
              Track your next high-signal airdrop.
            </h1>
            <p className="mx-auto max-w-2xl text-[14px] font-medium leading-7 text-white/85 sm:text-[15px]">
              Compare campaign status, task cost, time, and claim readiness in a
              clean cloud workspace.
            </p>
          </div>

          <div className="prompt-input-card w-full max-w-3xl rounded-[1.5rem] bg-white p-3 text-left shadow-[0_18px_60px_rgb(15,23,42,0.16)] ring-1 ring-white/80 transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-sky-300/70">
            <div className="flex min-h-[72px] items-center gap-3 rounded-[1.125rem] bg-white px-2 sm:px-3">
              <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-500 transition-all duration-300 hover:scale-105 hover:bg-slate-100">
                <Plus className="h-4 w-4" />
              </button>
              <div className="min-w-0 flex-1 text-[15px] font-medium text-slate-400 sm:text-base">
                Ask Ouwibo to find low-cost, high-potential campaigns…
              </div>
              <button className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-500 transition-all duration-300 hover:scale-105 hover:bg-slate-100 sm:grid">
                <Mic className="h-4 w-4" />
              </button>
              <Link href="/airdrops">
                <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-sky-100 hover:text-sky-700">
                  <ArrowUp className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {PROMPT_SUGGESTIONS.map((item) => (
              <Link key={item.label} href="/airdrops">
                <span className="suggestion-pill inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-[12px] font-bold text-slate-800 shadow-[0_10px_26px_rgb(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white/95">
                  <span
                    className={cn(
                      "h-4 w-4 rounded-full bg-gradient-to-br shadow-sm",
                      item.tone,
                    )}
                  />
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Airdrops Tracked",
            detail: "Curated opportunities",
            value: total,
            icon: <Zap className="h-4 w-4" />,
            cls: "text-sky-500",
          },
          {
            label: "Confirmed",
            detail: "Verified campaign signals",
            value: confirmed,
            icon: <CheckCircle2 className="h-4 w-4" />,
            cls: "text-emerald-500",
          },
          {
            label: "Potential",
            detail: "Under review",
            value: potential,
            icon: <Clock className="h-4 w-4" />,
            cls: "text-blue-500",
          },
          {
            label: "Rewards Available",
            detail: "Claim-ready now",
            value: rewards,
            icon: <Gift className="h-4 w-4" />,
            cls: "text-violet-500",
          },
        ].map(({ label, detail, value, icon, cls }, index) => (
          <ScrollReveal key={label} delay={80 * index}>
            <div
              className={cn(
                "premium-stat flex min-h-[136px] flex-col rounded-[1.5rem] border p-4",
                cls,
              )}
            >
              <div className="premium-icon mb-3 h-9 w-9 rounded-full">
                {icon}
              </div>
              <div className="text-[26px] font-black leading-none text-slate-900">
                {value}
              </div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-700">
                {label}
              </div>
              <div className="mt-1 text-[11px] font-medium text-slate-400">
                {detail}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <ScrollReveal className="lg:col-span-2" delay={120}>
          <div className="deployed-panel overflow-hidden rounded-[1.5rem] border">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-sky-500">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <span className="text-[14px] font-black text-slate-900">
                  Deployed Apps
                </span>
              </div>
              <Link
                href="/airdrops"
                className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-sky-600 transition-colors hover:bg-sky-50"
              >
                See all →
              </Link>
            </div>
            <div className="grid gap-2.5 p-3 sm:p-4">
              {top.map((a, i) => (
                <AirdropRow key={a.id} a={a} rank={i + 1} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-4" delay={220}>
          <div className="deployed-panel overflow-hidden rounded-[1.5rem] border">
            <div className="border-b border-slate-200/70 px-5 py-4">
              <span className="text-[14px] font-black text-slate-900">
                Claim Now
              </span>
            </div>
            {rewardA.length === 0 ? (
              <p className="py-10 text-center text-[12px] font-medium text-slate-400">
                None available
              </p>
            ) : (
              <div className="grid gap-2 p-3">
                {rewardA.map((drop) => (
                  <Link key={drop.id} href={`/airdrops/${drop.slug}`}>
                    <div className="premium-card-hover flex cursor-pointer items-center gap-2.5 rounded-[1.25rem] border border-slate-200/70 bg-white/95 px-3 py-2.5 hover:bg-sky-50/70">
                      <AirdropLogo
                        name={drop.name}
                        logoUrl={drop.logoUrl}
                        logoInitial={drop.logoInitial}
                        logoColor={drop.logoColor}
                        size={30}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-bold text-slate-900">
                          {drop.name}
                        </p>
                        <p className="text-[10px] font-semibold text-sky-500">
                          Reward Available
                        </p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="deployed-panel overflow-hidden rounded-[1.5rem] border">
            <div className="border-b border-slate-200/70 px-5 py-4">
              <span className="text-[14px] font-black text-slate-900">
                New This Week
              </span>
            </div>
            {newest.length === 0 ? (
              <p className="py-10 text-center text-[12px] font-medium text-slate-400">
                No new projects
              </p>
            ) : (
              <div className="grid gap-2 p-3">
                {newest.map((a) => (
                  <Link key={a.id} href={`/airdrops/${a.slug}`}>
                    <div className="premium-card-hover flex cursor-pointer items-center gap-2.5 rounded-[1.25rem] border border-slate-200/70 bg-white/95 px-3 py-2.5 hover:bg-sky-50/70">
                      <AirdropLogo
                        name={a.name}
                        logoUrl={a.logoUrl}
                        logoInitial={a.logoInitial}
                        logoColor={a.logoColor}
                        size={30}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-bold text-slate-900">
                          {a.name}
                        </p>
                        <p className="text-[10px] font-semibold text-emerald-500">
                          {a.status}
                        </p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
