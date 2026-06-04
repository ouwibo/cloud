import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Search, Sun, Moon, Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/airdrops", label: "Airdrops" },
];

export default function Navbar() {
  const { mode, setMode } = useTheme();
  const [loc] = useLocation();
  const [mob, setMob] = useState(false);
  const [srch, setSrch] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-5xl items-center gap-3 px-4">
        <Link href="/" className="flex-shrink-0">
          <span className="text-[15px] font-bold tracking-tight text-foreground">
            Ouwibo<span className="text-primary">Cloud</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-0.5 md:flex">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5",
                loc === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <button
          onClick={() => setSrch((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-muted hover:text-foreground"
          aria-label="Search"
        >
          <Search className="h-[15px] w-[15px]" />
        </button>

        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-muted hover:text-foreground"
          aria-label={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {mode === "dark" ? (
            <Sun className="h-[15px] w-[15px]" />
          ) : (
            <Moon className="h-[15px] w-[15px]" />
          )}
        </button>

        <button
          onClick={() => setMob((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted md:hidden"
          aria-label="Menu"
        >
          {mob ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {srch && (
        <div className="animate-fade-in border-t border-border bg-background/95 px-4 py-2.5">
          <input
            autoFocus
            type="search"
            placeholder="Search curated airdrops…"
            className="mx-auto block w-full max-w-5xl bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}

      {mob && (
        <div className="animate-slide-down flex flex-col gap-0.5 border-t border-border bg-background px-4 pb-3 pt-2 md:hidden">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMob(false)}
              className={cn(
                "rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                loc === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
