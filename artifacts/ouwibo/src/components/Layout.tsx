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
  Zap,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-sidebar-foreground/70"
      )}
      data-testid={`nav-${label.toLowerCase()}`}
    >
      <Icon size={18} className={isActive ? "text-primary" : ""} />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-sidebar-border bg-sidebar fixed inset-y-0 left-0 z-30">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-sidebar-foreground">Ouwibo</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">Admin</div>
              <div className="text-xs text-sidebar-foreground/50 truncate">admin@ouwibo.com</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold tracking-tight">Ouwibo</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme} data-testid="button-mobile-theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Zap size={14} className="text-white" />
                </div>
                <span className="font-bold">Ouwibo</span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X size={18} className="text-sidebar-foreground/60" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
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
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
