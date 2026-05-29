import { useState, type ReactNode } from "react";
import { useParams, Link } from "wouter";
import { AirdropLogo } from "@/components/AirdropLogo";
import { mockAirdrops } from "@/lib/mockData";
import type { Backer, Airdrop } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Activity,
  Banknote,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  Hash,
  HelpCircle,
  Layers,
  Send,
  Server,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Zap,
} from "lucide-react";

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
  "On-Chain Activity": "border-violet-500/20 bg-violet-500/10 text-violet-400",
};

const STATUS_ICON = {
  Confirmed: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  Potential: <HelpCircle className="h-4 w-4 text-amber-400" />,
  "Reward Available": <Banknote className="h-4 w-4 text-sky-400" />,
} as const;

const STATUS_BADGE = {
  Confirmed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  Potential: "border-amber-500/25 bg-amber-500/10 text-amber-400",
  "Reward Available": "border-sky-500/25 bg-sky-500/10 text-sky-400",
} as const;

const STATUS_CLS = {
  Confirmed: "text-emerald-500",
  Potential: "text-amber-400",
  "Reward Available": "text-sky-400",
} as const;

const CHAIN_COLOR: Record<string, string> = {
  Ethereum: "#627eea",
  Arbitrum: "#28a0f0",
  Solana: "#9945ff",
  "Multi-chain": "#f97316",
  Optimism: "#ff0420",
  Base: "#0052ff",
  Polygon: "#8247e5",
};

function MiniCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm", className)}>{children}</div>;
}

function SectionHeader({ icon, title, count }: { icon: ReactNode; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
      {icon}
      <h2 className="text-[13px] font-bold">{title}</h2>
      {count !== undefined && (
        <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{count}</span>
      )}
    </div>
  );
}

function BackerAvatar({ backer }: { backer: Backer }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      title={backer.name}
      className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-background text-[9px] font-bold text-white"
      style={{ background: backer.color }}
    >
      {backer.logoUrl && !failed ? (
        <img src={backer.logoUrl} alt={backer.name} className="h-full w-full object-cover" onError={() => setFailed(true)} />
      ) : (
        backer.initial
      )}
    </div>
  );
}

function LinkBlock({
  href,
  icon,
  label,
  value,
  note,
  accent,
}: {
  href?: string;
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
  accent: string;
}) {
  const content = (
    <>
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accent)}>{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="truncate text-[12px] font-bold text-foreground">{value}</p>
        <p className="truncate text-[10px] text-muted-foreground">{note}</p>
      </div>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/45 px-3 py-3">
        {content}
      </div>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/45 px-3 py-3 transition-colors hover:bg-muted/40">
      {content}
    </a>
  );
}

