import { Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import type { Airdrop } from "@/lib/mockData";
import { getAllArticles } from "@/lib/articleStore";
import { ArticleCard } from "@/components/ArticleCard";
import {
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2,
  ChevronRight,
  Gift,
  Newspaper,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AirdropLogo } from "@/components/AirdropLogo";

function AirdropRow({ a, rank }: { a: Airdrop; rank: number }) {
  const task = a.tasks[0];
  return (
    <Link href={`/airdrops/${a.slug}`}>
      <div className="group flex items-center gap-3 border-b border-border/30 px-4 py-3.5 transition-colors hover:bg-muted/40 cursor-pointer last:border-0">
        <span className="w-5 shrink-0 text-center text-[11px] text-muted-foreground">
          {rank}
        </span>
        <AirdropLogo
          name={a.name}
          logoUrl={a.logoUrl}
          logoInitial={a.logoInitial}
          logoColor={a.logoColor}
          size={34}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-1.5">
            <span className="truncate text-[13px] font-semibold">{a.name}</span>
            {a.ticker && (
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {a.ticker}
              </span>
            )}
            {a.isNew && (
              <span className="shrink-0 rounded bg-emerald-500 px-1 py-0.5 text-[8px] text-white">
                NEW
              </span>
            )}
          </div>
          {task ? (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span
                className={
                  task.cost === 0
                    ? "font-medium text-emerald-500"
                    : "font-medium text-fuchsia-400"
                }
              >
                {task.cost === 0 ? "Free" : `$${task.cost}`}
              </span>
              <span>· {task.timeMin}min ·</span>
              <span className="truncate">{task.types[0]}</span>
            </div>
          ) : (
            <span className="text-[11px] text-muted-foreground">
              No active tasks
            </span>
          )}
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <div className="flex items-center justify-end gap-1 text-[11px]">
            <span
              className={cn(
                "font-medium",
                a.status === "Reward Available"
                  ? "text-blue-400"
                  : "text-foreground",
              )}
            >
              {a.status}
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            {a.statusDate}
          </div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
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
  const latestArticles = getAllArticles().slice(0, 4);
  const top = [...airdrops]
    .sort(
      (a, b) =>
        b.tasks.length +
        (b.raiseFunds ? 1 : 0) -
        (a.tasks.length + (a.raiseFunds ? 1 : 0)),
    )
    .slice(0, 6);

  return (
    <div className="premium-page space-y-6">
      <section className="premium-panel overflow-hidden rounded-3xl border p-5 sm:p-6">
        <div className="max-w-5xl">
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary sm:text-[11px]">
            <span className="premium-icon h-6 w-6 shrink-0 rounded-full">
              <Star className="relative z-10 h-3 w-3" fill="currentColor" />
            </span>
            <span className="truncate">
              Research-grade airdrop intelligence
            </span>
          </div>
          <h1 className="premium-heading text-[28px] font-black leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            Ouwibo: professional airdrop intelligence workspace.
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
            Discover credible campaigns, compare time-to-reward signals, and
            track claim-ready opportunities in one clean workspace without noisy
            speculation or overlapping dashboard copy.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link href="/airdrops" className="w-full sm:w-auto">
              <button className="w-full shrink-0 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-400 via-primary to-fuchsia-500 px-5 py-3 text-[13px] font-black text-primary-foreground shadow-[0_16px_34px_hsl(var(--primary)/0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_48px_hsl(var(--primary)/0.34)] sm:w-auto">
                Explore Airdrops →
              </button>
            </Link>
            <Link href="/news" className="w-full sm:w-auto">
              <button className="w-full rounded-2xl border border-white/10 bg-card/70 px-5 py-3 text-[13px] font-black text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10 sm:w-auto">
                Read Research
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Airdrops Tracked",
            detail: "Curated opportunities",
            value: total,
            icon: <Zap className="h-4 w-4" />,
            cls: "text-primary border-primary/25 bg-primary/5",
          },
          {
            label: "Confirmed",
            detail: "Verified campaign signals",
            value: confirmed,
            icon: <CheckCircle2 className="h-4 w-4" />,
            cls: "text-emerald-500 border-emerald-500/25 bg-emerald-500/5",
          },
          {
            label: "Potential",
            detail: "Under review",
            value: potential,
            icon: <Clock className="h-4 w-4" />,
            cls: "text-fuchsia-400 border-fuchsia-500/25 bg-fuchsia-500/5",
          },
          {
            label: "Rewards Available",
            detail: "Claim-ready now",
            value: rewards,
            icon: <Gift className="h-4 w-4" />,
            cls: "text-blue-400 border-blue-500/25 bg-blue-500/5",
          },
        ].map(({ label, detail, value, icon, cls }) => (
          <div
            key={label}
            className={cn("premium-stat rounded-2xl border p-3.5", cls)}
          >
            <div className="premium-icon mb-2 h-8 w-8 rounded-xl">{icon}</div>
            <div className="text-[22px] font-bold leading-none">{value}</div>
            <div className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-foreground/80">
              {label}
            </div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">
              {detail}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="premium-panel overflow-hidden rounded-2xl border lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-primary/8 to-transparent px-4 py-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-[13px] font-semibold">Top Ranked</span>
            </div>
            <Link
              href="/airdrops"
              className="text-[11px] text-primary hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-3 p-4">
            {top.map((a, i) => (
              <AirdropRow key={a.id} a={a} rank={i + 1} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="premium-panel overflow-hidden rounded-2xl border">
            <div className="flex items-center gap-2 border-b border-border/50 bg-gradient-to-r from-sky-500/8 to-transparent px-4 py-3">
              <span className="text-[13px] font-semibold">Claim Now</span>
            </div>
            {rewardA.length === 0 ? (
              <p className="py-6 text-center text-[12px] text-muted-foreground">
                None available
              </p>
            ) : (
              <div className="grid gap-2 p-3">
                {rewardA.map((drop) => (
                  <Link key={drop.id} href={`/airdrops/${drop.slug}`}>
                    <div className="premium-card-hover flex cursor-pointer items-center gap-2.5 rounded-xl border border-border/50 bg-background/45 px-3 py-2.5 hover:bg-muted/40">
                      <AirdropLogo
                        name={drop.name}
                        logoUrl={drop.logoUrl}
                        logoInitial={drop.logoInitial}
                        logoColor={drop.logoColor}
                        size={28}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-medium">
                          {drop.name}
                        </p>
                        <p className="text-[10px] text-blue-400">
                          Reward Available
                        </p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="premium-panel overflow-hidden rounded-2xl border">
            <div className="flex items-center gap-2 border-b border-border/50 bg-gradient-to-r from-emerald-500/8 to-transparent px-4 py-3">
              <span className="text-[13px] font-semibold">New This Week</span>
            </div>
            {newest.length === 0 ? (
              <p className="py-6 text-center text-[12px] text-muted-foreground">
                No new projects
              </p>
            ) : (
              <div className="grid gap-2 p-3">
                {newest.map((a) => (
                  <Link key={a.id} href={`/airdrops/${a.slug}`}>
                    <div className="premium-card-hover flex cursor-pointer items-center gap-2.5 rounded-xl border border-border/50 bg-background/45 px-3 py-2.5 hover:bg-muted/40">
                      <AirdropLogo
                        name={a.name}
                        logoUrl={a.logoUrl}
                        logoInitial={a.logoInitial}
                        logoColor={a.logoColor}
                        size={28}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-medium">
                          {a.name}
                        </p>
                        <p className="text-[10px] text-emerald-500">
                          {a.status}
                        </p>
                      </div>
                      <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="premium-panel overflow-hidden rounded-2xl border">
        <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-primary/8 to-transparent px-4 py-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-semibold">Latest News</span>
          </div>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
