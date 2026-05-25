import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useTheme, ACCENT_LIST } from "@/components/ThemeProvider";
import AnimatedBackground from "@/components/AnimatedBackground";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Zap, Newspaper, Wallet, Calendar, Bell,
  Settings, Menu, ChevronUp, Search, BookOpen, MessageSquare,
  ChevronRight, Sun, Moon, PenLine,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { href: "/",          label: "Dashboard", Icon: LayoutDashboard },
      { href: "/airdrops",  label: "Airdrops",  Icon: Zap             },
      { href: "/news",      label: "News",      Icon: Newspaper       },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { href: "/admin",     label: "Write",     Icon: PenLine                         },
      { href: "/portfolio", label: "Portfolio", Icon: Wallet,   soon: true },
      { href: "/calendar",  label: "Calendar",  Icon: Calendar, soon: true },
      { href: "/alerts",    label: "Alerts",    Icon: Bell,     soon: true },
    ],
  },
  {
    label: "LEARN",
    items: [
      { href: "/guide",     label: "How to Farm", Icon: BookOpen,       soon: true },
      { href: "/chat",      label: "AI Chat",     Icon: MessageSquare              },
    ],
  },
];

const ALL_NAV = NAV_GROUPS.flatMap(g => g.items);

/* ── Scroll-to-top ── */
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
      className="fixed bottom-20 right-4 z-50 w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center hover:scale-110 transition-transform shadow-md"
    ><ChevronUp size={14} /></button>
  );
}

/* ── Appearance panel (dark/light + accent dots) ── */
function AppearancePanel({ expanded }: { expanded: boolean }) {
  const { mode, accent, setMode, setAccent } = useTheme();
  const isDark = mode === "dark";

  return (
    <div className="px-2 py-2 border-t border-border/40">
      {/* Dark / Light toggle */}
      <div className="flex items-center gap-2 px-2 mb-2"><button
          onClick={() => setMode(isDark ? "light" : "dark")}
          className={cn(
            "flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border border-border/60 transition-all text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          {isDark
            ? <Moon size={13} className="shrink-0" />
            : <Sun  size={13} className="shrink-0" />}
          {expanded && (
            <span className="text-[10px] font-bold" >
              {isDark ? "Dark" : "Light"}
            </span>
          )}
        </button></div>

      {/* Accent color dots */}
      <div className={cn("flex gap-1.5 px-2", expanded ? "justify-start" : "justify-center flex-col items-center")}>
        {ACCENT_LIST.map(a => (
          <button
            key={a.id}
            onClick={() => setAccent(a.id)}
            title={a.label}
            className="rounded-full transition-all hover:scale-110"
            style={{
              width: 14, height: 14,
              backgroundColor: a.hex,
              outline: accent === a.id ? `2px solid ${a.hex}` : "none",
              outlineOffset: 2,
              flexShrink: 0,
            }}
          />
        ))}
      </div></div>
  );
}

/* ── Single nav link ── */
function NavLink({
  item, active, expanded, onClick,
}: {
  item: typeof ALL_NAV[0];
  active: boolean;
  expanded: boolean;
  onClick?: () => void;
}) {
  const isStub = !!(item as any).soon;
  const inner = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all w-full",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      )}
    ><div className="shrink-0 w-4 flex items-center justify-center"><item.Icon size={15} /></div>
      {expanded && (
        <><span className="text-[11px] font-bold flex-1 whitespace-nowrap" >
            {item.label}
          </span>
          {isStub && !active && (
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground" >
              SOON
            </span>
          )}
          {active && <ChevronRight size={10} className="opacity-50" />}
        </>
      )}
    </div>
  );

  return (
    <div className="w-full px-2">
      {isStub
        ? <div onClick={onClick}>{inner}</div>
        : <Link href={item.href} onClick={onClick}>{inner}</Link>
      }
    </div>
  );
}

