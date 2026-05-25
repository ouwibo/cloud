/**
 * AdSlot — placeholder for Google AdSense
 * Replace children with real <ins class="adsbygoogle"> once AdSense is approved.
 * Publisher ID: ca-pub-XXXXXXXXXX (add to VITE_ADSENSE_PUBLISHER_ID)
 */
interface AdSlotProps {
  slot: "leaderboard" | "rectangle" | "responsive";
  className?: string;
}

const SIZES: Record<AdSlotProps["slot"], { w: number; h: number; label: string }> = {
  leaderboard: { w: 728, h: 90,  label: "728 × 90" },
  rectangle:   { w: 300, h: 250, label: "300 × 250" },
  responsive:  { w: 0,   h: 90,  label: "Responsive" },
};

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const { w, h, label } = SIZES[slot];
  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;

  /* Production: swap this div for real AdSense markup */
  if (publisherId) {
    /* Real AdSense — uncomment when approved:
    return (
      <div className={className}><ins className="adsbygoogle"
          style={{ display: "block", width: w || "100%", height: h }}
          data-ad-client={publisherId}
          data-ad-slot="AUTO"
          data-ad-format={slot === "responsive" ? "auto" : undefined}
        /></div>
    );
    */
  }

  /* Development / pre-approval placeholder */
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-border rounded-lg text-[11px] text-muted-foreground bg-muted/30 ${className}`}
      style={{ width: w || "100%", height: h, minHeight: h }}
    >
      Ad · {label}
    </div>
  );
}
