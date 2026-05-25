import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useTheme, ACCENT_LIST } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Search, Sun, Moon, Menu, X } from "lucide-react";

const NAV = [
  { href: "/",          label: "Home"     },
  { href: "/airdrops",  label: "Airdrops" },
  { href: "/news",      label: "News"     },
];

export default function Navbar() {
  const { mode, setMode, accent, setAccent } = useTheme();
  const [loc] = useLocation();
  const [mob, setMob]       = useState(false);
  const [srch, setSrch]     = useState(false);
  const [palette, setPalette] = useState(false);
  const curHex = ACCENT_LIST.find(a => a.id === accent)?.hex ?? "#d0612a";

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"><div className="max-w-5xl mx-auto px-4 h-11 flex items-center gap-3">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-1"><span className="text-[15px] font-bold tracking-tight text-foreground">
            Ouwibo<span className="text-primary">Cloud</span></span></Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 ml-2">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href}
              className={cn(
                "px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                loc === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >{label}</Link>
          ))}
        </nav><div className="flex-1" />

        {/* Search */}
        <button onClick={() => setSrch(v => !v)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Search className="w-[15px] h-[15px]" /></button>

        {/* Dark / Light */}
        <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          {mode === "dark" ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
        </button>

        {/* Accent picker */}
        <div className="relative hidden md:block"><button onClick={() => setPalette(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"><span className="w-3 h-3 rounded-full block ring-[1.5px] ring-offset-[2px] ring-offset-background"
              style={{ background: curHex, ringColor: curHex }} /></button>
          {palette && (
            <div className="absolute right-0 top-[38px] bg-card border border-border rounded-xl p-2.5 flex gap-2 shadow-md z-50">
              {ACCENT_LIST.map(a => (
                <button key={a.id} title={a.label}
                  onClick={() => { setAccent(a.id); setPalette(false); }}
                  className="w-4.5 h-4.5 rounded-full transition-transform hover:scale-110 active:scale-95"
                  style={{
                    width: 18, height: 18, background: a.hex, borderRadius: "50%",
                    outline: accent === a.id ? `2px solid ${a.hex}` : "2px solid transparent",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Write / Admin */}
        <Link href="/admin"
          className="hidden md:flex items-center gap-1.5 h-7 px-3 rounded-md bg-primary text-primary-foreground text-[12px] font-medium hover:opacity-90 transition-opacity">
          Write
        </Link>

        {/* Mobile burger */}
        <button onClick={() => setMob(v => !v)}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted">
          {mob ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button></div>

      {/* Inline search bar */}
      {srch && (
        <div className="border-t border-border bg-background/95 px-4 py-2.5"><input autoFocus type="search" placeholder="Search airdrops, news…"
            className="w-full max-w-5xl mx-auto block text-[13px] bg-transparent outline-none placeholder:text-muted-foreground" /></div>
      )}

      {/* Mobile menu */}
      {mob && (
        <div className="md:hidden border-t border-border bg-background px-4 pt-2 pb-3 flex flex-col gap-0.5">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMob(false)}
              className={cn(
                "px-3 py-2 rounded-lg text-[14px] font-medium",
                loc === href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >{label}</Link>
          ))}
          <div className="flex items-center gap-2 px-3 py-2 mt-1">
            {ACCENT_LIST.map(a => (
              <button key={a.id} onClick={() => setAccent(a.id)}
                style={{ width: 18, height: 18, borderRadius: "50%", background: a.hex,
                  outline: accent === a.id ? `2px solid ${a.hex}` : "none", outlineOffset: 2 }}
              />
            ))}
          </div><Link href="/admin" onClick={() => setMob(false)}
            className="mx-3 mt-1 flex items-center justify-center h-8 rounded-md bg-primary text-primary-foreground text-[13px] font-medium">
            Write Article
          </Link></div>
      )}
    </header>
  );
}