/* ── Sidebar contents ── */
function SidebarContents({ expanded, onNav }: { expanded: boolean; onNav?: () => void }) {
  const [location] = useLocation();
  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);

  return (
    <><div className="flex-1 overflow-y-auto overflow-x-hidden py-1 space-y-0">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {gi > 0 && <div className="mx-3 my-1 border-t border-border/30" />}
            {expanded && (
              <p className="px-5 pt-2 pb-1 text-[9px] font-bold text-muted-foreground/40 tracking-widest select-none" >
                {group.label}
              </p>
            )}
            {group.items.map(item => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} expanded={expanded} onClick={onNav} />
            ))}
          </div>
        ))}
      </div><NavLink
        item={{ href: "/settings", label: "Settings", Icon: Settings }}
        active={useLocation()[0] === "/settings"}
        expanded={expanded}
        onClick={onNav}
      /><AppearancePanel expanded={expanded} /></>
  );
}

/* ── Main Layout ── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const SIDEBAR_W = expanded ? 216 : 60;

  return (
    <div className="min-h-screen bg-background text-foreground"><AnimatedBackground />

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-13 bg-background/80 backdrop-blur-xl border-b border-border/60 flex items-center gap-2.5 px-3"><button
          onClick={() => window.innerWidth >= 1024 ? setExpanded(o => !o) : setMobileOpen(o => !o)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors shrink-0"
        ><Menu size={16} /></button><Link href="/"><div className="flex items-center gap-2 cursor-pointer select-none"><div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shrink-0"><Zap size={13} fill="currentColor" /></div><div className="hidden sm:flex flex-col leading-none"><span className="font-black text-[11px]">Ouwibo</span><span className="text-[8px] text-muted-foreground">Cloud</span></div></div></Link><div className="flex-1 max-w-sm mx-auto"><div className="flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-1.5 text-muted-foreground border border-border/40"><Search size={11} /><span className="text-[10px]" >Search airdrops, news…</span><span className="ml-auto text-[9px] bg-background border border-border/40 rounded px-1 py-0.5 hidden md:block" >⌘K</span></div></div><div className="ml-auto flex items-center gap-1"><button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors relative"><Bell size={14} /><span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" /></button><div
            className="w-7 h-7 rounded-full flex items-center justify-center text-primary-foreground text-[10px] font-black border border-border"
            style={{ background: "linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.6))" }}
          >
            O
          </div></div></header>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="fixed top-13 left-0 bottom-0 z-40 border-r border-border/50 bg-sidebar/85 backdrop-blur-xl hidden lg:flex flex-col transition-all duration-300 overflow-hidden"
        style={{ width: SIDEBAR_W }}
      ><SidebarContents expanded={expanded} /></aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}><div className="absolute inset-0 bg-background/50 backdrop-blur-sm" /><aside
            className="absolute top-0 left-0 bottom-0 w-60 bg-sidebar/95 backdrop-blur-xl border-r border-border/50 flex flex-col"
            onClick={e => e.stopPropagation()}
          ><div className="flex items-center justify-between px-4 h-13 border-b border-border/40"><span className="font-black text-sm" >Ouwibo Cloud</span><button onClick={() => setMobileOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted"><Menu size={14} /></button></div><SidebarContents expanded onNav={() => setMobileOpen(false)} /></aside></div>
      )}

      {/* ── Bottom mobile nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-sidebar/90 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-2">
        {ALL_NAV.filter(i => !("soon" in i) || !i.soon).slice(0, 5).map(item => {
          const [location] = useLocation();
          const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}><div className={cn("flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors", active ? "text-primary" : "text-muted-foreground")}><item.Icon size={18} /><span className="text-[8px] font-bold" >{item.label}</span></div></Link>
          );
        })}
      </nav>

      {/* ── Main content ── */}
      <main
        className="flex flex-col min-h-screen"
        style={{ paddingLeft: `max(${SIDEBAR_W}px, 0px)` }}
      ><div className="hidden lg:block" style={{ height: 52 }} /><div className="h-13 lg:hidden" /><div className="flex-1 px-4 py-5 pb-20 lg:pb-6">
          {children}
        </div></main><ScrollTop /></div>
  );
}
