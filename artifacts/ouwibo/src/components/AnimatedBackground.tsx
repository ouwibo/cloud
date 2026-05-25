import { useTheme } from "@/components/ThemeProvider";
import type { AccentColor } from "@/components/ThemeProvider";

const ORB: Record<AccentColor, [string, string]> = {
  orange: ["#7c2d12", "#c2410c"],
  blue:   ["#1e3a8a", "#1d4ed8"],
  purple: ["#4c1d95", "#6d28d9"],
  green:  ["#064e3b", "#047857"],
  cyan:   ["#0c4a6e", "#0369a1"],
  rose:   ["#881337", "#9f1239"],
  gold:   ["#713f12", "#92400e"],
};

export default function AnimatedBackground() {
  const { accent, isDark } = useTheme();
  if (!isDark) return null;

  const [c1, c2] = ORB[accent];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden><div className="absolute orb-1" style={{
        width: "52vw", height: "52vw", top: "-18vw", left: "-14vw",
        borderRadius: "50%", background: c1, filter: "blur(100px)", opacity: 0.12,
      }} /><div className="absolute orb-2" style={{
        width: "44vw", height: "44vw", bottom: "-14vw", right: "-10vw",
        borderRadius: "50%", background: c2, filter: "blur(90px)", opacity: 0.10,
      }} /><div className="absolute orb-3" style={{
        width: "24vw", height: "24vw", top: "42%", left: "44%",
        borderRadius: "50%", background: c1, filter: "blur(70px)", opacity: 0.06,
      }} /></div>
  );
}
