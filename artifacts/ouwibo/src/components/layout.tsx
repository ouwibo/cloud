import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings, 
  Sun, 
  Moon,
  Menu,
  X,
  Target
} from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/members", label: "Members", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Target className="h-6 w-6 text-primary" />
            <span>Ouwibo</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-2 p-4 h-[calc(100vh-8rem)]">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group ${
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between px-4 border-b bg-card md:hidden">
          <div className="flex items-center gap-2 font-bold">
            <Target className="h-5 w-5 text-primary" />
            <span>Ouwibo</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto bg-background/50">
          <div className="mx-auto max-w-6xl p-4 md:p-8 w-full h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
