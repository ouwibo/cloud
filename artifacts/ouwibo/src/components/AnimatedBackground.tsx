import { useTheme } from "@/components/ThemeProvider";
import type { AppTheme } from "@/components/ThemeProvider";

const ORB_MAP: Record<AppTheme, [string, string, string]> = {
  midnight: ["#0f2157", "#1a4aad", "#312e81"],
  aurora:   ["#2e1065", "#5b21b6", "#3b0764"],
  forest:   ["#052e16", "#065f46", "#14532d"],
  ocean:    ["#082f49", "#075985", "#0c4a6e"],
  ember:    ["#431407", "#7c2d12", "#451a03"],
  rose:     ["#4c0519", "#881337", "#500724"],
  gold:     ["#422006", "#713f12", "#78350f"],
  light:    ["#c7b8a8", "#b8a090", "#d4c8bc"],
};

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const [c1, c2, c3] = ORB_MAP[theme];

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Orb 1 — top-left, slow float */}
      <div
        className="orb orb-1 absolute rounded-full"
        style={{
          width: "70vw",
          height: "70vw",
          top: "-25vw",
          left: "-20vw",
          background: c1,
          filter: "blur(140px)",
          opacity: theme === "light" ? 0.18 : 0.22,
        }}
      />

      {/* Orb 2 — bottom-right, medium float */}
      <div
        className="orb orb-2 absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          bottom: "-18vw",
          right: "-12vw",
          background: c2,
          filter: "blur(120px)",
          opacity: theme === "light" ? 0.14 : 0.18,
        }}
      />

      {/* Orb 3 — center-ish, fast float */}
      <div
        className="orb orb-3 absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          top: "38%",
          left: "35%",
          background: c3,
          filter: "blur(100px)",
          opacity: theme === "light" ? 0.10 : 0.12,
        }}
      />

      {/* Very subtle grid dots overlay — dark themes only */}
      {theme !== "light" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      )}
    </div>
  );
}
