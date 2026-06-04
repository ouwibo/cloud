import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  hue: number;
};

function shouldAnimate() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const connection = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };
  const saveData = connection.connection?.saveData ?? false;
  const cores = navigator.hardwareConcurrency ?? 8;
  return !(reduce || mobile || saveData || cores <= 4);
}

export default function AnimatedBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldAnimate());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const primary =
        styles.getPropertyValue("--primary").trim() || "24 62% 44%";
      const foreground =
        styles.getPropertyValue("--foreground").trim() || "0 0% 9%";
      const dark = document.documentElement.classList.contains("dark");
      return {
        primary,
        foreground,
        point: `hsl(${primary} / ${dark ? 0.42 : 0.28})`,
        line: `hsl(${primary} / ${dark ? 0.18 : 0.1})`,
        lineStrong: `hsl(${primary} / ${dark ? 0.32 : 0.18})`,
        glow: `hsl(${foreground} / ${dark ? 0.12 : 0.06})`,
        bubbleAlpha: dark ? 0.36 : 0.24,
        lineAlpha: dark ? 0.2 : 0.12,
      };
    };

    let palette = readColors();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        const count = Math.min(
          30,
          Math.max(18, Math.round((width * height) / 48000)),
        );
        for (let i = 0; i < count; i += 1) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: 1.1 + Math.random() * 1.7,
            phase: Math.random() * Math.PI * 2,
            hue: 16 + Math.random() * 34,
          });
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = (time: number) => {
      palette = readColors();
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width * 0.5,
        0,
        0,
        width * 0.5,
        height * 0.35,
        Math.max(width, height),
      );
      gradient.addColorStop(0, palette.glow);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const influence = mouse.active && dist < 160 ? (160 - dist) / 160 : 0;
        if (influence > 0) {
          p.vx -= (dx / dist) * influence * 0.02;
          p.vy -= (dy / dist) * influence * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        p.vx *= 0.995;
        p.vy *= 0.995;

        const pulse = 0.55 + Math.sin(time / 1000 + p.phase) * 0.2;
        const hue = (p.hue + Math.sin(time / 1800 + p.phase) * 10) % 360;
        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue} 92% 66% / ${palette.bubbleAlpha})`;
        ctx.globalAlpha = pulse;
        ctx.arc(p.x, p.y, p.r * (0.9 + pulse * 0.22), 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 150;
          if (dist > maxDist) continue;
          const alpha = 1 - dist / maxDist;
          const hue = (a.hue + b.hue) / 2 + Math.sin(time / 2600) * 8;
          ctx.beginPath();
          ctx.strokeStyle = `hsl(${hue % 360} 90% 66% / ${palette.lineAlpha})`;
          ctx.globalAlpha = alpha * 0.9;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(tick);
    };

    resize();
    raf = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    const observer = new MutationObserver(() => {
      palette = readColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      observer.disconnect();
    };
  }, [enabled]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="animated-grid" />
      <div className="rainbow-bubble rainbow-bubble-a" />
      <div className="rainbow-bubble rainbow-bubble-b" />
      <div className="rainbow-bubble rainbow-bubble-c" />
      <div className="rainbow-bubble rainbow-bubble-d" />
      <div className="rainbow-bubble rainbow-bubble-e" />
      <div className="animated-orb animated-orb-a" />
      <div className="animated-orb animated-orb-b" />
      <div className="animated-mesh animated-mesh-a" />
      <div className="animated-mesh animated-mesh-b" />
      <div className="animated-mesh animated-mesh-c" />
      <div className="animated-vignette" />
      {enabled && (
        <canvas
          ref={canvasRef}
          className="animated-network absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
