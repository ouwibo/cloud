import { useState } from "react";
import { useParams, Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import type { Backer } from "@/lib/mockData";
import {
  ArrowLeft, ExternalLink, Star, Clock, DollarSign,
  CheckCircle2, HelpCircle, Banknote, ChevronRight,
  Zap, Users, TrendingUp, Globe, Send, Hash, Twitter,
  Activity, Layers, Server, BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Task type colors ── */
const TYPE_CLS: Record<string, string> = {
  "Fill The Form":       "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  "Trading":             "bg-green-500/15 text-green-400 border border-green-500/20",
  "Testnet":             "bg-purple-500/15 text-purple-400 border border-purple-500/20",
  "Social":              "bg-pink-500/15 text-pink-400 border border-pink-500/20",
  "Liquidity":           "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  "Staking":             "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20",
  "Mainnet":             "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  "Hold":                "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  "Referral":            "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
  "Community":           "bg-rose-500/15 text-rose-400 border border-rose-500/20",
  "On-Chain Activity":   "bg-violet-500/15 text-violet-400 border border-violet-500/20",
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

const STATUS_BADGE = {
  "Confirmed":        "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  "Potential":        "bg-amber-500/10 text-amber-400 border-amber-500/25",
  "Reward Available": "bg-blue-500/10 text-blue-400 border-blue-500/25",
} as const;

const CHAIN_COLOR: Record<string, string> = {
  "Ethereum":    "#627eea",
  "Arbitrum":    "#28a0f0",
  "Solana":      "#9945ff",
  "Multi-chain": "#f97316",
  "Optimism":    "#ff0420",
  "Base":        "#0052ff",
  "Polygon":     "#8247e5",
};

/* ── Logo with fallback ── */
function Logo({ logoUrl, logoColor, logoInitial, size = 60 }: {
  logoUrl: string; logoColor: string; logoInitial: string; size?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden flex items-center justify-center text-white font-bold shrink-0 shadow-lg"
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

/* ── Mini card ── */
function MiniCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-border/60 rounded-xl bg-card overflow-hidden", className)}>
      {children}
    </div>
  );
}

/* ── Section header ── */
function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) {
  return (
    <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
      {icon}
      <h2 className="text-[13px] font-bold">{title}</h2>
      {count !== undefined && (
        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full ml-auto">{count}</span>
      )}
    </div>
  );
}

export default function AirdropDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const airdrop  = mockAirdrops.find(a => a.slug === slug);
  const [bookmarked, setBookmarked] = useState(false);

  if (!airdrop) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-center">
        <HelpCircle className="w-12 h-12 text-muted-foreground/30" />
        <h1 className="text-[18px] font-bold">Airdrop not found</h1>
        <p className="text-[13px] text-muted-foreground">The project you're looking for doesn't exist.</p>
        <Link href="/airdrops">
          <span className="text-[13px] text-primary hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Airdrops
          </span>
        </Link>
      </div>
    );
  }

  const freeTasks  = airdrop.tasks.filter(t => t.cost === 0);
  const totalCost  = airdrop.tasks.reduce((s, t) => s + t.cost, 0);
  const totalTime  = airdrop.tasks.reduce((s, t) => s + t.timeMin, 0);
  const chainColor = CHAIN_COLOR[airdrop.chain ?? ""] ?? "#6b7280";

  return (
    <div className="space-y-4 max-w-6xl">
      {/* Back */}
      <Link href="/airdrops">
        <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Airdrops
        </span>
      </Link>

      {/* ── Hero card ── */}
      <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${airdrop.logoColor}, ${chainColor})` }} />
        <div className="p-5">
          <div className="flex items-start gap-4 flex-wrap">
            <Logo logoUrl={airdrop.logoUrl ?? ""} logoColor={airdrop.logoColor} logoInitial={airdrop.logoInitial} size={60} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                {/* Left: name + badges */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h1 className="text-[22px] font-bold tracking-tight">{airdrop.name}</h1>
                    {airdrop.ticker && (
                      <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{airdrop.ticker}</span>
                    )}
                    {airdrop.isNew && (
                      <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border", STATUS_BADGE[airdrop.status])}>
                      {STATUS_ICON[airdrop.status]}{airdrop.status}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      {airdrop.rewardType}
                    </span>
                    {airdrop.chain && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border border-border/50 bg-muted/40">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: chainColor }} />
                        {airdrop.chain}
                      </span>
                    )}
                    {airdrop.network && (
                      <span className={cn("text-[10px] font-bold px-2 py-1 rounded-lg border",
                        airdrop.network === "Testnet" ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : airdrop.network === "Both"   ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      )}>
                        {airdrop.network}
                      </span>
                    )}
                  </div>
                  {airdrop.description && (
                    <p className="text-[12px] text-muted-foreground mt-2 max-w-xl leading-relaxed">{airdrop.description}</p>
                  )}
                </div>
                {/* Right: action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {airdrop.website && (
                    <a href={airdrop.website} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground border border-border/60 rounded-lg px-3 py-1.5 transition-colors hover:bg-muted/40">
                      <Globe className="w-3.5 h-3.5" /> Website
                    </a>
                  )}
                  <button
                    onClick={() => setBookmarked(v => !v)}
                    className={cn("flex items-center gap-1.5 text-[11px] border rounded-lg px-3 py-1.5 transition-colors",
                      bookmarked ? "border-amber-400/60 text-amber-400 bg-amber-400/5" : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40")}
                  >
                    <Star className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} />
                    {bookmarked ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { icon: <DollarSign className="w-4 h-4 text-primary" />,     label: "Raise",      value: airdrop.raiseFunds ?? "—" },
          { icon: <Zap className="w-4 h-4 text-amber-400" />,          label: "Total Tasks", value: String(airdrop.tasks.length) },
          { icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, label: "Free Tasks",  value: String(freeTasks.length) },
          { icon: <DollarSign className="w-3.5 h-3.5 text-amber-400" />, label: "Total Cost", value: totalCost === 0 ? "Free" : `$${totalCost}` },
          { icon: <Clock className="w-4 h-4 text-blue-400" />,         label: "Est. Time",   value: `${totalTime} min` },
        ].map(({ icon, label, value }) => (
          <div key={label} className="border border-border/60 rounded-xl p-3 bg-card flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">{icon}</div>
            <div>
              <p className="text-[14px] font-bold leading-tight">{value}</p>
              <p className="text-[9px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── Left: Tasks (2/3) ── */}
        <div className="lg:col-span-2 space-y-4">
          <MiniCard>
            <SectionHeader icon={<Zap className="w-4 h-4 text-primary" />} title="All Tasks" count={airdrop.tasks.length} />
            {airdrop.tasks.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <div className="text-center">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-2 opacity-20" />
                  <p className="text-[13px]">No active tasks — reward may be claimable</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {airdrop.tasks.map((task, i) => (
                  <div key={i} className="px-4 py-3.5 flex items-center gap-3 group/row hover:bg-muted/20 transition-colors">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-muted text-muted-foreground shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold mb-1.5 truncate">{task.name}</p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {task.types.map(t => (
                          <span key={t} className={cn("text-[9px] font-semibold px-1.5 py-0.5 rounded-md", TYPE_CLS[t] ?? "bg-muted text-muted-foreground")}>
                            {t}
                          </span>
                        ))}
                        <span className="text-muted-foreground/30 text-[10px]">·</span>
                        <span className={cn("text-[10px] font-semibold", task.cost === 0 ? "text-emerald-500" : "text-amber-400")}>
                          {task.cost === 0 ? "Free" : `$${task.cost}`}
                        </span>
                        <span className="text-muted-foreground/30 text-[10px]">·</span>
                        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                          <Clock className="w-2.5 h-2.5" /> {task.timeMin} min
                        </span>
                      </div>
                    </div>
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1 text-[11px] font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Go <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </MiniCard>
        </div>

        {/* ── Right: Info cards (1/3) ── */}
        <div className="space-y-3">

          {/* Social Links */}
          <MiniCard>
            <SectionHeader icon={<Globe className="w-4 h-4 text-primary" />} title="Links & Community" />
            <div className="p-3 grid grid-cols-2 gap-2">
              {airdrop.website && (
                <a href={airdrop.website} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 hover:border-border transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate">Website</p>
                    <p className="text-[9px] text-muted-foreground truncate">Official site</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground ml-auto shrink-0 transition-colors" />
                </a>
              )}
              {airdrop.twitter && (
                <a href={`https://twitter.com/${airdrop.twitter}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 hover:border-border transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center shrink-0">
                    <Twitter className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate">Twitter / X</p>
                    <p className="text-[9px] text-muted-foreground truncate">@{airdrop.twitter}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground ml-auto shrink-0 transition-colors" />
                </a>
              )}
              {airdrop.telegram && (
                <a href={airdrop.telegram} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 hover:border-border transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-blue-400/15 flex items-center justify-center shrink-0">
                    <Send className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate">Telegram</p>
                    <p className="text-[9px] text-muted-foreground truncate">Community</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground ml-auto shrink-0 transition-colors" />
                </a>
              )}
              {airdrop.discord && (
                <a href={airdrop.discord} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 hover:border-border transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                    <Hash className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate">Discord</p>
                    <p className="text-[9px] text-muted-foreground truncate">Server</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground ml-auto shrink-0 transition-colors" />
                </a>
              )}
            </div>
          </MiniCard>

          {/* Chain & Network info */}
          <MiniCard>
            <SectionHeader icon={<Layers className="w-4 h-4 text-primary" />} title="Chain & Network" />
            <div className="p-3 space-y-2">
              {airdrop.chain && (
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: chainColor + "25" }}>
                      <Layers className="w-3.5 h-3.5" style={{ color: chainColor }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground">Blockchain</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: chainColor }} />
                    <span className="text-[11px] font-bold">{airdrop.chain}</span>
                  </div>
                </div>
              )}
              {airdrop.network && (
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      airdrop.network === "Testnet" ? "bg-purple-500/15" : airdrop.network === "Both" ? "bg-cyan-500/15" : "bg-emerald-500/15"
                    )}>
                      <Server className={cn("w-3.5 h-3.5",
                        airdrop.network === "Testnet" ? "text-purple-400" : airdrop.network === "Both" ? "text-cyan-400" : "text-emerald-400"
                      )} />
                    </div>
                    <span className="text-[11px] text-muted-foreground">Network</span>
                  </div>
                  <span className={cn("text-[11px] font-bold",
                    airdrop.network === "Testnet" ? "text-purple-400" : airdrop.network === "Both" ? "text-cyan-400" : "text-emerald-400"
                  )}>
                    {airdrop.network}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">Status</span>
                </div>
                <span className={cn("text-[11px] font-bold", STATUS_CLS[airdrop.status])}>{airdrop.status}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">Raise</span>
                </div>
                <span className="text-[11px] font-bold">{airdrop.raiseFunds ?? "Undisclosed"}</span>
              </div>
            </div>
          </MiniCard>

          {/* Backers */}
          {(airdrop.backers?.length ?? 0) > 0 && (
            <MiniCard>
              <SectionHeader icon={<Users className="w-4 h-4 text-primary" />} title="Investors" />
              <div className="p-3 space-y-1.5">
                {airdrop.backers!.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/30 transition-colors">
                    <BackerAvatar b={b} />
                    <span className="text-[11px] font-medium truncate flex-1">{b.name}</span>
                  </div>
                ))}
                {(airdrop.backersExtra ?? 0) > 0 && (
                  <p className="text-[10px] text-muted-foreground text-center pt-1 pb-0.5">
                    +{airdrop.backersExtra} more investors
                  </p>
                )}
              </div>
            </MiniCard>
          )}

          {/* Score */}
          {airdrop.moniScore && (
            <MiniCard>
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[20px] font-black text-primary leading-none">{airdrop.moniScore.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Moni Score</p>
                </div>
                <div className="ml-auto">
                  <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (airdrop.moniScore / 10000) * 100)}%` }} />
                  </div>
                  <p className="text-[9px] text-muted-foreground text-right mt-0.5">{Math.round((airdrop.moniScore / 10000) * 100)}%</p>
                </div>
              </div>
            </MiniCard>
          )}
        </div>
      </div>
    </div>
  );
}
