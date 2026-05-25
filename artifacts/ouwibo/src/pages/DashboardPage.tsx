import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { mockAirdrops, mockActivity, mockTasks } from "@/lib/mockData";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

/* ── Scroll animation hook ── */
function useAnim(cls = "anim-up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("anim");
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add(cls), delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [cls, delay]);
  return ref;
}

/* ── Status & Difficulty colors ── */
const STATUS: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "#dcfce7", text: "#166534", label: "Active"    },
  upcoming:  { bg: "#fef9c3", text: "#854d0e", label: "Upcoming"  },
  ended:     { bg: "#f3f4f6", text: "#374151", label: "Ended"     },
  potential: { bg: "#ede9fe", text: "#5b21b6", label: "Potential" },
};
const DIFF_COLOR: Record<string, string> = {
  easy: "#10b981", medium: "#f59e0b", hard: "#ef4444",
};
const CARD_COLORS = ["#f97316","#8b5cf6","#06b6d4","#10b981","#f43f5e","#eab308","#3b82f6","#a855f7","#14b8a6","#f97316"];

/* ── Section Header (Whendrops style) ── */
function SectionHeader({ title, href }: { title: string; href?: string }) {
  const ref = useAnim("anim-left");
  return (
    <div ref={ref} className="anim flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <h2 className="font-black text-lg text-foreground" style={{ fontFamily: DISPLAY }}>{title}</h2>
        <div className="flex-1 h-px w-12 bg-border" />
      </div>
      {href && (
        <Link href={href}>
          <span className="text-xs font-bold text-primary hover:underline cursor-pointer" style={{ fontFamily: MONO }}>
            See all →
          </span>
        </Link>
      )}
      <span className="text-muted-foreground/30 text-xl font-bold ml-2 select-none">···</span>
    </div>
  );
}

/* ── Stat Card ── */
const STAT_DEFS = [
  { label: "TOTAL AIRDROPS", color: "#f97316", icon: "⚡" },
  { label: "ACTIVE",         color: "#8b5cf6", icon: "🟢" },
  { label: "UPCOMING",       color: "#06b6d4", icon: "🕐" },
  { label: "TASKS TRACKED",  color: "#10b981", icon: "✅" },
];
function StatCard({ def, value, delay }: { def: typeof STAT_DEFS[0]; value: number; delay: number }) {
  const ref = useAnim("anim-scale", delay);
  return (
    <div ref={ref} className="anim rounded-2xl border-2 border-border bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-6 translate-x-6"
        style={{ backgroundColor: def.color }} />
      <p className="text-xs font-bold text-muted-foreground mb-2" style={{ fontFamily: MONO }}>{def.label}</p>
      <p className="text-4xl font-black mb-1" style={{ fontFamily: DISPLAY, color: def.color }}>{value}</p>
      <div className="w-8 h-1 rounded-full" style={{ backgroundColor: def.color }} />
    </div>
  );
}

