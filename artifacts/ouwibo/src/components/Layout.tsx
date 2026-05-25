import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

/* ── Custom SVG Icons (inspired by iCloudice Blogger template) ── */
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M2.4 11.713C2.4 6.082 3.014 6.475 6.319 3.41 7.765 2.246 10.015 0 11.958 0c1.942 0 4.237 2.235 5.696 3.41C20.959 6.475 21.572 6.082 21.572 11.713 21.572 20 19.613 20 11.986 20 4.359 20 2.4 20 2.4 11.713Z"/>
    <line x1="9" y1="20" x2="9" y2="14" strokeWidth="1.5"/>
    <line x1="15" y1="20" x2="15" y2="14" strokeWidth="1.5"/>
    <line x1="9" y1="14" x2="15" y2="14" strokeWidth="1.5"/>
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M9 22h6l-3-9 5-2L7 2l3 9-5 2 4 9Z"/>
    <path d="M13 2 9 11l5 2-5 9" strokeDasharray="2 2" opacity="0.4"/>
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M19.07 19.07C16.016 22.127 11.49 22.787 7.786 21.074c-.547-.22-4.085.76-4.853-.007-.768-.768.213-4.307-.007-4.854C1.213 12.51 1.874 7.983 4.93 4.927c3.9-3.9 10.24-3.9 14.14 0 3.9 3.9 3.9 10.24 0 14.14Z"/>
    <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
  </svg>
);

const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
  </svg>
);

const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconHam = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
    <path d="M3 18H14M10 6H21"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* Wave SVG (from Blogger template wave animation) */
const WaveDecoration = () => (
  <div style={{ position: "relative", height: "48px", overflow: "hidden", opacity: 0.5 }}>
    <svg preserveAspectRatio="none" viewBox="0 24 150 28" style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}>
      <defs>
        <path id="wave-nav" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
      </defs>
      <g>
        <use xlinkHref="#wave-nav" x="48" y="0" fill="hsl(var(--primary)/0.15)"/>
        <use xlinkHref="#wave-nav" x="48" y="3" fill="hsl(var(--primary)/0.1)"/>
        <use xlinkHref="#wave-nav" x="48" y="5" fill="hsl(var(--primary)/0.07)"/>
      </g>
    </svg>
  </div>
);

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    color: "#f97316",
    colorMuted: "rgba(249,115,22,0.15)",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#f97316" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: "/airdrops",
    label: "Airdrops",
    color: "#8b5cf6",
    colorMuted: "rgba(139,92,246,0.15)",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#8b5cf6" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    href: "/chat",
    label: "AI Chat",
    color: "#06b6d4",
    colorMuted: "rgba(6,182,212,0.15)",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#06b6d4" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle cx="9" cy="10" r="1" fill={active ? "#06b6d4" : "currentColor"}/>
        <circle cx="12" cy="10" r="1" fill={active ? "#06b6d4" : "currentColor"}/>
        <circle cx="15" cy="10" r="1" fill={active ? "#06b6d4" : "currentColor"}/>
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    color: "#10b981",
    colorMuted: "rgba(16,185,129,0.15)",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#10b981" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
];

function NavItem({ href, label, color, colorMuted, icon }: typeof navItems[0]) {
  const [loc] = useLocation();
  const active = href === "/" ? loc === "/" : loc.startsWith(href);

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer group",
          active ? "shadow-sm" : "hover:bg-muted/60"
        )}
        style={active ? {
          background: colorMuted,
          border: `2px solid ${color}30`,
          boxShadow: `0 2px 12px ${color}25`,
        } : { border: "2px solid transparent" }}
      >
        <span className="transition-transform duration-200 group-hover:scale-110">
          {icon(active)}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: "0.72rem",
            fontWeight: 700,
            color: active ? color : undefined,
          }}
          className={cn("transition-colors", !active && "text-muted-foreground group-hover:text-foreground")}
        >
          {label}
        </span>
        {active && (
          <span className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
        )}
      </div>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [loc] = useLocation();

  return (
    <div className="flex min-h-screen bg-background">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-56 border-r-2 border-border bg-background z-40">
        {/* Logo */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #8b5cf6 50%, #06b6d4 100%)", boxShadow: "3px 3px 0 hsl(var(--border))" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 800 }}>Ouwibo</div>
              <div style={{ fontFamily: MONO, fontSize: "0.55rem", fontWeight: 700 }} className="text-muted-foreground">Airdrop Tracker</div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-1">
            {navItems.map(item => <NavItem key={item.href} {...item} />)}
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Wave decoration */}
        <div className="overflow-hidden opacity-30 mb-0 -mb-1">
          <svg viewBox="0 0 220 60" className="w-full">
            <path d="M0,30 C40,50 80,10 120,30 C160,50 200,10 220,30 L220,60 L0,60 Z" fill="#f97316" opacity="0.3"/>
            <path d="M0,40 C40,20 80,55 120,40 C160,20 200,55 220,40 L220,60 L0,60 Z" fill="#8b5cf6" opacity="0.3"/>
            <path d="M0,50 C50,30 100,60 150,45 C180,36 210,50 220,55 L220,60 L0,60 Z" fill="#06b6d4" opacity="0.4"/>
          </svg>
        </div>

        {/* Theme + footer */}
        <div className="p-4 pt-0 border-t-2 border-border">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-border hover:bg-muted transition-all"
            style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, boxShadow: "2px 2px 0 hsl(var(--border))" }}
          >
            <span style={{ color: isDark ? "#fbbf24" : "#6366f1" }}>
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b-2 border-border bg-background z-50 flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #f97316 0%, #8b5cf6 50%, #06b6d4 100%)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <span style={{ fontFamily: DISPLAY, fontSize: "0.8rem", fontWeight: 800 }}>Ouwibo</span>
        </div>
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2 rounded-xl border-2 border-border"
          style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
        >
          {isDark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 pt-14 lg:pt-0 min-h-screen pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t-2 border-border bg-background z-50 flex">
        {navItems.map(({ href, label, color, colorMuted, icon }) => {
          const active = href === "/" ? loc === "/" : loc.startsWith(href);
          return (
            <Link key={href} href={href} className="flex-1">
              <div className="flex flex-col items-center gap-1 py-2.5 transition-all"
                style={active ? { background: colorMuted, borderTop: `2px solid ${color}` } : {}}>
                <span className="transition-transform duration-200" style={{ transform: active ? "scale(1.15)" : "scale(1)" }}>
                  {icon(active)}
                </span>
                <span style={{ fontFamily: MONO, fontSize: "0.5rem", fontWeight: 700, color: active ? color : undefined }}
                  className={cn(!active && "text-muted-foreground")}>
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
