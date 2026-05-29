import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Zap,
  Newspaper,
  Wallet,
  Calendar,
  Bell,
  Settings,
  Menu,
  ChevronUp,
  Search,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import AnimatedBackdrop from "@/components/AnimatedBackdrop";

const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { href: "/", label: "Dashboard", Icon: LayoutDashboard },
      { href: "/airdrops", label: "Airdrops", Icon: Zap },
      { href: "/news", label: "News", Icon: Newspaper },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { href: "/portfolio", label: "Portfolio", Icon: Wallet, soon: true },
      { href: "/calendar", label: "Calendar", Icon: Calendar, soon: true },
      { href: "/alerts", label: "Alerts", Icon: Bell, soon: true },
    ],
  },
  {
    label: "LEARN",
    items: [
      { href: "/guide", label: "How to Farm", Icon: BookOpen, soon: true },
      { href: "/chat", label: "AI Chat", Icon: MessageSquare },
    ],
  },
];

const ALL_NAV = NAV_GROUPS.flatMap((g) => g.items);

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
    >
      <ChevronUp size={14} />
    </button>
  );
}

/* ── Appearance panel (dark/light only) ── */
function AppearancePanel({ expanded }: { expanded: boolean }) {
  const { mode, setMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <div className="px-2 py-2 border-t border-border/40">
      <button
        onClick={() => setMode(isDark ? "light" : "dark")}
        className={cn(
          "group flex w-full items-center gap-2 rounded-xl border border-border/50 bg-background/35 px-3 py-2 text-muted-foreground",
          "transition-[background-color,color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-muted hover:text-foreground",
          expanded ? "justify-start" : "justify-center",
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          {isDark ? (
            <Moon
              size={14}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />
          ) : (
            <Sun
              size={14}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          )}
        </span>
        {expanded && (
          <span className="text-[10px] font-bold">
            {isDark ? "Night mode" : "Light mode"}
          </span>
        )}
      </button>
    </div>
  );
}

/* ── Single nav link ── */
function NavLink({
  item,
  active,
  expanded,
  onClick,
}: {
  item: (typeof ALL_NAV)[0];
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
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
      )}
    >
      <div className="shrink-0 w-4 flex items-center justify-center">
        <item.Icon size={15} />
      </div>
      {expanded && (
        <>
          <span className="text-[11px] font-bold flex-1 whitespace-nowrap">
            {item.label}
          </span>
          {isStub && !active && (
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
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
      {isStub ? (
        <div onClick={onClick}>{inner}</div>
      ) : (
        <Link href={item.href} onClick={onClick}>
          {inner}
        </Link>
      )}
    </div>
  );
}

/* ── Sidebar contents ── */
function SidebarContents({
  expanded,
  onNav,
}: {
  expanded: boolean;
  onNav?: () => void;
}) {
  const [location] = useLocation();
  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 space-y-1">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {gi > 0 && <div className="mx-3 my-2 border-t border-border/30" />}
            {expanded && (
              <p className="px-5 pt-2 pb-1 text-[9px] font-bold text-muted-foreground/50 tracking-widest select-none">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
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
      <div className="border-t border-border/30 py-2">
        <NavLink
          item={{ href: "/settings", label: "About", Icon: Settings }}
          active={location === "/settings"}
          expanded={expanded}
          onClick={onNav}
        />
      </div>
      <AppearancePanel expanded={expanded} />
    </>
  );
}

/* ── Main Layout ── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const SIDEBAR_W = expanded ? 256 : 72;
  const mobileNavItems = ALL_NAV.filter((i) => !("soon" in i) || !i.soon).slice(0, 5);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatedBackdrop />
      {/* ── Premium background glows ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute bottom-[-10%] left-[-5%] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] h-[30vw] w-[30vw] max-h-[400px] max-w-[400px] rounded-full bg-primary/[0.03] blur-[130px]" />
      </div>
      {/* ── Navbar ── */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center gap-2.5 border-b border-border/60 bg-background/82 px-3 backdrop-blur-xl">
        <button
          onClick={() =>
            window.innerWidth >= 1024 ? setExpanded((o) => !o) : setMobileOpen((o) => !o)
          }
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl hover:bg-muted transition-colors"
          aria-label={expanded ? "Collapse sidebar" : "Open menu"}
        >
          <Menu size={16} />
        </button>
        <Link href="/">
          <div className="flex select-none items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Zap size={14} fill="currentColor" />
            </div>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-[11px] font-black">Ouwibo</span>
              <span className="text-[8px] text-muted-foreground">Cloud</span>
            </div>
          </div>
        </Link>
        <div className="mx-auto flex-1 max-w-xl px-2">
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/35 px-3 py-2 text-muted-foreground shadow-sm">
            <Search size={11} />
            <span className="text-[10px]">Search airdrops, news…</span>
            <span className="ml-auto hidden rounded-md border border-border/40 bg-background px-1.5 py-0.5 text-[9px] md:block">
              ⌘K
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors"
            aria-label="Alerts"
          >
            <Bell size={14} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-[10px] font-black text-primary-foreground"
            style={{ background: "linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.6))" }}
          >
            O
          </div>
        </div>
      </header>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="fixed bottom-0 left-0 top-14 z-40 hidden flex-col overflow-hidden border-r border-border/60 bg-sidebar/92 backdrop-blur-xl shadow-[1px_0_0_rgba(255,255,255,0.03)] lg:flex"
        style={{ width: SIDEBAR_W }}
      >
        <SidebarContents expanded={expanded} />
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-background/55 backdrop-blur-sm" />
          <aside
            className="absolute bottom-0 left-0 top-0 flex w-64 flex-col border-r border-border/50 bg-sidebar/95 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between border-b border-border/40 px-4">
              <span className="text-sm font-black">Ouwibo Cloud</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
                aria-label="Close menu"
              >
                <Menu size={14} />
              </button>
            </div>
            <SidebarContents expanded onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Bottom mobile nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border/50 bg-sidebar/90 px-2 backdrop-blur-xl lg:hidden">
        {mobileNavItems.map((item) => {
          const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn("flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors", active ? "text-primary" : "text-muted-foreground")}> 
                <item.Icon size={18} />
                <span className="text-[8px] font-bold">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* ── Main content ── */}
      <main
        className={cn(
          "relative z-10 flex min-h-screen flex-col transition-[padding] duration-300",
          expanded ? "lg:pl-[256px]" : "lg:pl-[72px]",
        )}
      >
        <div className="hidden lg:block" style={{ height: 56 }} />
        <div className="h-14 lg:hidden" />
        <div className="flex-1 px-3 py-5 pb-22 lg:px-6 xl:px-8 lg:py-6 lg:pb-8">{children}</div>
      </main>
      <ScrollTop />
    </div>
  );
}
