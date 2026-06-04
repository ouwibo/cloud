import { Link } from "wouter";
import { AirdropLogo } from "@/components/AirdropLogo";
import { mockAirdrops } from "@/lib/mockData";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const featuredAirdrops = mockAirdrops.slice(0, 8);

  return (
    <div className="premium-page space-y-8">
      <ScrollReveal>
        <section className="premium-panel overflow-hidden rounded-3xl border p-6 sm:p-8">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Professional workspace
            </div>
            <h1 className="premium-heading text-[30px] font-black leading-[1.05] sm:text-5xl">
              Curated airdrop tracking without noisy feeds.
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-muted-foreground">
              Compare campaign status, task cost, time estimate, chain, and
              claim readiness in one smooth cloud-style dashboard.
            </p>
            <Link href="/airdrops" className="mt-6 inline-flex">
              <button className="rounded-2xl border border-blue-600/10 bg-gradient-to-b from-sky-400 to-primary px-5 py-3 text-[13px] font-black text-primary-foreground shadow-[0_10px_22px_hsl(var(--primary)/0.20)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_hsl(var(--primary)/0.24)]">
                Explore Airdrops →
              </button>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <h2 className="text-[15px] font-bold text-foreground">
              Featured Airdrops
            </h2>
          </div>
          <Link
            href="/airdrops"
            className="flex items-center gap-1 text-[12px] font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {featuredAirdrops.map((drop, index) => (
            <ScrollReveal key={drop.id} delay={index * 55}>
              <Link
                href={`/airdrops/${drop.slug}`}
                className="premium-card premium-card-hover flex h-full items-center gap-3 rounded-2xl border p-4"
              >
                <AirdropLogo
                  name={drop.name}
                  logoUrl={drop.logoUrl}
                  logoInitial={drop.logoInitial}
                  logoColor={drop.logoColor}
                  size={36}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-foreground">
                    {drop.name}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {drop.rewardType} · {drop.chain ?? "Crypto"}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
