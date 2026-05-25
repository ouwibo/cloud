import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

/* ── SVG Icons (Whendrops line-style) ── */
const IcHome = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IcZap = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IcChat = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IcSettings = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IcSearch = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IcMoon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const IcSun = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IcMenu = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IcChevUp = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

/* ── Nav Items ── */
const NAV = [
  { href: "/",         label: "Dashboard", color: "#f97316", Icon: IcHome     },
  { href: "/airdrops", label: "Airdrops",  color: "#8b5cf6", Icon: IcZap      },
  { href: "/chat",     label: "AI Chat",   color: "#06b6d4", Icon: IcChat     },
  { href: "/settings", label: "Settings",  color: "#10b981", Icon: IcSettings },
];

/* ── Scroll to Top ── */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-50 w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center text-foreground shadow-lg hover:scale-110 transition-transform"
      style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}
    >
      <IcChevUp size={16} />
    </button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const activeNav = NAV.find(n => n.href === location) ?? NAV[0];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Top Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/90 backdrop-blur-md border-b border-border flex items-center gap-3 px-4">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-foreground"
        >
          <IcMenu size={18} />
        </button>

        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: "linear-gradient(135deg,#f97316,#8b5cf6)", fontFamily: DISPLAY }}>
              O
            </div>
            <span className="font-black text-sm hidden sm:block" style={{ fontFamily: DISPLAY }}>
              Ouwibo
            </span>
            <span className="text-muted-foreground text-xs hidden md:block" style={{ fontFamily: MONO }}>
              · Airdrop Tracker
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-sm mx-auto">
          <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 text-muted-foreground">
            <IcSearch size={14} />
            <span className="text-xs" style={{ fontFamily: MONO }}>Search airdrops…</span>
          </div>
        </div>

        {/* Right Icons */}
        <div className="ml-auto flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-foreground"
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? <IcSun size={16} /> : <IcMoon size={16} />}
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ml-1"
            style={{ background: "linear-gradient(135deg,#f97316,#8b5cf6)", fontFamily: DISPLAY }}>
            O
          </div>
        </div>
      </header>

      {/* ── Narrow Left Sidebar ── */}
      <aside className={cn(
        "fixed top-14 left-0 bottom-0 z-40 border-r border-border bg-background transition-all duration-300 flex flex-col items-center py-5 gap-1",
        sidebarOpen ? "w-52" : "w-16"
      )}>
        {NAV.map((item, i) => {
          const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <div key={item.href} className="w-full px-2">
              {i > 0 && (
                <div className="border-t border-border/50 my-2 mx-2" />
              )}
              <Link href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all group",
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                style={active ? { backgroundColor: item.color, boxShadow: `0 4px 14px ${item.color}55` } : {}}>
                  <div className="shrink-0">
                    <item.Icon size={18} color={active ? "#fff" : undefined} />
                  </div>
                  {sidebarOpen && (
                    <span className="text-xs font-bold whitespace-nowrap transition-opacity" style={{ fontFamily: MONO }}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          );
        })}

        {/* Spacer + theme at bottom */}
        <div className="mt-auto w-full px-2">
          <div className="border-t border-border/50 mb-3 mx-2" />
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <div className="shrink-0">
              {theme === "dark" ? <IcSun size={18} /> : <IcMoon size={18} />}
            </div>
            {sidebarOpen && (
              <span className="text-xs font-bold whitespace-nowrap" style={{ fontFamily: MONO }}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ── */}
      <main className={cn(
        "pt-14 transition-all duration-300",
        sidebarOpen ? "ml-52" : "ml-16"
      )}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 pb-24">
          {children}
        </div>
      </main>

      {/* ── Bottom Mobile Nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur border-t border-border flex lg:hidden">
        {NAV.map(item => {
          const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className="flex flex-col items-center justify-center h-full gap-1 cursor-pointer">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                  active ? "text-white scale-110" : "text-muted-foreground"
                )}
                style={active ? { backgroundColor: item.color, boxShadow: `0 3px 10px ${item.color}66` } : {}}>
                  <item.Icon size={17} color={active ? "#fff" : undefined} />
                </div>
                <span className="text-[9px] font-bold" style={{ fontFamily: MONO, color: active ? item.color : undefined }}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <ScrollTop />
    </div>
  );
}
