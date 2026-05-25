import { useState } from "react";
import { useLocation } from "wouter";
import { adminLogin } from "@/lib/articleStore";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [, nav]   = useLocation();
  const [pw, setPw]   = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr]   = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(pw)) {
      nav("/admin");
    } else {
      setErr("Incorrect password.");
      setPw("");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[65vh]"><div className="w-full max-w-[340px]"><div className="flex flex-col items-center mb-6"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3"><Lock className="w-5 h-5 text-primary" /></div><h1 className="text-[17px] font-bold">Admin Login</h1><p className="text-[12px] text-muted-foreground mt-1">OuwiboCloud editorial panel</p></div><form onSubmit={submit} className="rounded-xl border border-border bg-card p-5 space-y-4"><div><label className="block text-[12px] font-medium mb-1.5">Password</label><div className="relative"><input
                type={show ? "text" : "password"}
                value={pw}
                onChange={e => { setPw(e.target.value); setErr(""); }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full h-9 px-3 pr-9 rounded-lg border border-border bg-background text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
              /><button type="button" onClick={() => setShow(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button></div>
            {err && <p className="text-[11px] text-destructive mt-1">{err}</p>}
          </div><button type="submit" disabled={!pw}
            className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-[13px] font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
            Sign In
          </button></form><p className="text-center text-[11px] text-muted-foreground mt-4">
          Default password: <code className="font-mono bg-muted px-1 py-0.5 rounded">ouwibo2025</code><br/>
          Set <code className="font-mono bg-muted px-1 py-0.5 rounded">VITE_ADMIN_PASSWORD</code> in Vercel env to change it.
        </p></div></div>
  );
}
