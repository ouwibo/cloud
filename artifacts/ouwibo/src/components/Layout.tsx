import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
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
import { mockAirdrops } from "@/lib/mockData";
import { getAllArticles } from "@/lib/articleStore";

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
type NavItem = (typeof ALL_NAV)[number];

function BrandMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg shadow-background/20">
      <img
        src="/site-logo.svg"
        alt="Ouwibo mascot logo"
        className="h-full w-full object-contain p-0.5"
        width={40}
        height={40}
      />
    </span>
  );
}

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

function ThemeToggleButton() {
  const { mode, setMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <button
      onClick={() => setMode(isDark ? "light" : "dark")}
      className="group flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/65 text-muted-foreground shadow-sm transition-[background-color,color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}

/* ── Single nav link ── */
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
  const isStub = item.soon === true;
  const inner = (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-[background-color,color,transform] duration-300 ease-out",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
      )}
    >
      <div
        className={cn(
          "premium-icon shrink-0 rounded-lg transition-[width,height,transform] duration-300 ease-out",
          expanded ? "h-7 w-7" : "h-8 w-8",
          active &&
            "border-primary-foreground/30 bg-primary-foreground/12 text-primary-foreground",
        )}
      >
        <item.Icon size={15} className="relative z-10" strokeWidth={2.4} />
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
    </>
  );
}

/* ── Main Layout ── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const SIDEBAR_W = expanded ? 256 : 72;
  const mobileNavItems = ALL_NAV.filter((i) => !("soon" in i) || !i.soon).slice(
    0,
    5,
  );

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const airdrops = mockAirdrops
      .filter((item) =>
        `${item.name} ${item.ticker ?? ""} ${item.status}`
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 4)
      .map((item) => ({
        key: `airdrop-${item.id}`,
        title: item.name,
        subtitle: `${item.status} · ${item.rewardType}`,
        href: `/airdrops/${item.slug}`,
        type: "Airdrop",
      }));

    const articles = getAllArticles()
      .filter((item) =>
        `${item.title} ${item.excerpt} ${item.category}`
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 4)
      .map((item) => ({
        key: `article-${item.id}`,
        title: item.title,
        subtitle: `${item.category} · ${item.readTime} min read`,
        href: `/article/${item.slug}`,
        type: "Article",
      }));

    return [...airdrops, ...articles].slice(0, 6);
  }, [searchQuery]);

  const submitSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchOpen((value) => !value);
      return;
    }
    navigate(`/airdrops?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const goToResult = (href: string) => {
    navigate(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatedBackdrop />
      {/* ── Premium background glows ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute bottom-[-10%] left-[-5%] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] h-[30vw] w-[30vw] max-h-[400px] max-w-[400px] rounded-full bg-primary/[0.03] blur-[130px]" />
      </div>
      {/* ── Navbar ── */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center gap-2.5 border-b border-border/60 bg-background/82 px-3 backdrop-blur-xl">
        <button
          onClick={() =>
            window.innerWidth >= 1024
              ? setExpanded((o) => !o)
              : setMobileOpen((o) => !o)
          }
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl hover:bg-muted transition-colors"
          aria-label={expanded ? "Collapse sidebar" : "Open menu"}
        >
          <Menu size={16} />
        </button>
        <Link href="/">
          <div className="flex select-none items-center gap-2 cursor-pointer">
            <BrandMark />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-[11px] font-black">Ouwibo</span>
              <span className="text-[8px] text-muted-foreground">Cloud</span>
            </div>
          </div>
        </Link>
        <div className="relative mx-auto max-w-xl flex-1 px-1 sm:px-2">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch();
            }}
            className="flex h-10 items-center gap-2 rounded-2xl border border-border/60 bg-card/75 px-3 text-muted-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-300 focus-within:border-primary/40 focus-within:bg-card focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]"
          >
            <Search className="h-4 w-4 shrink-0" />
            <input
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              placeholder="Search airdrops, news…"
              className="min-w-0 flex-1 bg-transparent text-[12px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/70"
            />
            <button
              type="submit"
              className="hidden rounded-lg border border-border/50 bg-background/75 px-1.5 py-0.5 text-[9px] font-black text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              ⌘K
            </button>
          </form>
          {searchOpen && (searchQuery.trim() || searchResults.length > 0) && (
            <div className="absolute left-1 right-1 top-12 z-[70] overflow-hidden rounded-2xl border border-border/70 bg-popover/95 shadow-2xl shadow-background/30 backdrop-blur-xl sm:left-2 sm:right-2">
              {searchResults.length > 0 ? (
                <div className="max-h-[min(70vh,360px)] overflow-y-auto p-1.5">
                  {searchResults.map((result) => (
                    <button
                      key={result.key}
                      onClick={() => goToResult(result.href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Search className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-black text-foreground">
                          {result.title}
                        </span>
                        <span className="block truncate text-[10px] font-semibold text-muted-foreground">
                          {result.type} · {result.subtitle}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-[12px] font-semibold text-muted-foreground">
                  No results found. Press Enter to search airdrops.
                </div>
              )}
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggleButton />
          <button
            className="relative hidden h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted sm:flex"
            aria-label="Alerts"
          >
            <Bell size={14} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <img
            src="/site-logo.svg"
            alt="Ouwibo mascot"
            className="hidden h-8 w-8 rounded-full border border-border bg-card object-contain p-0.5 sm:block"
            width={32}
            height={32}
          />
        </div>
      </header>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="fixed bottom-0 left-0 top-14 z-40 hidden flex-col overflow-hidden border-r border-border/60 bg-sidebar/92 backdrop-blur-xl shadow-[1px_0_0_rgba(255,255,255,0.03)] transition-[width,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex"
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
          <div className="absolute inset-0 bg-background/55 backdrop-blur-sm" />
          <aside
            className="absolute bottom-0 left-0 top-0 flex w-64 flex-col border-r border-border/50 bg-sidebar/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out"
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
          const active =
            item.href === "/"
              ? location === "/"
              : location.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
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
          "relative z-10 flex min-h-screen w-full flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "lg:pl-[256px]" : "lg:pl-[72px]",
        )}
      >
        <div className="hidden lg:block" style={{ height: 56 }} />
        <div className="h-14 lg:hidden" />
        <div className="flex-1 w-full px-3 py-4 pb-22 sm:px-4 lg:px-5 xl:px-6 2xl:px-8 lg:py-5 lg:pb-8">
          {children}
        </div>
      </main>
      <ScrollTop />
    </div>
  );
}
