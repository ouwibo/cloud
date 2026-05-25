import { useParams, Link } from "wouter";
import { mockAirdrops } from "@/lib/mockData";
import { ArrowLeft, ExternalLink, Star, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_EMOJI = { "Confirmed": "👌", "Potential": "🤔", "Reward Available": "🤑" } as const;
const TYPE_CLS: Record<string, string> = {
  "Fill The Form":  "bg-blue-500/15 text-blue-400",
  "Trading":        "bg-green-500/15 text-green-400",
  "Testnet":        "bg-purple-500/15 text-purple-400",
  "Social":         "bg-pink-500/15 text-pink-400",
  "Liquidity":      "bg-amber-500/15 text-amber-400",
  "Staking":        "bg-indigo-500/15 text-indigo-400",
  "Mainnet":        "bg-emerald-500/15 text-emerald-400",
  "Hold":           "bg-orange-500/15 text-orange-400",
  "Referral":       "bg-cyan-500/15 text-cyan-400",
  "Community":      "bg-rose-500/15 text-rose-400",
};

function MoniBar({ score }: { score: number }) {
  const pct = Math.min(100, (score / 8000) * 100);
  const dotColor = pct > 66 ? "#4ade80" : pct > 33 ? "#facc15" : "#f87171";
  return (
    <div className="flex items-center gap-3">
      <span className="text-[22px] font-bold">{score.toLocaleString()}</span>
      <div className="relative flex-1 h-2 rounded-full"
        style={{ background: "linear-gradient(to right,#ef4444,#f97316,#eab308,#22c55e)" }}>
        <span className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-background"
          style={{ left: `calc(${pct}% - 7px)`, background: dotColor }} />
      </div>
    </div>
  );
}

export default function AirdropDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const a = mockAirdrops.find(x => x.slug === slug);

  if (!a) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center">
      <p className="text-5xl">🔍</p>
      <p className="text-[16px] font-semibold">Airdrop not found</p>
      <Link href="/airdrops" className="text-[13px] text-primary hover:underline">← Back to list</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Link href="/airdrops" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Airdrops
      </Link>

      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"
            style={{ background: a.logoColor }}>
            {a.logoUrl ? <img src={a.logoUrl} className="w-full h-full object-cover" alt={a.name} /> : a.logoInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-[20px] font-bold">{a.name}</h1>
              {a.ticker && <span className="text-[13px] text-muted-foreground">{a.ticker}</span>}
              {a.isNew && <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded">New</span>}
            </div>
            <div className="flex items-center gap-2 text-[12px] flex-wrap">
              <span className="flex items-center gap-1">
                {STATUS_EMOJI[a.status]}
                <span className={a.status === "Reward Available" ? "text-blue-400 font-semibold" : ""}>{a.status}</span>
              </span>
              <span className="text-muted-foreground">· {a.statusDate}</span>
              <span className="text-muted-foreground">· {a.rewardType}</span>
              {a.raiseFunds && <span className="text-muted-foreground">· {a.raiseFunds} raised</span>}
            </div>
          </div>
        </div>
        <MoniBar score={a.moniScore} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Tasks",  value: a.tasks.length.toString(),                                  icon: "✅" },
          { label: "Min Cost",     value: a.tasks.length ? `$${Math.min(...a.tasks.map(t => t.cost))}` : "—", icon: "💰" },
          { label: "Fastest Task", value: a.tasks.length ? `${Math.min(...a.tasks.map(t => t.timeMin))} min` : "—", icon: "⚡" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="text-[16px] font-bold">{value}</p>
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="text-[14px] font-semibold">All Tasks ({a.tasks.length})</h2>
          {a.tasks.length === 0 && <span className="text-[12px] text-orange-400">No active tasks</span>}
        </div>
        {a.tasks.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Task</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide w-28">Type</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide w-20">Cost</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide w-20">Time</th>
                <th className="px-4 py-2 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {a.tasks.map((t, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-[13px] font-medium">{t.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {t.types.map(tp => (
                        <span key={tp} className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", TYPE_CLS[tp] ?? "bg-muted text-muted-foreground")}>
                          {tp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px]">
                    <span className={t.cost === 0 ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                      {t.cost === 0 ? "Free" : `$${t.cost}`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{t.timeMin} min</td>
                  <td className="px-4 py-3 text-right">
                    <a href={t.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      Go <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Backers */}
      {a.backers?.length ? (
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="text-[13px] font-semibold mb-3">Backers / Investors</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {a.backers.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: b.color }}>{b.initial}</span>
              </div>
            ))}
            {a.backersExtra ? <span className="text-[12px] text-muted-foreground">+{a.backersExtra} more</span> : null}
            {a.raiseFunds && <span className="ml-auto text-[13px] font-semibold">{a.raiseFunds} total raised</span>}
          </div>
        </div>
      ) : null}
    </div>
  );
}
