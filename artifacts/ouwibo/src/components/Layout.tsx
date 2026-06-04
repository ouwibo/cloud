import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronRight,
  ChevronUp,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import AnimatedBackdrop from "@/components/AnimatedBackdrop";
import { mockAirdrops } from "@/lib/mockData";
import { getAllArticles } from "@/lib/articleStore";

/* Basil icons by Craftwork, CC BY 4.0. Source pack: https://www.figma.com/community/file/931906394678748246/basil-icons */
const BASIL_ICON_BODY = {
  dashboard:
    '<path fill="currentColor" fill-rule="evenodd" d="M8.93 4.47a17.5 17.5 0 0 0-3.86 0a.666.666 0 0 0-.586.577a16.8 16.8 0 0 0 0 3.907a.666.666 0 0 0 .587.576c1.271.142 2.587.142 3.858 0a.666.666 0 0 0 .587-.576c.152-1.298.152-2.61 0-3.908a.666.666 0 0 0-.587-.576M4.903 2.98a19 19 0 0 1 4.192 0c.99.11 1.793.89 1.91 1.892a18.3 18.3 0 0 1 0 4.256a2.166 2.166 0 0 1-1.91 1.893c-1.382.154-2.81.154-4.192 0a2.166 2.166 0 0 1-1.91-1.893a18.3 18.3 0 0 1 0-4.256a2.166 2.166 0 0 1 1.91-1.892M8.93 14.47a17.5 17.5 0 0 0-3.86 0a.666.666 0 0 0-.586.576a16.8 16.8 0 0 0 0 3.908a.666.666 0 0 0 .587.576c1.271.142 2.587.142 3.858 0a.666.666 0 0 0 .587-.576c.152-1.298.152-2.61 0-3.908a.666.666 0 0 0-.587-.576m-4.026-1.49a19 19 0 0 1 4.192 0c.99.11 1.793.89 1.91 1.892a18.3 18.3 0 0 1 0 4.256a2.166 2.166 0 0 1-1.91 1.892c-1.382.155-2.81.155-4.192 0a2.166 2.166 0 0 1-1.91-1.892a18.3 18.3 0 0 1 0-4.256a2.166 2.166 0 0 1 1.91-1.892M18.93 4.47a17.5 17.5 0 0 0-3.86 0a.666.666 0 0 0-.586.577a16.8 16.8 0 0 0 0 3.907a.666.666 0 0 0 .587.576c1.271.142 2.587.142 3.858 0a.666.666 0 0 0 .587-.576c.152-1.298.152-2.61 0-3.908a.666.666 0 0 0-.587-.576m-4.026-1.49a19 19 0 0 1 4.192 0c.99.11 1.793.89 1.91 1.892a18.3 18.3 0 0 1 0 4.256a2.166 2.166 0 0 1-1.91 1.893c-1.382.154-2.81.154-4.192 0a2.166 2.166 0 0 1-1.91-1.893a18.3 18.3 0 0 1 0-4.256a2.166 2.166 0 0 1 1.91-1.892m4.027 11.49a17.5 17.5 0 0 0-3.86 0a.666.666 0 0 0-.586.576a16.8 16.8 0 0 0 0 3.908a.666.666 0 0 0 .587.576c1.271.142 2.587.142 3.858 0a.666.666 0 0 0 .587-.576c.152-1.298.152-2.61 0-3.908a.666.666 0 0 0-.587-.576m-4.026-1.49a19 19 0 0 1 4.192 0c.99.11 1.793.89 1.91 1.892a18.3 18.3 0 0 1 0 4.256a2.166 2.166 0 0 1-1.91 1.892c-1.382.155-2.81.155-4.192 0a2.166 2.166 0 0 1-1.91-1.892a18.3 18.3 0 0 1 0-4.256a2.166 2.166 0 0 1 1.91-1.892" clip-rule="evenodd"/>',
  airdrops:
    '<path fill="currentColor" fill-rule="evenodd" d="M13.614 2.31a.75.75 0 0 1 .456.69v6.998H18a.75.75 0 0 1 .653 1.12l-.492.87a35.8 35.8 0 0 1-7.05 8.842l-.796.725A.75.75 0 0 1 9.06 21v-6.939H5a.75.75 0 0 1-.653-1.119a35.8 35.8 0 0 1 6.675-8.773l1.778-1.71a.75.75 0 0 1 .814-.149m-7.33 10.251H9.81a.75.75 0 0 1 .75.75v5.983a34.3 34.3 0 0 0 6.153-7.796H13.32a.75.75 0 0 1-.75-.75V4.762l-.508.488a34.3 34.3 0 0 0-5.777 7.311" clip-rule="evenodd"/>',
  news: '<path fill="currentColor" d="M15.75 13a.75.75 0 0 0-.75-.75H9a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 .75-.75m0 4a.75.75 0 0 0-.75-.75H9a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 .75-.75"/><path fill="currentColor" fill-rule="evenodd" d="M7 2.25A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V7.968c0-.381-.124-.751-.354-1.055l-2.998-3.968a1.75 1.75 0 0 0-1.396-.695zM5.75 5c0-.69.56-1.25 1.25-1.25h7.25v4.397c0 .414.336.75.75.75h3.25V19c0 .69-.56 1.25-1.25 1.25H7c-.69 0-1.25-.56-1.25-1.25z" clip-rule="evenodd"/>',
  portfolio:
    '<path fill="currentColor" d="M15.5 12a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"/><path fill="currentColor" fill-rule="evenodd" d="M20.441 6.674a4.71 4.71 0 0 0-3.84-2.839l-.652-.068a44.4 44.4 0 0 0-9.9.068l-.432.051a3.68 3.68 0 0 0-3.214 3.169a37.4 37.4 0 0 0 0 9.89a3.68 3.68 0 0 0 3.214 3.169l.432.051c3.287.392 6.607.415 9.9.068l.652-.068a4.71 4.71 0 0 0 3.84-2.839a2.77 2.77 0 0 0 1.963-2.324c.233-1.994.233-4.01 0-6.004a2.77 2.77 0 0 0-1.963-2.324m-4.65-1.416a43 43 0 0 0-9.565.066l-.432.052A2.18 2.18 0 0 0 3.89 7.253a36 36 0 0 0 0 9.494a2.18 2.18 0 0 0 1.904 1.877l.432.052c3.176.378 6.385.4 9.566.066l.652-.069a3.2 3.2 0 0 0 2.124-1.131a27 27 0 0 1-4.526-.118a2.77 2.77 0 0 1-2.446-2.422a26 26 0 0 1 0-6.004a2.77 2.77 0 0 1 2.446-2.422a27 27 0 0 1 4.526-.118a3.2 3.2 0 0 0-2.124-1.131zm3.486 2.757l.002.011l.006.04l.199-.032q.154.015.308.033c.587.065 1.055.53 1.122 1.105c.22 1.879.22 3.777 0 5.656a1.27 1.27 0 0 1-1.122 1.105q-.154.018-.308.033l-.199-.031l-.006.039l-.002.011c-1.678.152-3.4.135-5.069-.052a1.27 1.27 0 0 1-1.122-1.105a24.3 24.3 0 0 1 0-5.656a1.27 1.27 0 0 1 1.122-1.105a25.4 25.4 0 0 1 5.07-.052" clip-rule="evenodd"/>',
  calendar:
    '<path fill="currentColor" fill-rule="evenodd" d="M7 3.25a.75.75 0 0 1 .75.75v1.668a48 48 0 0 1 8.5 0V4a.75.75 0 0 1 1.5 0v1.816a3.375 3.375 0 0 1 2.872 2.899l.087.653c.364 2.746.332 5.53-.094 8.268a3.01 3.01 0 0 1-2.678 2.532l-1.193.118a48.4 48.4 0 0 1-9.488 0l-1.193-.118a3.01 3.01 0 0 1-2.678-2.532a29 29 0 0 1-.094-8.268l.087-.653A3.375 3.375 0 0 1 6.25 5.816V4A.75.75 0 0 1 7 3.25m.445 3.953c3.03-.299 6.08-.299 9.11 0l.905.09c.867.085 1.56.756 1.675 1.619l.087.653q.045.342.082.685H4.696q.037-.343.082-.685l.087-.653a1.875 1.875 0 0 1 1.675-1.62zM4.577 11.75a27.5 27.5 0 0 0 .29 5.655a1.51 1.51 0 0 0 1.343 1.27l1.193.118c3.057.302 6.137.302 9.194 0l1.193-.118a1.51 1.51 0 0 0 1.343-1.27c.292-1.872.388-3.767.29-5.655z" clip-rule="evenodd"/>',
  alerts:
    '<path fill="currentColor" fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v.75h-.557A4.214 4.214 0 0 0 6.237 7.7l-.221 3.534a7.4 7.4 0 0 1-1.308 3.754a1.617 1.617 0 0 0 1.135 2.529l3.407.408V19a2.75 2.75 0 1 0 5.5 0v-1.075l3.407-.409a1.617 1.617 0 0 0 1.135-2.528a7.4 7.4 0 0 1-1.308-3.754l-.221-3.533a4.214 4.214 0 0 0-4.206-3.951H13zm-2.557 2.25a2.714 2.714 0 0 0-2.709 2.544l-.22 3.534a8.9 8.9 0 0 1-1.574 4.516a.117.117 0 0 0 .082.183l3.737.449c1.489.178 2.993.178 4.482 0l3.737-.449a.117.117 0 0 0 .082-.183a8.9 8.9 0 0 1-1.573-4.516l-.221-3.534a2.714 2.714 0 0 0-2.709-2.544zm1.557 15c-.69 0-1.25-.56-1.25-1.25v-.75h2.5V19c0 .69-.56 1.25-1.25 1.25" clip-rule="evenodd"/>',
  guide:
    '<path fill="currentColor" fill-rule="evenodd" d="M11.602 18.636a.75.75 0 0 0 .398.11a.75.75 0 0 0 .398-.11l1.135-.681a8.3 8.3 0 0 1 7.36-.59c.89.356 1.857-.3 1.857-1.257V4.45c0-.578-.352-1.097-.889-1.312a10.7 10.7 0 0 0-9.48.76L12 4.124l-.382-.229a10.7 10.7 0 0 0-9.48-.76A1.41 1.41 0 0 0 1.25 4.45v11.66c0 .957.967 1.612 1.857 1.256a8.3 8.3 0 0 1 7.36.59zM2.75 4.508v11.387a9.8 9.8 0 0 1 8.489.774l.011.006V5.425l-.403-.242a9.2 9.2 0 0 0-8.097-.675m10.011 12.16l-.011.007V5.425l.403-.242a9.2 9.2 0 0 1 8.097-.675v11.387a9.8 9.8 0 0 0-8.489.774" clip-rule="evenodd"/><path fill="currentColor" d="M9.275 19.042a6.5 6.5 0 0 0-6.55 0l-.103.06a.75.75 0 1 0 .756 1.296l.103-.06a5 5 0 0 1 5.038 0l1.088.634a4.75 4.75 0 0 0 4.786 0l1.088-.634a5 5 0 0 1 5.038 0l.103.06a.75.75 0 0 0 .756-1.296l-.103-.06a6.5 6.5 0 0 0-6.55 0l-1.087.634a3.25 3.25 0 0 1-3.276 0z"/>',
  chat: '<path fill="currentColor" fill-rule="evenodd" d="M4.592 15.304C2.344 9.787 6.403 3.75 12.36 3.75h.321a8.07 8.07 0 0 1 8.068 8.068a8.98 8.98 0 0 1-8.982 8.982h-7.82a.75.75 0 0 1-.47-1.335l1.971-1.583a.25.25 0 0 0 .075-.29zM12.36 5.25c-4.893 0-8.226 4.957-6.38 9.488l.932 2.289a1.75 1.75 0 0 1-.525 2.024l-.309.249h5.689a7.48 7.48 0 0 0 7.482-7.482a6.57 6.57 0 0 0-6.568-6.568z" clip-rule="evenodd"/>',
  settings:
    '<g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.199 2.587a1.65 1.65 0 0 1 1.602 0l7.2 4c.524.291.849.843.849 1.443v7.94c0 .6-.325 1.152-.849 1.443l-7.2 4a1.65 1.65 0 0 1-1.602 0l-7.2-4a1.65 1.65 0 0 1-.849-1.443V8.03c0-.6.325-1.152.849-1.443zm.874 1.312a.15.15 0 0 0-.146 0l-7.2 4a.15.15 0 0 0-.077.13v7.942c0 .054.03.104.077.13l7.2 4a.15.15 0 0 0 .146 0l7.2-4a.15.15 0 0 0 .077-.13V8.03a.15.15 0 0 0-.077-.131z"/><path d="M7.25 12a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0M12 8.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5"/></g>',
} as const;

