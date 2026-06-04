import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";

const PROFILE = {
  name: "Ouwibo Cloud",
  handle: "@ouwibo",
  website: "https://ouwibo.bond",
  email: "hello@ouwibo.bond",
  description:
    "Professional workspace for tracking crypto airdrops, Web3 tasks, claim windows, and campaign signals for Indonesian airdrop hunters.",
};

const SOCIAL_LINKS: Array<{
  label: string;
  value: string;
  href: string;
  Icon: LucideIcon;
  accent: string;
}> = [
  {
    label: "X / Twitter",
    value: "@ouwibo",
    href: "https://x.com/ouwibo",
    Icon: Twitter,
    accent: "from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/25",
  },
  {
    label: "Telegram",
    value: "t.me/ouwibo",
    href: "https://t.me/ouwibo",
    Icon: MessageCircle,
    accent: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/25",
  },
  {
    label: "YouTube",
    value: "youtube.com/@ouwibo",
    href: "https://youtube.com/@ouwibo",
    Icon: Youtube,
    accent: "from-red-500/20 to-rose-500/10 text-red-400 border-red-500/25",
  },
  {
    label: "Instagram",
    value: "instagram.com/ouwibo",
    href: "https://instagram.com/ouwibo",
    Icon: Instagram,
    accent:
      "from-pink-500/20 to-fuchsia-500/10 text-pink-400 border-pink-500/25",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/company/ouwibo",
    href: "https://linkedin.com/company/ouwibo",
    Icon: Linkedin,
    accent:
      "from-blue-600/20 to-indigo-500/10 text-blue-400 border-blue-500/25",
  },
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    Icon: Mail,
    accent:
      "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/25",
  },
];

const HIGHLIGHTS = [
  {
    title: "Airdrop Tracker",
    desc: "List peluang confirmed dan potential, lengkap dengan task, chain, difficulty, dan estimasi reward.",
    Icon: Zap,
  },
  {
    title: "Campaign Intelligence",
    desc: "Ringkasan campaign, task, chain, difficulty, dan reward signals agar riset lebih rapi.",
    Icon: Sparkles,
  },
  {
    title: "Safer Research",
    desc: "Setiap link dibuat mudah dicek agar pengguna bisa verifikasi project sebelum connect wallet.",
    Icon: ShieldCheck,
  },
];

function SocialCard({
  label,
  value,
  href,
  Icon,
  accent,
}: (typeof SOCIAL_LINKS)[number]) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className={`group flex min-w-0 items-center gap-3 rounded-2xl border bg-gradient-to-br ${accent} p-4 transition-[transform,filter] hover:-translate-y-1 hover:brightness-110`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-current/20 bg-background/50 shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="block truncate text-[13px] font-bold text-foreground">
          {value}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function SettingsPage() {
  return (
    <div className="premium-page space-y-5 pb-8">
      <section className="premium-panel relative overflow-hidden rounded-3xl border p-5 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
              <Globe className="h-3.5 w-3.5" /> About Ouwibo
            </div>
            <h1 className="premium-heading max-w-3xl text-[30px] font-black leading-tight sm:text-[42px]">
              {PROFILE.name} — professional crypto airdrop tracker.
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-muted-foreground">
              {PROFILE.description} Follow akun resmi di bawah untuk update,
              pengumuman campaign, update fitur, dan kontak kolaborasi.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={PROFILE.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[12px] font-black text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5"
              >
                Visit Website <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com/ouwibo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-2 text-[12px] font-black transition-colors hover:bg-muted"
              >
                Follow {PROFILE.handle}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/70 p-4 shadow-xl shadow-background/20 backdrop-blur">
            <div className="flex items-center gap-3 border-b border-border/50 pb-4">
              <img
                src="/site-logo.svg"
                alt="Ouwibo mascot logo"
                className="h-14 w-14 rounded-3xl border border-border object-cover"
                width={56}
                height={56}
              />
              <div>
                <p className="text-[15px] font-black">{PROFILE.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  {PROFILE.handle} · Official links
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              {HIGHLIGHTS.map(({ title, desc, Icon }) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-2xl bg-muted/45 p-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12px] font-black">{title}</p>
                    <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SOCIAL_LINKS.map((item) => (
          <SocialCard key={item.label} {...item} />
        ))}
      </section>

      <section className="premium-card rounded-3xl border p-5 sm:p-6">
        <h2 className="text-[16px] font-black">Catatan</h2>
        <p className="mt-2 max-w-4xl text-[13px] leading-7 text-muted-foreground">
          Data social di halaman ini sudah diisi sebagai profil publik Ouwibo.
          Jika nanti handle resmi berubah, cukup update daftar social link di
          halaman About ini agar seluruh card mengikuti mode siang/malam tanpa
          warna pastel hardcoded.
        </p>
      </section>
    </div>
  );
}
