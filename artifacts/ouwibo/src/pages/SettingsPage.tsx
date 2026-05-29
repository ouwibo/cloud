import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Globe, Youtube, Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react";

const PASTEL = ["#b8d8f0", "#f0c4a8", "#d4c0f0"];

function NeoSection({ title, bg, children, icon: Icon }: { title: string; bg: string; children: React.ReactNode; icon: typeof Palette }) {
  return (
    <div className="neo-card p-5" style={{ backgroundColor: bg }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-xl border-2 border-foreground/20 flex items-center justify-center bg-white/40">
          <Icon size={13} />
        </div>
        <p style={{ fontSize: "0.82rem", fontWeight: 700 }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function SocialInput({ label, placeholder, icon: Icon, value, onChange }: { label: string; placeholder: string; icon: typeof Globe; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>{label}</Label>
      <div className="mt-1 flex items-center gap-2 rounded-[12px] border-2 border-[hsl(var(--border))] bg-white/50 px-3 py-2">
        <Icon size={14} className="text-muted-foreground shrink-0" />
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          style={{ borderRadius: 0 }}
        />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("Ouwibo");
  const [siteDesc, setSiteDesc] = useState("Crypto airdrop tracker & news");
  const [website, setWebsite] = useState("https://ouwibo.bond");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [telegram, setTelegram] = useState("");

  return (
    <div>
      <div className="mb-8">
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>About / Info</h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.7rem" }}>Public website info and social links.</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        <NeoSection title="Website Identity" bg={PASTEL[0]} icon={Palette}>
          <div className="space-y-3">
            <div>
              <Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Site Name</Label>
              <Input className="mt-1" value={siteName} onChange={e => setSiteName(e.target.value)} style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }} data-testid="input-site-name" />
            </div>
            <div>
              <Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Site Description</Label>
              <Input className="mt-1" value={siteDesc} onChange={e => setSiteDesc(e.target.value)} style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.5)" }} data-testid="input-site-desc" />
            </div>
            <div>
              <Label style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Website URL</Label>
              <div className="mt-1 flex items-center gap-2 rounded-[12px] border-2 border-[hsl(var(--border))] bg-white/50 px-3 py-2">
                <Globe size={14} className="text-muted-foreground shrink-0" />
                <Input
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://your-site.com"
                  className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        </NeoSection>

        <NeoSection title="Social Links" bg={PASTEL[1]} icon={MessageCircle}>
          <div className="grid gap-3">
            <SocialInput label="X / Twitter" placeholder="@yourhandle or https://x.com/yourhandle" icon={Twitter} value={twitter} onChange={setTwitter} />
            <SocialInput label="YouTube" placeholder="https://youtube.com/@yourchannel" icon={Youtube} value={youtube} onChange={setYoutube} />
            <SocialInput label="Instagram" placeholder="https://instagram.com/yourname" icon={Instagram} value={instagram} onChange={setInstagram} />
            <SocialInput label="LinkedIn" placeholder="https://linkedin.com/in/yourname" icon={Linkedin} value={linkedin} onChange={setLinkedin} />
            <SocialInput label="Telegram" placeholder="https://t.me/yourchannel" icon={MessageCircle} value={telegram} onChange={setTelegram} />
          </div>
        </NeoSection>

        <NeoSection title="How this page is used" bg={PASTEL[2]} icon={Globe}>
          <p className="text-foreground/75" style={{ fontSize: "0.68rem", lineHeight: 1.6 }}>
            This page is now an About / Info page for the public site. Use it to show what Ouwibo is, where people can follow you, and where visitors should go next.
          </p>
        </NeoSection>
      </div>
    </div>
  );
}
