import { Link } from "wouter";
import Navbar from "../components/Navbar";
import { ArrowRight, Globe, Users, Award, Leaf } from "lucide-react";

const GOLD = "#B8860B";

const team = [
  { name: "Olivia Chen",    role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", bio: "15 years in product design and craft. Built OUWIBO to bridge artisan tradition and modern living." },
  { name: "Marcus Webb",   role: "Head of Sourcing",             img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "Travels the globe to find the world's finest makers. Every OUWIBO partner passes his 22-point quality check." },
  { name: "Ines Rossi",    role: "Brand & Marketing",           img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80", bio: "Former luxury brand director. She ensures OUWIBO speaks to the people who care about beautiful things." },
];

const milestones = [
  { year: "2021", event: "OUWIBO founded in London, first 6 products hand-made by founders." },
  { year: "2022", event: "Expanded to 3 artisan workshops across Japan, Portugal, and Kenya." },
  { year: "2023", event: "Reached 10,000 customers globally. Launched sustainable packaging program." },
  { year: "2024", event: "Opened pop-up stores in New York, Paris, and Singapore." },
  { year: "2025", event: "Named 'Best Independent Lifestyle Brand' by Kinfolk Magazine." },
  { year: "2026", event: "30+ artisan partners. 18,000+ subscribers. 60 countries served." },
];

const stats = [
  { Icon: Globe,  value: "60+",   label: "Countries" },
  { Icon: Users,  value: "18K+",  label: "Customers" },
  { Icon: Award,  value: "12",    label: "Awards" },
  { Icon: Leaf,   value: "100%",  label: "Sustainable" },
];

const glass = (op = 0.72) => ({
  background: `rgba(255,255,255,${op})`,
  backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 4px 32px rgba(0,50,120,0.07)",
  borderRadius: 20,
});

export default function About() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }}>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,rgba(180,220,250,0.08) 0%,rgba(220,235,255,0.28) 60%,rgba(245,250,255,0.55) 100%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: "60px 40px 0", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...glass(0.70), overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 480 }}>
            <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Our Story</div>
              <h1 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 22 }}>
                We believe objects should outlive trends.
              </h1>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 18 }}>
                OUWIBO was born from a simple frustration: everything we bought felt disposable. Designed to last a season, built to be discarded. We wanted more.
              </p>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
                So we set out to build a brand rooted in craft — working directly with independent artisan workshops who take pride in their materials, their methods, and the objects they make.
              </p>
            </div>
            <div style={{ overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=85"
                alt="OUWIBO workshop"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "32px 40px 0", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...glass(0.68), display: "grid", gridTemplateColumns: "repeat(4,1fr)", overflow: "hidden" }}>
            {stats.map(({ Icon, value, label }, i) => (
              <div key={label} style={{ padding: "32px 24px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.72)" : "none" }}>
                <div style={{ width: 44, height: 44, background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Icon size={18} color={GOLD} />
                </div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.04em" }}>{value}</div>
                <div style={{ fontSize: 12.5, color: "#888", fontWeight: 500, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: "48px 40px 0", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>Our Journey</div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>Five years of craft</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {milestones.map(({ year, event }) => (
              <div key={year} style={{ ...glass(0.70), padding: "24px 22px" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: GOLD, letterSpacing: "-0.03em", marginBottom: 10 }}>{year}</div>
                <div style={{ fontSize: 13.5, color: "#444", lineHeight: 1.7 }}>{event}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: "48px 40px 0", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>The People</div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>Meet the team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 20 }}>
            {team.map(({ name, role, img, bio }) => (
              <div key={name} style={{ ...glass(0.72), overflow: "hidden" }}>
                <img src={img} alt={name} style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "top", display: "block" }} />
                <div style={{ padding: "22px 24px" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a", marginBottom: 3 }}>{name}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{role}</div>
                  <div style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7 }}>{bio}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section style={{ padding: "48px 40px 0", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...glass(0.68), padding: "52px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>Sustainability</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.2 }}>Good for you. Better for the planet.</h2>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8, marginBottom: 14 }}>Every OUWIBO product is made using natural, renewable, or recycled materials. We offset 100% of our shipping carbon footprint and use plastic-free packaging exclusively.</p>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>Our Repair Program means if any product breaks, we fix it — for free, for life. Because the most sustainable product is one you never throw away.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Natural & renewable materials only", "100% plastic-free packaging", "Carbon-neutral global shipping", "Lifetime repair program", "30 artisan partners fairly compensated", "B-Corp certification in progress"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", background: "rgba(255,255,255,0.55)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.8)", fontSize: 13.5, color: "#333" }}>
                  <Leaf size={14} color="#059669" style={{ flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "48px 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...glass(0.68), padding: "48px", textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#1a1a1a", marginBottom: 12, letterSpacing: "-0.03em" }}>Ready to explore the collection?</h2>
            <p style={{ color: "#666", marginBottom: 28, fontSize: 15 }}>Every purchase supports an independent artisan workshop somewhere in the world.</p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 36px", background: `rgba(184,134,11,0.88)`, color: "white", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(184,134,11,0.25)" }}>
              Shop the Collection <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
