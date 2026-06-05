import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  Github,
  Sparkles,
  User,
  BookOpen,
  RefreshCcw,
  LayoutDashboard,
} from "lucide-react";
import { SiX, SiTelegram } from "react-icons/si";

type Tab = "about" | "blog";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const logo = new Image();
    logo.src = "/gembel-logo.webp";
    const done = () => window.setTimeout(() => setLoaded(true), 350);
    if (logo.complete) done();
    else logo.onload = done;
    const fallback = window.setTimeout(() => setLoaded(true), 1600);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <div className="sky-page">
      <div className={`smooth-loader ${loaded ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loader-orb">
          <div className="loader-dot" />
        </div>
      </div>

      <div className="sky-overlay" aria-hidden="true" />

      <main className="hero">
        <div className="badge fade-up">
          <Sparkles size={12} />
          <span>Available for new projects</span>
        </div>

        <div className="hero-avatar-wrap">
          <img src="/gembel-logo.webp" alt="Ouwibo logo" className="hero-avatar" />
        </div>

        <h1 className="title fade-up delay-1">
          Hi, I'm <span>Ouwibo</span>
        </h1>

        <p className="subtitle fade-up delay-2">
          Building AI agents, web apps, and crypto tools — one prompt at a time.
        </p>

        {/* Social icon pills */}
        <div className="social-row fade-up delay-3">
          <a href="https://github.com/ouwibo" target="_blank" rel="noreferrer" className="social-pill">
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a href="https://twitter.com/ouwibo" target="_blank" rel="noreferrer" className="social-pill">
            <SiX size={14} />
            <span>Twitter</span>
          </a>
          <a href="https://t.me/ouwibo" target="_blank" rel="noreferrer" className="social-pill">
            <SiTelegram size={15} />
            <span>Telegram</span>
          </a>
        </div>

        {/* Dashboard CTA */}
        <Link href="/dashboard" className="cta-btn fade-up delay-4">
          <LayoutDashboard size={16} />
          Open Dashboard
          <ArrowUpRight size={15} className="cta-arrow" />
        </Link>
      </main>

      <section className="panel-wrap">
        <div className="panel fade-up delay-5">
          <div className="panel-tabs">
            <div className="tab-list">
              <button
                onClick={() => setActiveTab("about")}
                className={activeTab === "about" ? "active" : ""}
              >
                <User size={14} /> About
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={activeTab === "blog" ? "active" : ""}
              >
                <BookOpen size={14} /> Blog
              </button>
            </div>
            <button
              className="refresh-btn"
              aria-label="Refresh"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw size={14} />
            </button>
          </div>

          {activeTab === "about" && (
            <div className="panel-content">
              <p>
                I'm a solo builder based in Jakarta. I ship small, focused tools
                around AI agents, crypto, and self-hosted infrastructure.
              </p>
              <p>
                Currently experimenting with multi-agent orchestration,
                real-time data pipelines, and personal cloud setups. No
                framework lock-in, no platform branding — just building things
                that work.
              </p>
              <p className="muted">
                Find me on{" "}
                <a href="https://github.com/ouwibo" target="_blank" rel="noreferrer">GitHub</a>,{" "}
                <a href="https://twitter.com/ouwibo" target="_blank" rel="noreferrer">Twitter</a>, or{" "}
                <a href="https://t.me/ouwibo" target="_blank" rel="noreferrer">Telegram</a>.
              </p>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="panel-content panel-empty">
              No posts yet.
              <br />
              <span>Notes on building, agents, and tooling — coming soon.</span>
            </div>
          )}
        </div>
      </section>

      <footer className="credit">Built by Ouwibo</footer>
    </div>
  );
}
