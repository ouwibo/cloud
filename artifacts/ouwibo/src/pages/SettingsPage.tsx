import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { Settings, Bell, Palette, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@ouwibo.com");
  const [notifications, setNotifications] = useState({ tasks: true, projects: true, members: false });

  function handleSave() {
    toast({ title: "Settings saved" });
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings size={16} />
            Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Display Name</Label>
              <Input className="mt-1" value={name} onChange={e => setName(e.target.value)} data-testid="input-settings-name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" className="mt-1" value={email} onChange={e => setEmail(e.target.value)} data-testid="input-settings-email" />
            </div>
          </div>
          <Button onClick={handleSave} size="sm" data-testid="button-save-profile">
            <Save size={14} className="mr-1.5" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Palette size={16} />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Currently: {theme === "dark" ? "Dark" : "Light"}</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              data-testid="switch-dark-mode"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell size={16} />
            Notifications
          </CardTitle>
          <CardDescription>Choose what you get notified about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "tasks" as const, label: "Task Updates", desc: "When tasks are created or completed" },
            { key: "projects" as const, label: "Project Updates", desc: "When projects are created or modified" },
            { key: "members" as const, label: "Team Activity", desc: "When members join or leave" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={v => setNotifications(p => ({ ...p, [item.key]: v }))}
                data-testid={`switch-notification-${item.key}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield size={16} />
            Security
          </CardTitle>
          <CardDescription>Keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Current Password</Label>
            <Input type="password" className="mt-1" placeholder="••••••••" data-testid="input-current-password" />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" className="mt-1" placeholder="••••••••" data-testid="input-new-password" />
          </div>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Password updated" })} data-testid="button-change-password">
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
