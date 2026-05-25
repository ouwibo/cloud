import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/projects", icon: FolderKanban, label: "Projects" },
  { href: "/tasks", icon: CheckSquare, label: "Tasks" },
  { href: "/members", icon: Users, label: "Members" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

function NavItem({ href, icon: Icon, label }: { href: string; icon: typeof LayoutDashboard; label: string }) {
  const [location] = useLocation();
  const isActive = location === href || (href !== "/" && location.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-150 group",
        isActive
          ? "bg-foreground text-background font-bold shadow-[2px_2px_0_hsl(var(--foreground))]"
          : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent font-medium"
      )}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.01em",
        ...(isActive ? { boxShadow: "2px 2px 0 rgba(0,0,0,0.15)" } : {}),
      }}
      data-testid={`nav-${label.toLowerCase()}`}
    >
      <Icon size={15} />
      <span>{label}</span>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r-2 border-border bg-sidebar fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b-2 border-border">
          <div
            className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center border-2 border-foreground"
            style={{ boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
          >
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.65rem", color: "white", fontWeight: 900 }}>
              OW
            </span>
          </div>
          <span
            className="text-foreground"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}
          >
            Ouwibo
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t-2 border-border">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl border-2 border-border flex items-center justify-center text-xs font-bold bg-primary text-white"
              style={{ fontFamily: "'Unbounded', sans-serif", boxShadow: "2px 2px 0 hsl(var(--border))" }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>Admin</div>
              <div className="text-xs text-muted-foreground truncate" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}>admin@ouwibo.com</div>
            </div>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between h-14 px-4 border-b-2 border-border bg-background">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl bg-primary border-2 border-foreground flex items-center justify-center"
            style={{ boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
          >
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.5rem", color: "white", fontWeight: 900 }}>OW</span>
          </div>
          <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.8rem", fontWeight: 700 }}>Ouwibo</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-xl border-2 border-border flex items-center justify-center"
            style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
            data-testid="button-mobile-theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 rounded-xl border-2 border-border flex items-center justify-center"
            style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-60 bg-sidebar border-r-2 border-border flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 h-14 border-b-2 border-border">
              <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}>Ouwibo</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-5 space-y-1">
              {navItems.map(item => (
                <div key={item.href} onClick={() => setMobileOpen(false)}>
                  <NavItem {...item} />
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-56 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