type BasilIconName = keyof typeof BASIL_ICON_BODY;
type BasilIconProps = {
  name: BasilIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

type BasilNavIconProps = Omit<BasilIconProps, "name">;

function BasilIcon({ name, size = 20, className }: BasilIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      dangerouslySetInnerHTML={{ __html: BASIL_ICON_BODY[name] }}
    />
  );
}

const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      {
        href: "/",
        label: "Dashboard",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="dashboard" {...props} />
        ),
        iconTone: "text-violet-400",
      },
      {
        href: "/airdrops",
        label: "Airdrops",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="airdrops" {...props} />
        ),
        iconTone: "text-fuchsia-400",
      },
      {
        href: "/news",
        label: "News",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="news" {...props} />
        ),
        iconTone: "text-sky-400",
      },
    ],
  },
  {
    label: "TOOLS",
    items: [
      {
        href: "/portfolio",
        label: "Portfolio",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="portfolio" {...props} />
        ),
        iconTone: "text-cyan-400",
        soon: true,
      },
      {
        href: "/calendar",
        label: "Calendar",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="calendar" {...props} />
        ),
        iconTone: "text-fuchsia-400",
        soon: true,
      },
      {
        href: "/alerts",
        label: "Alerts",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="alerts" {...props} />
        ),
        iconTone: "text-violet-500",
        soon: true,
      },
    ],
  },
  {
    label: "LEARN",
    items: [
      {
        href: "/guide",
        label: "How to Farm",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="guide" {...props} />
        ),
        iconTone: "text-fuchsia-500",
        soon: true,
      },
      {
        href: "/chat",
        label: "AI Chat",
        Icon: (props: BasilNavIconProps) => (
          <BasilIcon name="chat" {...props} />
        ),
        iconTone: "text-sky-400",
      },
    ],
  },
];

