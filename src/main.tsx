import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Github,
  Mail,
  Sparkles,
  User,
  BookOpen,
  RefreshCcw,
  Wrench,
} from "lucide-react";
import "./styles.css";

const heroActions = [
  { label: "See my work", icon: Wrench, primary: true, tab: "about" as const },
  { label: "Read the blog", icon: BookOpen, tab: "blog" as const },
  { label: "GitHub", icon: Github, href: "https://github.com/ouwibo" },
  { label: "Get in touch", icon: Mail, href: "mailto:ouwibo@outlook.com" },
] as const;

type Tab = "about" | "blog";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const logo = new Image();
    logo.src = "/gembel-logo.png";
    const done = () => window.setTimeout(() => setLoaded(true), 350);
    if (logo.complete) done();
    else logo.onload = done;
    const fallback = window.setTimeout(() => setLoaded(true), 1600);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <div className="page">
      <div className={`smooth-loader ${loaded ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loader-orb"><div className="loader-dot" /></div>
      </div>
      <div className="sky-overlay" aria-hidden="true" />

      <main className="hero">
        <div className="badge fade-up">
          <Sparkles size={12} />
          <span>Available for new projects</span>
        </div>

        <h1 className="title fade-up delay-1">
          Hi, I'm <span>Ouwibo</span>
        </h1>

        <div className="hero-avatar-wrap">
          <img src="/gembel-logo.png" alt="Ouwibo logo" className="hero-avatar" />
        </div>

        <p className="subtitle fade-up delay-2">
          Building AI agents, web apps, and crypto tools — one prompt at a time.
        </p>

        <div className="actions fade-up delay-3">
          {heroActions.map((a) => {
            const Icon = a.icon;
            const className = `action-card ${"primary" in a && a.primary ? "primary" : "glass"}`;
            const content = (
              <>
                <span><Icon size={15} />{a.label}</span>
                <ArrowUpRight size={14} className="action-arrow" />
              </>
            );
            if ("href" in a && a.href) {
              return <a key={a.label} href={a.href} target="_blank" rel="noreferrer" className={className}>{content}</a>;
            }
            return <button key={a.label} onClick={() => "tab" in a && setActiveTab(a.tab)} className={className}>{content}</button>;
          })}
        </div>
      </main>

      <section className="panel-wrap">
        <div className="panel fade-up delay-4">
          <div className="panel-tabs">
            <div className="tab-list">
              <button onClick={() => setActiveTab("about")} className={activeTab === "about" ? "active" : ""}>
                <User size={14} /> About
              </button>
              <button onClick={() => setActiveTab("blog")} className={activeTab === "blog" ? "active" : ""}>
                <BookOpen size={14} /> Blog
              </button>
            </div>
            <button className="refresh" aria-label="Refresh"><RefreshCcw size={14} /></button>
          </div>

          {activeTab === "about" && (
            <div className="panel-content about">
              <p>I'm a solo builder based in Jakarta. I ship small, focused tools around AI agents, crypto, and self-hosted infrastructure.</p>
              <p>Currently experimenting with multi-agent orchestration, real-time data pipelines, and personal cloud setups. This page is a clean standalone template — no framework lock-in, no platform branding, just a place to point people to.</p>
              <p className="muted">Reach out at <a href="mailto:ouwibo@outlook.com">ouwibo@outlook.com</a>.</p>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="panel-content empty">
              No posts yet.<br />
              <span>Notes on building, agents, and tooling — coming soon.</span>
            </div>
          )}
        </div>
      </section>

      <footer className="credit">Built by Ouwibo</footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
