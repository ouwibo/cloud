import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AirdropLogo({
  name,
  logoUrl,
  logoInitial,
  logoColor,
  size = 40,
  className,
}: {
  name: string;
  logoUrl?: string;
  logoInitial: string;
  logoColor: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [logoUrl, name]);

  const px = `${size}px`;

  return (
    <div
      title={name}
      aria-label={name}
      className={cn(
        "relative flex items-center justify-center overflow-hidden shrink-0 rounded-full border border-white/80 text-white font-black shadow-[0_8px_18px_hsl(211_54%_34%/0.14)] ring-1 ring-sky-200/45 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.46),transparent_34%)] before:opacity-80",
        className,
      )}
      style={{
        width: px,
        height: px,
        background: logoColor,
        fontSize: Math.max(10, size * 0.34),
      }}
    >
      {logoUrl && !failed ? (
        <img
          src={logoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="relative z-10 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="relative z-10 select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
          {logoInitial}
        </span>
      )}
    </div>
  );
}
