import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { mockAirdrops, mockActivity } from "@/lib/mockData";

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

/* Wave SVG decoration for cards/sections */
const WaveSection = ({ color = "hsl(var(--primary)/0.12)" }: { color?: string }) => (
  <div style={{ position: "relative", height: 60, overflow: "hidden", marginTop: -2 }}>
    <svg preserveAspectRatio="none" viewBox="0 24 150 28"
      style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}>
      <defs>
        <path id="wv" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
      </defs>
      <g>
        <use xlinkHref="#wv" x="48" y="0" fill={color}/>
        <use xlinkHref="#wv" x="48" y="3" fill={color} style={{ opacity: 0.7 }}/>
        <use xlinkHref="#wv" x="48" y="5" fill={color} style={{ opacity: 0.5 }}/>
      </g>
    </svg>
  </div>
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
  const active    = mockAirdrops.filter(a => a.status === "active");
  const upcoming  = mockAirdrops.filter(a => a.status === "upcoming");
  const featured  = mockAirdrops.filter(a => a.isFeatured);
  const totalTasks = mockAirdrops.reduce((s, a) => s + (a.taskCount ?? 0), 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning! ☀️" : hour < 18 ? "Good Afternoon! 🌤️" : "Good Evening! 🌙";

  return (
    <div>
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-6 border-2 border-border"
        style={{ background: "linear-gradient(135deg, #f97316 0%, #8b5cf6 50%, #06b6d4 100%)", boxShadow: "4px 4px 0 hsl(var(--border))" }}>
        <div className="relative z-10 px-7 pt-7 pb-0">
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{greeting} · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          <h1 className="mt-1 text-white" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, textShadow: "2px 2px 0 rgba(0,0,0,0.15)" }}>Ouwibo Dashboard</h1>
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", color: "rgba(255,255,255,0.75)", marginTop: "6px" }}>Track airdrops · Complete tasks · Earn rewards</p>
        </div>
        {/* Multi-color waves */}
        <svg viewBox="0 0 800 80" className="w-full" style={{ display: "block", marginTop: "-10px" }}>
          <path d="M0,40 C100,70 200,10 400,40 C600,70 700,20 800,40 L800,80 L0,80 Z" fill="rgba(255,255,255,0.1)"/>
          <path d="M0,55 C150,30 300,70 500,50 C650,35 750,60 800,55 L800,80 L0,80 Z" fill="rgba(255,255,255,0.15)"/>
          <path d="M0,65 C200,45 400,75 600,60 C700,52 760,68 800,65 L800,80 L0,80 Z" fill="rgba(255,255,255,0.2)"/>
        </svg>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS(mockAirdrops, mockAirdrops).map(card => (
          <div key={card.label} className="rounded-2xl p-5 border-2 transition-transform hover:-translate-y-0.5"
            style={{ background: card.bg, borderColor: card.border, boxShadow: `3px 3px 0 ${card.border}` }}>
            <div className="flex items-start justify-between mb-3">
              <p style={{ fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: card.color }}>{card.label}</p>
              {card.icon}
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "2.2rem", fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Featured Airdrops ── */}
        <div className="xl:col-span-2">
          <div className="neo-card overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "2px solid hsl(var(--border))" }}>
              <div className="flex items-center gap-2">
                <IconStar size={16} />
                <span style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>
                  Featured Airdrops
                </span>
              </div>
              <Link href="/airdrops"
                style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700, color: "hsl(var(--primary))" }}>
                View all →
              </Link>
            </div>

            {featured.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16" style={{ opacity: 0.4 }}>
                <IconZap size={32} />
                <div style={{ fontFamily: MONO, fontSize: "0.7rem", marginTop: 12 }}>No featured airdrops yet</div>
              </div>
            ) : (
              <div>
                {featured.slice(0, 5).map((a, idx) => {
                  const st = STATUS_COLOR[a.status] ?? STATUS_COLOR.ended;
                  const diff = DIFF_BG[a.difficulty] ?? "#e6e6e6";
                  return (
                    <Link href={`/airdrops/${a.id}`} key={a.id}>
                      <div
                        className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/60 transition-colors cursor-pointer"
                        style={{ borderBottom: idx < featured.length - 1 ? "1px solid hsl(var(--border)/0.4)" : undefined }}>
                        {/* Logo */}
                        <div style={{
                          width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                          backgroundColor: a.logoColor ?? "#ddd",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: DISPLAY, fontSize: "0.8rem", fontWeight: 700, color: "#fff",
                          border: "2px solid hsl(var(--border))", boxShadow: "2px 2px 0 hsl(var(--border))",
                        }}>
                          {a.logoInitial}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ fontFamily: DISPLAY, fontSize: "0.82rem", fontWeight: 700 }}>{a.name}</span>
                            {a.isVerified && <IconCheck size={12} />}
                            {a.isFeatured && <IconStar size={11} />}
                          </div>
                          <div style={{ fontFamily: MONO, fontSize: "0.58rem", opacity: 0.6 }}>
                            {a.chain} · {a.taskCount} tasks
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span style={{
                            fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700,
                            background: diff, borderRadius: 6, padding: "2px 8px",
                            border: "1px solid rgba(0,0,0,0.12)",
                          }}>{a.difficulty}</span>
                          <span style={{
                            fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700,
                            background: st.bg, color: st.text, borderRadius: 6, padding: "2px 8px",
                            border: "1px solid rgba(0,0,0,0.12)",
                          }}>{st.label}</span>
                        </div>

                        {/* Reward */}
                        <div style={{
                          fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700,
                          color: "hsl(var(--primary))", flexShrink: 0, minWidth: 60, textAlign: "right",
                        }}>
                          {a.rewardEstimate ?? "TBD"}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Active Grid ── */}
          {active.length > 0 && (
            <div className="neo-card overflow-hidden mt-6">
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "2px solid hsl(var(--border))" }}>
                <div className="flex items-center gap-2">
                  <IconTrend size={16} />
                  <span style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>
                    🔥 Active Right Now
                  </span>
                </div>
                <Link href="/airdrops?status=active"
                  style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700, color: "hsl(var(--primary))" }}>
                  See all →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                {active.slice(0, 6).map(a => {
                  const diff = DIFF_BG[a.difficulty] ?? "#e6e6e6";
                  return (
                    <Link href={`/airdrops/${a.id}`} key={a.id}>
                      <div style={{
                        borderRadius: 16, border: "2px solid hsl(var(--border))",
                        padding: "14px", cursor: "pointer",
                        boxShadow: "2px 2px 0 hsl(var(--border))",
                        background: "hsl(var(--card))",
                        transition: "transform 0.15s, box-shadow 0.15s",
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 hsl(var(--border))"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 hsl(var(--border))"; }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div style={{
                            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                            backgroundColor: a.logoColor ?? "#ddd",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: DISPLAY, fontSize: "0.7rem", fontWeight: 700, color: "#fff",
                            border: "1.5px solid hsl(var(--border))",
                          }}>{a.logoInitial}</div>
                          <span style={{ fontFamily: DISPLAY, fontSize: "0.75rem", fontWeight: 700 }}>{a.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span style={{
                            fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700,
                            background: diff, borderRadius: 6, padding: "2px 6px",
                            border: "1px solid rgba(0,0,0,0.1)",
                          }}>{a.difficulty}</span>
                          <span style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, color: "hsl(var(--primary))" }}>
                            {a.rewardEstimate ?? "TBD"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-2" style={{ fontFamily: MONO, fontSize: "0.55rem", opacity: 0.55 }}>
                          <IconCheck size={10} />
                          {a.taskCount} tasks · {a.chain}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Right column: Activity ── */}
        <div>
          <div className="neo-card overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4"
              style={{ borderBottom: "2px solid hsl(var(--border))" }}>
              <IconActivity size={16} />
              <span style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>
                Recent Activity
              </span>
            </div>

            {mockActivity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12" style={{ opacity: 0.4 }}>
                <IconActivity size={28} />
                <div style={{ fontFamily: MONO, fontSize: "0.65rem", marginTop: 10 }}>No activity yet</div>
              </div>
            ) : (
              <div className="px-5 py-3">
                {mockActivity.map((act, i) => {
                  const bg = ["#b8d8f0","#b8e8c8","#f0e0a0","#d4c0f0","#f0c4a8"][i % 5];
                  return (
                    <div key={act.id}
                      className={cn("flex items-start gap-3 py-3", i < mockActivity.length - 1 ? "border-b border-border/30" : "")}>
                      {/* Dot timeline */}
                      <div style={{
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        background: bg, border: "1.5px solid rgba(0,0,0,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 2,
                      }}>
                        <IconLink size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, lineHeight: 1.4 }}>
                          {act.message}
                        </div>
                        <div style={{ fontFamily: MONO, fontSize: "0.55rem", opacity: 0.5, marginTop: 2 }}>
                          {new Date(act.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Quick links ── */}
          <div className="neo-card overflow-hidden mt-4">
            <div className="px-5 py-4" style={{ borderBottom: "2px solid hsl(var(--border))" }}>
              <span style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>Quick Access</span>
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: "View All Airdrops", href: "/airdrops", icon: <IconZap size={13}/>, bg: "#b8e8c8" },
                { label: "AI Chat Assistant", href: "/chat",     icon: <IconActivity size={13}/>, bg: "#b8d8f0" },
                { label: "Settings",          href: "/settings", icon: <IconLink size={13}/>, bg: "#d4c0f0" },
              ].map(item => (
                <Link key={item.href} href={item.href}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-muted/60 cursor-pointer"
                    style={{ border: "1.5px solid hsl(var(--border)/0.5)" }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, background: item.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0,
                    }}>{item.icon}</div>
                    <span style={{ fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700 }}>{item.label}</span>
                    <span style={{ marginLeft: "auto", opacity: 0.4, fontFamily: MONO, fontSize: "0.8rem" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
