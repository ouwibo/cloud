import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { mockAirdrops, mockActivity, mockTasks } from "@/lib/mockData";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

const STATUS_COLOR: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "#b8e8c8", text: "#0a5c2e", label: "Active"    },
  upcoming:  { bg: "#f0e0a0", text: "#5c3d0a", label: "Upcoming"  },
  ended:     { bg: "#c8dcc0", text: "#2d3d2a", label: "Ended"     },
  potential: { bg: "#d4c0f0", text: "#3c1a7a", label: "Potential" },
};

const DIFF_BG: Record<string, string> = {
  easy:   "#b8e8c8",
  medium: "#f0e0a0",
  hard:   "#f0c4a8",
};

/* Wave SVG - simple without xlinkHref */
const WaveDecor = () => (
  <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="w-full h-6">
    <path d="M0,15 C80,0 160,28 240,14 C300,3 350,22 400,14 L400,30 L0,30 Z" fill="hsl(var(--background))" />
  </svg>
);

/* Inline SVG icons */
const IconZap = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const IconActivity = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const IconStar = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

const IconClock = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconTrend = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconLink = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

/* Greeting based on time */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 4)  return "🌙 Sweet Dreams!";
  if (h < 12) return "☀️ Good Morning!";
  if (h < 17) return "🌤 Good Afternoon!";
  if (h < 22) return "🌆 Good Evening!";
  return "🌃 Good Night!";
}

const STAT_CARDS = (airdrops: any[], tasks: any[]) => [
  {
    label: "TOTAL AIRDROPS",
    value: airdrops.length,
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.3)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    label: "ACTIVE",
    value: airdrops.filter(a => a.status === "active").length,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: "UPCOMING",
    value: airdrops.filter(a => a.status === "upcoming").length,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.3)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: "TASKS TRACKED",
    value: tasks.length,
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.3)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const airdrops = mockAirdrops;
  const activity = mockActivity;
  const stats = STAT_CARDS(airdrops, mockTasks);
  const featured = airdrops.filter(a => a.isFeatured).slice(0, 3);
  const active = airdrops.filter(a => a.status === "active").slice(0, 6);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning! ☀️" : hour < 18 ? "Good Afternoon! 🌤️" : "Good Evening! 🌙";

  return (
    <div>
      {/* ── Hero Header ── */}
      <div className="relative rounded-2xl overflow-hidden mb-6 border-2 border-border"
        style={{ boxShadow: "4px 4px 0 hsl(var(--border))" }}>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #f97316 0%, #8b5cf6 50%, #06b6d4 100%)", opacity: 0.9 }} />
        <div className="relative px-6 py-8 text-white">
          <p style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, opacity: 0.85 }}>
            {getGreeting()} · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1 }}
            className="mt-1 mb-2">
            Ouwibo Dashboard
          </h1>
          <p style={{ fontFamily: MONO, fontSize: "0.72rem", opacity: 0.8 }}>
            Track airdrops · Complete tasks · Earn rewards
          </p>
        </div>
        <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0,20 C80,5 160,35 240,18 C300,5 350,28 400,20 L400,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(card => (
          <div key={card.label} className="rounded-2xl border-2 border-border p-4 bg-card"
            style={{ boxShadow: `3px 3px 0 ${card.color}40`, borderColor: `${card.color}50` }}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {card.label}
              </p>
              <span style={{ color: card.color }}>{card.icon}</span>
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "2rem", fontWeight: 900, color: card.color, lineHeight: 1 }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Featured + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Featured */}
        <div className="lg:col-span-2 rounded-2xl border-2 border-border bg-card p-5"
          style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>⭐ Featured Airdrops</p>
            <Link href="/airdrops" className="text-primary hover:underline" style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700 }}>
              View all →
            </Link>
          </div>
          {featured.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2 opacity-40">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <p style={{ fontFamily: MONO, fontSize: "0.65rem" }}>No featured airdrops yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {featured.map((airdrop, idx) => {
                const st = STATUS_COLOR[airdrop.status] ?? STATUS_COLOR.potential;
                return (
                  <Link href={`/airdrops/${airdrop.id}`} key={airdrop.id}>
                    <div className={cn("flex items-center gap-3 p-3 rounded-xl border-2 border-border hover:bg-muted transition-all cursor-pointer",
                      idx % 2 === 0 ? "bg-muted/30" : "bg-background")}
                      style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}>
                      <div className="w-9 h-9 rounded-xl border-2 border-border flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: airdrop.logoColor, fontFamily: DISPLAY, fontSize: "0.8rem" }}>
                        {airdrop.logoInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate" style={{ fontFamily: DISPLAY, fontSize: "0.78rem" }}>{airdrop.name}</p>
                        <p className="text-muted-foreground truncate" style={{ fontFamily: MONO, fontSize: "0.58rem" }}>{airdrop.chain}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-white shrink-0" style={{ backgroundColor: st.bg, fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700 }}>
                        {st.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="rounded-2xl border-2 border-border bg-card p-5"
          style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
          <p style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }} className="mb-4">⚡ Recent Activity</p>
          {activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2 opacity-40">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <p style={{ fontFamily: MONO, fontSize: "0.65rem" }}>No activity yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activity.slice(0, 5).map((act, idx) => (
                <div key={act.id} className={cn("flex items-start gap-2 pb-3", idx < activity.length - 1 && "border-b border-border")}>
                  <div className="w-6 h-6 rounded-lg border-2 border-border flex items-center justify-center shrink-0 mt-0.5 bg-muted">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: MONO, fontSize: "0.6rem" }} className="leading-relaxed">{act.message}</p>
                    <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.55rem" }}>
                      {new Date(act.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Active Airdrops ── */}
      {active.length > 0 && (
        <div className="rounded-2xl border-2 border-border bg-card p-5 mt-4"
          style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>🔥 Active Right Now</p>
            <Link href="/airdrops?status=active" className="text-primary hover:underline" style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700 }}>
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {active.map(airdrop => {
              const diff = DIFF_STYLE[airdrop.difficulty] ?? "#c8dcc0";
              return (
                <Link href={`/airdrops/${airdrop.id}`} key={airdrop.id}>
                  <div className="p-3.5 rounded-2xl border-2 border-border bg-background hover:bg-muted transition-all cursor-pointer"
                    style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl border-2 border-border flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: airdrop.logoColor, fontFamily: DISPLAY, fontSize: "0.75rem" }}>
                        {airdrop.logoInitial}
                      </div>
                      <p className="font-bold truncate flex-1" style={{ fontFamily: DISPLAY, fontSize: "0.75rem" }}>{airdrop.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-foreground" style={{ backgroundColor: diff, fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700 }}>
                        {airdrop.difficulty}
                      </span>
                      <span className="text-primary font-bold" style={{ fontFamily: MONO, fontSize: "0.65rem" }}>
                        {airdrop.rewardEstimate ?? "TBD"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.58rem" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                      {airdrop.taskCount} tasks · {airdrop.chain}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