/* ── Airdrop Card (Whendrops post-card style) ── */
function AirdropCard({ airdrop, index }: { airdrop: any; index: number }) {
  const ref = useAnim("anim-up", index * 80);
  const color = CARD_COLORS[index % CARD_COLORS.length];
  const st = STATUS[airdrop.status] ?? STATUS.potential;
  return (
    <div ref={ref} className="anim rounded-2xl border-2 border-border bg-card overflow-hidden hover:-translate-y-1 transition-transform duration-200"
      style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
      {/* Thumbnail area */}
      <div className="relative h-36 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}cc, ${color}44)` }}>
        <span className="text-5xl font-black text-white select-none drop-shadow-lg" style={{ fontFamily: DISPLAY }}>
          {airdrop.logoInitial}
        </span>
        {/* Status badge */}
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border"
          style={{ backgroundColor: st.bg, color: st.text, fontFamily: MONO, borderColor: st.text + "33" }}>
          {st.label}
        </span>
        {/* Verified badge */}
        {airdrop.isVerified && (
          <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-xs">
            ✓
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[10px] text-muted-foreground mb-1" style={{ fontFamily: MONO }}>
          {airdrop.category} · {airdrop.chain}
        </p>
        <h3 className="font-black text-sm text-foreground mb-1 leading-tight" style={{ fontFamily: DISPLAY }}>
          {airdrop.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3" style={{ fontFamily: MONO }}>
          {airdrop.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={{ color, fontFamily: MONO }}>
            {airdrop.rewardEstimate ?? "TBD"}
          </span>
          <a href={airdrop.referralUrl || airdrop.websiteUrl} target="_blank" rel="noopener noreferrer"
            className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: color, fontFamily: MONO }}>
            Join →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Featured Card (pinned post style) ── */
function FeaturedCard({ airdrop }: { airdrop: any }) {
  const ref = useAnim("anim-up", 0);
  const color = CARD_COLORS[0];
  const st = STATUS[airdrop.status] ?? STATUS.potential;
  return (
    <div ref={ref} className="anim rounded-2xl border-2 border-border bg-card overflow-hidden mb-8"
      style={{ boxShadow: "4px 4px 0 hsl(var(--border))" }}>
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="sm:w-72 h-48 sm:h-auto flex-shrink-0 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${color}cc, ${color}55)` }}>
          <span className="text-7xl font-black text-white select-none drop-shadow-xl" style={{ fontFamily: DISPLAY }}>
            {airdrop.logoInitial}
          </span>
          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90"
            style={{ color, fontFamily: MONO }}>
            Featured ★
          </span>
        </div>
        {/* Content */}
        <div className="p-6 flex flex-col justify-center flex-1">
          <p className="text-[10px] text-muted-foreground mb-2" style={{ fontFamily: MONO }}>
            {airdrop.category} · {airdrop.chain}
          </p>
          <h3 className="font-black text-2xl text-foreground mb-2 leading-tight" style={{ fontFamily: DISPLAY }}>
            {airdrop.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4" style={{ fontFamily: MONO }}>
            {airdrop.description}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold px-3 py-1 rounded-full border"
              style={{ backgroundColor: st.bg, color: st.text, fontFamily: MONO, borderColor: st.text + "33" }}>
              {st.label}
            </span>
            <span className="text-xs font-bold" style={{ color, fontFamily: MONO }}>
              Est. {airdrop.rewardEstimate ?? "TBD"}
            </span>
            <a href={airdrop.referralUrl || airdrop.websiteUrl} target="_blank" rel="noopener noreferrer"
              className="ml-auto text-xs font-bold px-4 py-2 rounded-full text-white"
              style={{ backgroundColor: color, fontFamily: MONO }}>
              Join Airdrop →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Crypto Ticker ── */
const TICKERS = [
  { sym: "ETH",  name: "Ethereum",  price: "$2,112",  chg: "-0.20%", up: false },
  { sym: "BNB",  name: "BNB",       price: "$667",    chg: "+1.28%", up: true  },
  { sym: "SOL",  name: "Solana",    price: "$168",    chg: "+2.10%", up: true  },
  { sym: "ARB",  name: "Arbitrum",  price: "$0.78",   chg: "-0.50%", up: false },
  { sym: "OP",   name: "Optimism",  price: "$1.52",   chg: "+3.10%", up: true  },
  { sym: "MATIC","name": "Polygon", price: "$0.55",   chg: "-1.20%", up: false },
  { sym: "AVAX", name: "Avalanche", price: "$34.50",  chg: "+0.90%", up: true  },
  { sym: "LINK", name: "Chainlink", price: "$14.20",  chg: "+1.80%", up: true  },
];

function CryptoTicker() {
  const items = [...TICKERS, ...TICKERS];
  return (
    <div className="rounded-2xl border-2 border-border bg-card overflow-hidden mt-8"
      style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
      <div className="overflow-hidden">
        <div className="flex ticker-track" style={{ width: "max-content" }}>
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 border-r border-border/40 shrink-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: `linear-gradient(135deg,${CARD_COLORS[i % CARD_COLORS.length]},${CARD_COLORS[(i+2) % CARD_COLORS.length]})` }}>
                {t.sym.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-foreground" style={{ fontFamily: MONO }}>{t.sym}</p>
                <p className="text-[10px] text-muted-foreground" style={{ fontFamily: MONO }}>{t.price}</p>
              </div>
              <span className="text-[10px] font-bold" style={{ fontFamily: MONO, color: t.up ? "#10b981" : "#ef4444" }}>
                {t.chg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Activity Feed ── */
function ActivityFeed() {
  const ref = useAnim("anim-left", 100);
  if (!mockActivity.length) return null;
  return (
    <div ref={ref} className="anim">
      <SectionHeader title="Recent Activity" />
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden" style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
        {mockActivity.map((act, i) => (
          <div key={act.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-border/40 last:border-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs"
              style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}>
              {act.type === "airdrop_added" ? "+" : "↺"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate" style={{ fontFamily: MONO }}>{act.message}</p>
              <p className="text-[10px] text-muted-foreground" style={{ fontFamily: MONO }}>
                {new Date(act.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function DashboardPage() {
  const airdrops   = mockAirdrops;
  const tasks      = mockTasks ?? [];
  const featured   = airdrops.filter(a => a.isFeatured);
  const rest        = airdrops.filter(a => !a.isFeatured);

  const statValues = [
    airdrops.length,
    airdrops.filter(a => a.status === "active").length,
    airdrops.filter(a => a.status === "upcoming").length,
    tasks.length,
  ];

  const greetRef = useAnim("anim-up", 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div>
      {/* Greeting */}
      <div ref={greetRef} className="anim mb-8">
        <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: MONO }}>
          {greeting} 👋
        </p>
        <h1 className="text-3xl font-black text-foreground" style={{ fontFamily: DISPLAY }}>
          Ouwibo <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundImage: "linear-gradient(135deg,#f97316,#8b5cf6,#06b6d4)", backgroundClip: "text" }}>Dashboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: MONO }}>
          Track and join the best crypto airdrops
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STAT_DEFS.map((def, i) => (
          <StatCard key={def.label} def={def} value={statValues[i]} delay={i * 80} />
        ))}
      </div>

      {/* Featured / Pinned Airdrop */}
      {featured.length > 0 && (
        <div>
          <SectionHeader title="Pinned Airdrop" />
          <FeaturedCard airdrop={featured[0]} />
        </div>
      )}

      {/* Airdrop Grid */}
      {rest.length > 0 && (
        <div className="mb-8">
          <SectionHeader title="Latest Airdrops" href="/airdrops" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.slice(0, 6).map((a, i) => (
              <AirdropCard key={a.id} airdrop={a} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {airdrops.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-5xl mb-4">🪂</p>
          <p className="font-black text-xl mb-2" style={{ fontFamily: DISPLAY }}>No Airdrops Yet</p>
          <p className="text-sm" style={{ fontFamily: MONO }}>Add airdrops in mockData.ts to get started</p>
        </div>
      )}

      {/* Activity Feed */}
      <ActivityFeed />

      {/* Crypto Ticker */}
      <CryptoTicker />
    </div>
  );
}