export default function AirdropDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const airdrop = mockAirdrops.find((item) => item.slug === slug);
  const [bookmarked, setBookmarked] = useState(false);

  if (!airdrop) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <HelpCircle className="h-12 w-12 text-muted-foreground/30" />
        <h1 className="text-[18px] font-bold">Airdrop not found</h1>
        <p className="text-[13px] text-muted-foreground">The project you're looking for doesn't exist.</p>
        <Link href="/airdrops">
          <span className="inline-flex items-center gap-1 text-[13px] text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Airdrops
          </span>
        </Link>
      </div>
    );
  }

  const chainColor = CHAIN_COLOR[airdrop.chain ?? ""] ?? "#6b7280";
  const freeTasks = airdrop.tasks.filter((task) => task.cost === 0);
  const totalCost = airdrop.tasks.reduce((sum, task) => sum + task.cost, 0);
  const totalTime = airdrop.tasks.reduce((sum, task) => sum + task.timeMin, 0);
  const websiteLabel = airdrop.website?.replace(/^https?:\/\//, "") ?? "";
  const twitterLabel = airdrop.twitter ? `@${airdrop.twitter}` : "";
  const telegramLabel = airdrop.telegram?.replace(/^https:\/\/t\.me\//, "t.me/") ?? "";
  const discordLabel = airdrop.discord?.replace(/^https?:\/\//, "") ?? "";

  const longDescription = [
    airdrop.description,
    `${airdrop.name} is tracked here as a ${airdrop.status.toLowerCase()} ${airdrop.rewardType.toLowerCase()} opportunity on ${airdrop.chain ?? "multiple chains"}${airdrop.network ? ` (${airdrop.network})` : ""}.`,
    `The page is arranged vertically so you can review the project, open official community links, inspect the network information, and move through each task without losing context.`,
    airdrop.raiseFunds ? `Reported funding: ${airdrop.raiseFunds}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 pb-10">
      <Link href="/airdrops">
        <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Airdrops
        </span>
      </Link>

      <MiniCard className="overflow-hidden">
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${airdrop.logoColor}, ${chainColor})` }} />
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <AirdropLogo
                name={airdrop.name}
                logoUrl={airdrop.logoUrl}
                logoInitial={airdrop.logoInitial}
                logoColor={airdrop.logoColor}
                size={64}
                className="rounded-2xl"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-[22px] font-black tracking-tight text-foreground sm:text-[28px]">{airdrop.name}</h1>
                      {airdrop.ticker && <span className="rounded-md bg-muted px-2 py-0.5 text-[12px] text-muted-foreground">{airdrop.ticker}</span>}
                      {airdrop.isNew && <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">New</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className={cn("inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-bold", STATUS_BADGE[airdrop.status])}>
                        {STATUS_ICON[airdrop.status]}
                        {airdrop.status}
                      </span>
                      <span className="rounded-lg border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">{airdrop.rewardType}</span>
                      {airdrop.chain && (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-muted/40 px-2 py-1 text-[10px] font-bold text-foreground">
                          <span className="h-2 w-2 rounded-full" style={{ background: chainColor }} />
                          {airdrop.chain}
                        </span>
                      )}
                      {airdrop.network && (
                        <span
                          className={cn(
                            "rounded-lg border px-2 py-1 text-[10px] font-bold",
                            airdrop.network === "Testnet"
                              ? "border-purple-500/20 bg-purple-500/10 text-purple-400"
                              : airdrop.network === "Both"
                                ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
                          )}
                        >
                          {airdrop.network}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{longDescription}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {airdrop.website && (
                      <a
                        href={airdrop.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 px-3 py-2 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                      >
                        <Globe className="h-3.5 w-3.5" /> Website
                      </a>
                    )}
                    <button
                      onClick={() => setBookmarked((value) => !value)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-bold transition-colors",
                        bookmarked ? "border-amber-400/60 bg-amber-400/10 text-amber-400" : "border-border/60 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                      )}
                    >
                      <Star className="h-3.5 w-3.5" fill={bookmarked ? "currentColor" : "none"} />
                      {bookmarked ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <LinkBlock
                    href={airdrop.website}
                    icon={<Globe className="h-4 w-4 text-blue-400" />}
                    label="Website"
                    value={websiteLabel || "Official site"}
                    note="Project homepage"
                    accent="bg-blue-500/10"
                  />
                  <LinkBlock
                    href={airdrop.twitter ? `https://twitter.com/${airdrop.twitter}` : undefined}
                    icon={<Twitter className="h-4 w-4 text-sky-400" />}
                    label="Twitter / X"
                    value={twitterLabel || "Not listed"}
                    note="Updates & announcements"
                    accent="bg-sky-500/10"
                  />
                  <LinkBlock
                    href={airdrop.telegram}
                    icon={<Send className="h-4 w-4 text-blue-400" />}
                    label="Telegram"
                    value={telegramLabel || "Not listed"}
                    note="Community chat"
                    accent="bg-blue-400/10"
                  />
                  <LinkBlock
                    href={airdrop.discord}
                    icon={<Hash className="h-4 w-4 text-indigo-400" />}
                    label="Discord"
                    value={discordLabel || "Not listed"}
                    note="Official server"
                    accent="bg-indigo-500/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MiniCard>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {[
          { icon: <DollarSign className="h-4 w-4 text-primary" />, label: "Raise", value: airdrop.raiseFunds ?? "—", tint: "border-primary/20 bg-primary/10" },
          { icon: <Zap className="h-4 w-4 text-amber-400" />, label: "Tasks", value: String(airdrop.tasks.length), tint: "border-amber-500/20 bg-amber-500/10" },
          { icon: <TrendingUp className="h-4 w-4 text-emerald-500" />, label: "Free", value: String(freeTasks.length), tint: "border-emerald-500/20 bg-emerald-500/10" },
          { icon: <DollarSign className="h-3.5 w-3.5 text-amber-400" />, label: "Total Cost", value: totalCost === 0 ? "Free" : `$${totalCost}`, tint: "border-border/60 bg-card" },
          { icon: <Clock className="h-4 w-4 text-blue-400" />, label: "Est. Time", value: `${totalTime} min`, tint: "border-blue-500/20 bg-blue-500/10" },
        ].map((item) => (
          <MiniCard key={item.label} className={cn("p-3", item.tint)}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-background/60">{item.icon}</div>
              <div>
                <p className="text-[15px] font-black leading-none text-foreground">{item.value}</p>
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </MiniCard>
        ))}
      </div>

      <MiniCard>
        <SectionHeader icon={<Activity className="h-4 w-4 text-primary" />} title="Project Overview" />
        <div className="p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary">What this project is</p>
              <p className="mt-2 text-[13px] leading-7 text-muted-foreground">
                {airdrop.description}
              </p>
              <p className="mt-3 text-[13px] leading-7 text-muted-foreground">
                This page is intentionally arranged as a tall vertical guide so you can scan the project, review community links, verify the network, and continue to tasks without jumping between panes.
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary">Quick facts</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                <div className="rounded-xl bg-background/60 px-3 py-2">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Status</span>
                  <span className={cn("mt-1 block font-black", STATUS_CLS[airdrop.status])}>{airdrop.status}</span>
                </div>
                <div className="rounded-xl bg-background/60 px-3 py-2">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Reward</span>
                  <span className="mt-1 block font-black text-foreground">{airdrop.rewardType}</span>
                </div>
                <div className="rounded-xl bg-background/60 px-3 py-2">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Chain</span>
                  <span className="mt-1 block font-black text-foreground">{airdrop.chain ?? "—"}</span>
                </div>
                <div className="rounded-xl bg-background/60 px-3 py-2">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Raise</span>
                  <span className="mt-1 block font-black text-foreground">{airdrop.raiseFunds ?? "Undisclosed"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MiniCard>

      <MiniCard>
        <SectionHeader icon={<Layers className="h-4 w-4 text-primary" />} title="Chain & Network" />
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${chainColor}22` }}>
                <Layers className="h-4 w-4" style={{ color: chainColor }} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Blockchain</p>
                <p className="text-[13px] font-black text-foreground">{airdrop.chain ?? "—"}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
            <div className="flex items-center gap-2">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", airdrop.network === "Testnet" ? "bg-purple-500/15" : airdrop.network === "Both" ? "bg-cyan-500/15" : "bg-emerald-500/15") }>
                <Server className={cn("h-4 w-4", airdrop.network === "Testnet" ? "text-purple-400" : airdrop.network === "Both" ? "text-cyan-400" : "text-emerald-400")} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Network</p>
                <p className={cn("text-[13px] font-black", airdrop.network === "Testnet" ? "text-purple-400" : airdrop.network === "Both" ? "text-cyan-400" : "text-emerald-400")}>{airdrop.network ?? "—"}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 bg-background/50 p-4 sm:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Status</p>
                  <p className={cn("text-[13px] font-black", STATUS_CLS[airdrop.status])}>{airdrop.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-[11px] font-bold text-muted-foreground">
                <BarChart3 className="h-3.5 w-3.5 text-amber-400" /> Reported raise: {airdrop.raiseFunds ?? "Undisclosed"}
              </div>
            </div>
          </div>
        </div>
      </MiniCard>

      {(airdrop.backers?.length ?? 0) > 0 && (
        <MiniCard>
          <SectionHeader icon={<Users className="h-4 w-4 text-primary" />} title="Investors" count={airdrop.backers?.length} />
          <div className="grid gap-2 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {airdrop.backers!.map((backer) => (
              <div key={backer.name} className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/50 px-3 py-3">
                <BackerAvatar backer={backer} />
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-foreground">{backer.name}</p>
                  <p className="text-[10px] text-muted-foreground">Backer</p>
                </div>
              </div>
            ))}
            {(airdrop.backersExtra ?? 0) > 0 && (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-background/40 px-3 py-3 text-muted-foreground">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-bold">+{airdrop.backersExtra}</div>
                <p className="text-[12px] font-semibold">More investors not listed</p>
              </div>
            )}
          </div>
        </MiniCard>
      )}

      <MiniCard>
        <SectionHeader icon={<Zap className="h-4 w-4 text-primary" />} title="All Tasks" count={airdrop.tasks.length} />
        {airdrop.tasks.length === 0 ? (
          <div className="flex items-center justify-center px-4 py-14 text-center text-muted-foreground">
            <div>
              <CheckCircle2 className="mx-auto mb-2 h-10 w-10 opacity-20" />
              <p className="text-[13px] font-bold">No active tasks — reward may be claimable</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {airdrop.tasks.map((task, index) => (
              <div key={index} className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-black text-muted-foreground">{index + 1}</div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="truncate text-[14px] font-black text-foreground">{task.name}</p>
                    <span className={cn("inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-bold", task.cost === 0 ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500" : "border-amber-500/20 bg-amber-500/10 text-amber-400")}>
                      {task.cost === 0 ? "Free" : `$${task.cost}`} · {task.timeMin} min
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {task.types.map((type) => (
                      <span key={type} className={cn("rounded-md border px-1.5 py-0.5 text-[9px] font-bold", TYPE_CLS[type] ?? "border-border bg-muted text-muted-foreground")}>{type}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-4 py-2 text-[11px] font-bold text-primary-foreground transition-opacity hover:opacity-90 sm:ml-auto"
                >
                  Go <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </MiniCard>
    </div>
  );
}
