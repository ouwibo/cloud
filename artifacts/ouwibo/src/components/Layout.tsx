import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useTheme, THEME_LIST } from "@/components/ThemeProvider";
import AnimatedBackground from "@/components/AnimatedBackground";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Zap, Newspaper, Wallet, Calendar, Bell,
  Settings, Menu, X, ChevronUp, Search, BookOpen,
  TrendingUp, ChevronRight, Palette,
} from "lucide-react";
import { useEffect } from "react";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

/* ── Nav groups ── */
const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { href: "/",          label: "Dashboard",  Icon: LayoutDashboard, color: "var(--color-primary)" },
      { href: "/airdrops",  label: "Airdrops",   Icon: Zap,             color: "var(--color-primary)" },
      { href: "/news",      label: "News",       Icon: Newspaper,       color: "var(--color-primary)" },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { href: "/portfolio", label: "Portfolio",  Icon: Wallet,          color: "var(--color-primary)", soon: true },
      { href: "/calendar",  label: "Calendar",   Icon: Calendar,        color: "var(--color-primary)", soon: true },
      { href: "/alerts",    label: "Alerts",     Icon: Bell,            color: "var(--color-primary)", soon: true },
    ],
  },
  {
    label: "RESOURCES",
    items: [
      { href: "/guide",     label: "How to Farm",Icon: BookOpen,        color: "var(--color-primary)", soon: true },
      { href: "/chat",      label: "AI Chat",    Icon: TrendingUp,      color: "var(--color-primary)" },
    ],
  },
];

const ALL_NAV = NAV_GROUPS.flatMap(g => g.items);

/* ── Scroll to top ── */
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
      className="fixed bottom-24 right-5 z-50 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:scale-110 transition-transform"
      style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}
    >
      <ChevronUp size={15} />
    </button>
  );
}

/* ── Theme palette picker ── */
function ThemePicker({ expanded }: { expanded: boolean }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full px-2">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        )}
      >
        <div className="shrink-0 w-5 flex items-center justify-center">
          <Palette size={17} />
        </div>
        {expanded && (
          <>
            <span className="text-[11px] font-bold flex-1 text-left" style={{ fontFamily: MONO }}>
              Theme
            </span>
            <div
              className="w-4 h-4 rounded-full border-2 border-border shrink-0"
              style={{ backgroundColor: THEME_LIST.find(t => t.id === theme)?.swatch }}
            />
          </>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute bottom-full mb-2 bg-card border border-border rounded-2xl p-3 shadow-lg z-50",
            expanded ? "left-2 right-2" : "left-14 w-52"
          )}
          style={{ boxShadow: "4px 4px 0 hsl(var(--border))" }}
        >
          <p className="text-[9px] font-bold text-muted-foreground mb-2.5 tracking-widest" style={{ fontFamily: MONO }}>
            COLOR THEME
          </p>
          <div className="grid grid-cols-4 gap-2">
            {THEME_LIST.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                title={t.label}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all",
                  theme === t.id ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-muted"
                )}
              >
                <div
                  className="w-7 h-7 rounded-full border-2"
                  style={{
                    backgroundColor: t.swatch,
                    borderColor: theme === t.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }}
                />
                <span className="text-[8px] font-bold text-muted-foreground leading-none" style={{ fontFamily: MONO }}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Single nav item ── */
type NavItem = typeof ALL_NAV[0];

function NavLink({
  item,
  active,
  expanded,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  expanded: boolean;
  onClick?: () => void;
}) {
  const inner = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all w-full",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
      )}
      style={active ? { boxShadow: "0 3px 12px hsl(var(--primary) / 0.35)" } : {}}
    >
      <div className="shrink-0 w-5 flex items-center justify-center">
        <item.Icon size={17} />
      </div>
      {expanded && (
        <span className="text-[11px] font-bold flex-1 whitespace-nowrap" style={{ fontFamily: MONO }}>
          {item.label}
        </span>
      )}
      {expanded && (item as any).soon && !active && (
        <span
          className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground"
          style={{ fontFamily: MONO }}
        >
          SOON
        </span>
      )}
      {expanded && active && <ChevronRight size={11} className="ml-auto opacity-60" />}
    </div>
  );

  const isStub = !!(item as any).soon;
  return (
    <div className="w-full px-2">
      {isStub ? (
        <div onClick={onClick}>{inner}</div>
      ) : (
        <Link href={item.href} onClick={onClick}>{inner}</Link>
      )}
    </div>
  );
}