const ALL_NAV = NAV_GROUPS.flatMap((g) => g.items);
type NavItem = (typeof ALL_NAV)[number];

function BrandMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-primary/35 bg-primary/10 shadow-lg shadow-primary/20">
      <img
        src="/site-logo.svg"
        alt="Ouwibo mascot logo"
        className="h-full w-full object-contain p-0.5 drop-shadow-[0_8px_14px_hsl(var(--primary)/0.2)]"
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
      className="group flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-sm shadow-primary/10 transition-[background-color,color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/15 hover:text-primary"
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
        "group relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 transition-[color,transform] duration-300 ease-out hover:translate-x-0.5",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {active && (
        <span className="absolute left-0 h-5 w-0.5 rounded-full bg-gradient-to-b from-cyan-300 via-primary to-fuchsia-500" />
      )}
      <item.Icon
        size={expanded ? 18 : 20}
        className={cn(
          "shrink-0 transition-[color,filter,transform] duration-300 ease-out group-hover:scale-110",
          active
            ? "text-primary drop-shadow-[0_0_14px_hsl(var(--primary)/0.35)]"
            : item.iconTone,
        )}
        strokeWidth={2.25}
      />
      {expanded && (
        <>
          <span className="flex-1 whitespace-nowrap text-[11px] font-bold">
            {item.label}
          </span>
          {isStub && !active && (
            <span className="text-[8px] font-bold text-muted-foreground/65">
              SOON
            </span>
          )}
          {active && <ChevronRight size={10} className="text-primary/70" />}
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
          item={{
            href: "/settings",
            label: "About",
            Icon: (props: BasilNavIconProps) => (
              <BasilIcon name="settings" {...props} />
            ),
            iconTone: "text-violet-400",
          }}
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
  const layoutVars = { "--sidebar-w": `${SIDEBAR_W}px` } as CSSProperties;
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
    <div
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
      style={layoutVars}
    >
      <AnimatedBackdrop />
      {/* ── Premium background glows ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute bottom-[-10%] left-[-5%] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full bg-violet-500/[0.16] blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] rounded-full bg-fuchsia-500/[0.12] blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] h-[30vw] w-[30vw] max-h-[400px] max-w-[400px] rounded-full bg-sky-500/[0.10] blur-[130px]" />
      </div>
      {/* ── Navbar ── */}
      <header className="app-topbar fixed left-0 right-0 top-0 z-40 flex h-14 items-center gap-2.5 border-b border-primary/20 px-3 backdrop-blur-xl lg:left-[var(--sidebar-w)]">
        <button
          onClick={() =>
            window.innerWidth >= 1024
              ? setExpanded((o) => !o)
              : setMobileOpen((o) => !o)
          }
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition-[background-color,color,border-color] hover:border-primary/25 hover:bg-primary/10 hover:text-primary"
          aria-label={expanded ? "Collapse sidebar" : "Open menu"}
        >
          <Menu size={16} />
        </button>
        <Link href="/">
          <div className="flex cursor-pointer select-none items-center gap-2 lg:hidden">
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
            className="flex h-10 items-center gap-2 rounded-2xl border border-primary/25 bg-card/80 px-3 text-muted-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-300 focus-within:border-primary/55 focus-within:bg-card/95 focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.14)]"
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
              className="hidden rounded-lg border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[9px] font-black text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              ⌘K
            </button>
          </form>
          {searchOpen && (searchQuery.trim() || searchResults.length > 0) && (
            <div className="absolute left-1 right-1 top-12 z-[70] overflow-hidden rounded-2xl border border-primary/25 bg-popover/95 shadow-2xl shadow-primary/15 backdrop-blur-xl sm:left-2 sm:right-2">
              {searchResults.length > 0 ? (
                <div className="max-h-[min(70vh,360px)] overflow-y-auto p-1.5">
                  {searchResults.map((result) => (
                    <button
                      key={result.key}
                      onClick={() => goToResult(result.href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-primary/10"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/15 text-primary">
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
            className="relative hidden h-9 w-9 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition-[background-color,color,border-color] hover:border-primary/25 hover:bg-primary/10 hover:text-primary sm:flex"
            aria-label="Alerts"
          >
            <Bell size={14} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <img
            src="/site-logo.svg"
            alt="Ouwibo mascot"
            className="hidden h-8 w-8 rounded-full border border-primary/25 bg-primary/10 object-contain p-0.5 shadow-sm shadow-primary/20 sm:block"
            width={32}
            height={32}
          />
        </div>
      </header>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="app-sidebar-shell fixed bottom-0 left-0 top-0 z-50 hidden flex-col overflow-hidden border-r border-primary/20 backdrop-blur-xl transition-[width,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex"
        style={{ width: SIDEBAR_W }}
      >
        <div
          className={cn(
            "flex h-14 items-center border-b border-primary/20 px-4",
            expanded ? "justify-start gap-3" : "justify-center",
          )}
        >
          <BrandMark />
          {expanded && (
            <div className="min-w-0 leading-none">
              <p className="text-[12px] font-black tracking-tight text-foreground">
                Ouwibo
              </p>
              <p className="mt-1 text-[9px] font-semibold text-muted-foreground">
                Airdrop workspace
              </p>
            </div>
          )}
        </div>
        <SidebarContents expanded={expanded} />
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-background/65 backdrop-blur-sm" />
          <aside
            className="app-sidebar-shell absolute bottom-0 left-0 top-0 flex w-64 flex-col border-r border-primary/20 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between border-b border-primary/20 px-4">
              <span className="text-sm font-black">Ouwibo Cloud</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15"
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
      <nav className="app-topbar fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-primary/20 px-2 backdrop-blur-xl lg:hidden">
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
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
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
