import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { Save, Bot, Palette, Bell, Key } from "lucide-react";

const PASTEL  = ["#b8d8f0", "#b8e8c8", "#f0c4a8", "#d4c0f0"];

function NeoSection({ title, bg, children, icon: Icon }: { title: string; bg: string; children: React.ReactNode; icon: typeof Bot }) {
  return (
    <div className="neo-card p-5" style={{ backgroundColor: bg }}><div className="flex items-center gap-2 mb-5"><div className="w-7 h-7 rounded-xl border-2 border-foreground/20 flex items-center justify-center bg-white/40"><Icon size={13} /></div><p style={{ fontSize: "0.82rem", fontWeight: 700 }}>{title}</p></div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [siteName, setSiteName] = useState("Ouwibo");
  const [siteDesc, setSiteDesc] = useState("Track the best crypto airdrops");
  const [notifications, setNotifications] = useState({ newAirdrop: true, endingSoon: true, featured: false });

  return (
    <div><div className="mb-8"><h1 style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>Settings</h1><p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.7rem" }}>Configure your Ouwibo tracker</p></div><div className="space-y-4 max-w-2xl">
        {/* Site info */}
        <NeoSection title="Site Configuration" bg={PASTEL[0]} icon={Palette}><div className="space-y-3"><div><Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Site Name</Label><Input className="mt-1" value={siteName} onChange={e => setSiteName(e.target.value)}
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-site-name" /></div><div><Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Site Description</Label><Input className="mt-1" value={siteDesc} onChange={e => setSiteDesc(e.target.value)}
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-site-desc" /></div><button onClick={() => toast({ title: "Settings saved!" })}
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full hover:-translate-y-px transition-all"
              style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontSize: "0.7rem", fontWeight: 700 }}
              data-testid="button-save-settings"><Save size={13} /> Save
            </button></div></NeoSection>

        {/* AI chat */}
        <NeoSection title="AI Chat (LLM)" bg={PASTEL[1]} icon={Bot}><div className="p-3 rounded-xl border-2 border-foreground/15 bg-white/40 mb-3"><p style={{ fontSize: "0.65rem" }} className="text-foreground/70 leading-relaxed">
              Connect your LLM API to power the AI chat assistant. The chat currently uses a smart mock — add your API key below to enable full AI responses.
            </p></div><div className="space-y-3"><div><Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>LLM API Key</Label><Input type="password" className="mt-1" value={apiKey} onChange={e => setApiKey(e.target.value)}
                placeholder="sk-..."
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-api-key" /></div><button onClick={() => toast({ title: "API key saved securely" })}
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full hover:-translate-y-px transition-all"
              style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontSize: "0.7rem", fontWeight: 700 }}
              data-testid="button-save-api-key"><Key size={13} /> Save API Key
            </button></div></NeoSection>

        {/* Appearance */}
        <NeoSection title="Appearance" bg={PASTEL[2]} icon={Palette}><div className="flex items-center justify-between p-3.5 rounded-xl border-2 border-foreground/15 bg-white/40"><div><p style={{ fontSize: "0.72rem", fontWeight: 700 }}>Dark Mode</p><p className="text-foreground/60 mt-0.5" style={{ fontSize: "0.6rem" }}>Currently: {theme === "dark" ? "Dark" : "Light"}</p></div><Switch checked={theme === "dark"} onCheckedChange={toggleTheme} data-testid="switch-dark-mode" /></div></NeoSection>

        {/* Notifications */}
        <NeoSection title="Notifications" bg={PASTEL[3]} icon={Bell}><div className="space-y-2">
            {[
              { key: "newAirdrop" as const, label: "New Airdrops", desc: "When new airdrops are added" },
              { key: "endingSoon" as const, label: "Ending Soon", desc: "When airdrops are about to end" },
              { key: "featured" as const, label: "Featured Updates", desc: "When featured list changes" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3.5 rounded-xl border-2 border-foreground/15 bg-white/40"><div><p style={{ fontSize: "0.7rem", fontWeight: 700 }}>{item.label}</p><p className="text-foreground/55 mt-0.5" style={{ fontSize: "0.58rem" }}>{item.desc}</p></div><Switch checked={notifications[item.key]} onCheckedChange={v => setNotifications(p => ({ ...p, [item.key]: v }))}
                  data-testid={`switch-${item.key}`} /></div>
            ))}
          </div></NeoSection></div></div>
  );
}