/* ── Sidebar contents (shared desktop + mobile) ── */
function SidebarContents({
  expanded,
  onNav,
}: {
  expanded: boolean;
  onNav?: () => void;
}) {
  const [location] = useLocation();

  function isActive(href: string) {
    return href === "/" ? location === "/" : location.startsWith(href);
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 space-y-0.5">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {gi > 0 && <div className="mx-4 my-2 border-t border-border/40" />}
            {expanded && (
              <p
                className="px-5 pt-1 pb-1.5 text-[9px] font-bold text-muted-foreground/40 tracking-widest select-none"
                style={{ fontFamily: MONO }}
              >
                {group.label}
              </p>
            )}
            {group.items.map(item => (
              <NavLink
                key={item.href}
                item={item}
                active={isActive(item.href)}
                expanded={expanded}
                onClick={onNav}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom: settings + theme picker */}
      <div className="shrink-0 border-t border-border/40 pt-2 pb-2 space-y-0.5">
        <NavLink
          item={{ href: "/settings", label: "Settings", Icon: Settings, color: "" }}
          active={location === "/settings"}
          expanded={expanded}
          onClick={onNav}
        />
        <ThemePicker expanded={expanded} />
      </div>
    </>
  );
}

/* ── Main Layout ── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const SIDEBAR_W = expanded ? 220 : 64;

  return (
    <div className="min-h-screen bg-background text-foreground relative">

      {/* Animated gradient orbs behind everything */}
      <AnimatedBackground />

      {/* ── Top Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-xl border-b border-border/60 flex items-center gap-3 px-4"
        style={{ position: "fixed" }}
      >
        <button
          onClick={() => {
            if (window.innerWidth >= 1024) {
              setExpanded(o => !o);
            } else {
              setMobileOpen(o => !o);
            }
          }}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors shrink-0"
        >
          <Menu size={18} />
        </button>

        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer select-none shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
              style={{ background: "linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary) / 0.5))", fontFamily: DISPLAY }}
            >
              O
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-sm leading-none" style={{ fontFamily: DISPLAY }}>Ouwibo</span>
              <span className="text-[9px] text-muted-foreground" style={{ fontFamily: MONO }}>Cloud</span>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2 text-muted-foreground border border-border/50">
            <Search size={13} />
            <span className="text-[11px]" style={{ fontFamily: MONO }}>Search airdrops, news…</span>
            <span className="ml-auto text-[10px] bg-background border border-border/50 rounded px-1.5 py-0.5 hidden md:block" style={{ fontFamily: MONO }}>
              ⌘K
            </span>
          </div>
        </div>

        {/* Right — bell + avatar */}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground text-[11px] font-bold ml-1 border border-border"
            style={{ background: "linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary) / 0.6))", fontFamily: DISPLAY }}
          >
            O
          </div>
        </div>
      </header>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="fixed top-14 left-0 bottom-0 z-40 border-r border-border/60 bg-sidebar/80 backdrop-blur-xl hidden lg:flex flex-col transition-all duration-300 overflow-hidden"
        style={{ width: SIDEBAR_W }}
      >
        <SidebarContents expanded={expanded} />
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
          <aside
            className="absolute top-0 left-0 bottom-0 w-64 bg-sidebar/95 backdrop-blur-xl border-r border-border/60 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-border/40 shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
                  style={{ background: "linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary) / 0.5))", fontFamily: DISPLAY }}
                >
                  O
                </div>
                <span className="font-black text-sm" style={{ fontFamily: DISPLAY }}>Ouwibo Cloud</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted">
                <X size={16} />
              </button>
            </div>

            <SidebarContents expanded={true} onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <main
        className="pt-14 hidden lg:block relative z-10"
        style={{ marginLeft: SIDEBAR_W, transition: "margin-left 0.3s" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-7 pb-12">
          {children}
        </div>
      </main>

      {/* Mobile main */}
      <main className="pt-14 lg:hidden pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* ── Bottom mobile nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-sidebar/90 backdrop-blur-xl border-t border-border/60 flex lg:hidden">
        {ALL_NAV.slice(0, 5).map(item => {
          const active =
            item.href === "/" ? location === "/" : location.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={(item as any).soon ? location : item.href}
              className="flex-1"
            >
              <div className="flex flex-col items-center justify-center h-full gap-1 cursor-pointer">
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                    active
                      ? "bg-primary text-primary-foreground scale-110"
                      : "text-muted-foreground"
                  )}
                  style={active ? { boxShadow: "0 3px 10px hsl(var(--primary) / 0.4)" } : {}}
                >
                  <item.Icon size={17} />
                </div>
                <span
                  className="text-[8px] font-bold truncate"
                  style={{ fontFamily: MONO, color: active ? "hsl(var(--primary))" : undefined }}
                >
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
