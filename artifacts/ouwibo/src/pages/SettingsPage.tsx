import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { Save } from "lucide-react";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

const PASTEL_BG = ["#b8d8f0", "#b8e8c8", "#f0c4a8", "#d4c0f0"];

function NeoSection({ title, bg, children }: { title: string; bg?: string; children: React.ReactNode }) {
  return (
    <div className="neo-card p-6" style={bg ? { backgroundColor: bg } : {}}>
      <p className="mb-5 text-foreground" style={{ fontFamily: DISPLAY, fontSize: "0.85rem", fontWeight: 700 }}>{title}</p>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [name, setName]   = useState("Admin");
  const [email, setEmail] = useState("admin@ouwibo.com");
  const [notifications, setNotifications] = useState({ tasks: true, projects: true, members: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>Settings</h1>
        <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>Manage your account and preferences</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        {/* Profile */}
        <NeoSection title="Profile" bg={PASTEL_BG[0]}>
          <div className="flex items-center gap-4 mb-5 p-4 rounded-xl border-2 border-foreground/15 bg-white/40">
            <div className="w-14 h-14 rounded-2xl border-2 border-foreground/20 flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#d95c38", fontFamily: DISPLAY, fontSize: "1.2rem", boxShadow: "3px 3px 0 rgba(0,0,0,0.2)" }}>
              {name.charAt(0)}
            </div>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: "0.9rem", fontWeight: 700 }}>{name}</p>
              <p className="text-foreground/60" style={{ fontFamily: MONO, fontSize: "0.65rem" }}>{email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Display Name</Label>
              <Input className="mt-1" value={name} onChange={e => setName(e.target.value)}
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-settings-name" />
            </div>
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Email</Label>
              <Input type="email" className="mt-1" value={email} onChange={e => setEmail(e.target.value)}
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-settings-email" />
            </div>
          </div>
          <button onClick={() => toast({ title: "Settings saved!" })}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full hover:-translate-y-px transition-all"
            style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}
            data-testid="button-save-profile">
            <Save size={13} /> Save Changes
          </button>
        </NeoSection>

        {/* Appearance */}
        <NeoSection title="Appearance" bg={PASTEL_BG[1]}>
          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-foreground/15 bg-white/40">
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700 }}>Dark Mode</p>
              <p className="text-foreground/60 mt-0.5" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>Currently: {theme === "dark" ? "Dark" : "Light"}</p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} data-testid="switch-dark-mode" />
          </div>
        </NeoSection>

        {/* Notifications */}
        <NeoSection title="Notifications" bg={PASTEL_BG[2]}>
          <div className="space-y-3">
            {[
              { key: "tasks" as const, label: "Task Updates", desc: "When tasks are created or completed" },
              { key: "projects" as const, label: "Project Updates", desc: "When projects are modified" },
              { key: "members" as const, label: "Team Activity", desc: "When members join or leave" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3.5 rounded-xl border-2 border-foreground/15 bg-white/40">
                <div>
                  <p style={{ fontFamily: MONO, fontSize: "0.72rem", fontWeight: 700 }}>{item.label}</p>
                  <p className="text-foreground/55 mt-0.5" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>{item.desc}</p>
                </div>
                <Switch checked={notifications[item.key]} onCheckedChange={v => setNotifications(p => ({ ...p, [item.key]: v }))}
                  data-testid={`switch-notification-${item.key}`} />
              </div>
            ))}
          </div>
        </NeoSection>

        {/* Security */}
        <NeoSection title="Security" bg={PASTEL_BG[3]}>
          <div className="space-y-3">
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Current Password</Label>
              <Input type="password" className="mt-1" placeholder="••••••••"
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-current-password" />
            </div>
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>New Password</Label>
              <Input type="password" className="mt-1" placeholder="••••••••"
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }}
                data-testid="input-new-password" />
            </div>
            <button onClick={() => toast({ title: "Password updated" })}
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full hover:-translate-y-px transition-all"
              style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}
              data-testid="button-change-password">
              Change Password
            </button>
          </div>
        </NeoSection>
      </div>
    </div>
  );
}
