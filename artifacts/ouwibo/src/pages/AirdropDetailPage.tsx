import { useParams, Link } from "wouter";
import { ArrowLeft, CheckCircle, Globe, Twitter, Send, Plus, Trash2, ExternalLink, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockAirdrops, mockTasks } from "@/lib/mockData";


const PASTEL = { sky: "#b8d8f0", mint: "#b8e8c8", peach: "#f0c4a8", lavender: "#d4c0f0", yellow: "#f0e0a0", sage: "#c8dcc0" };
const STATUS_STYLE: Record<string, { bg: string; label: string }> = {
  active:    { bg: PASTEL.mint,     label: "Active"    },
  upcoming:  { bg: PASTEL.yellow,   label: "Upcoming"  },
  ended:     { bg: PASTEL.sage,     label: "Ended"     },
  potential: { bg: PASTEL.lavender, label: "Potential" },
};
const DIFF_STYLE: Record<string, string> = { easy: PASTEL.mint, medium: PASTEL.yellow, hard: PASTEL.peach };

export default function AirdropDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id, 10);
  const { toast } = useToast();
  
  const [tasks, setTasks] = useState(mockTasks.filter(t => t.airdropId === id));
  
  const airdrop = mockAirdrops.find(a => a.id === id);

  if (!airdrop) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Zap size={32} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">Airdrop not found</h2>
        <p className="text-muted-foreground mb-4" style={{ fontSize: "0.75rem" }}>
          This airdrop doesn't exist or has been removed.
        </p>
        <Link href="/airdrops">
          <button className="px-4 py-2 rounded-xl bg-primary text-white">
            ← Back to Airdrops
          </button>
        </Link>
      </div>
    );
  }

  const st = STATUS_STYLE[airdrop.status] ?? { bg: PASTEL.sage, label: airdrop.status };
  const diff = DIFF_STYLE[airdrop.difficulty] ?? PASTEL.sage;

  function toggleTask(taskId: number) {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
    toast({ title: "Task updated!" });
  }

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/airdrops">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.75rem" }}>
          <ArrowLeft size={16} /> Back to Airdrops
        </button>
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
          style={{ backgroundColor: airdrop.logoColor, fontSize: "1.5rem", border: "3px solid hsl(var(--border))", boxShadow: "4px 4px 0 hsl(var(--border))" }}
        >
          {airdrop.logoInitial}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{airdrop.name}</h1>
            {airdrop.isVerified && <CheckCircle size={20} className="text-primary" />}
            {airdrop.isFeatured && <Star size={18} className="text-yellow-500 fill-yellow-500" />}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full font-bold" style={{ backgroundColor: st.bg, fontSize: "0.7rem" }}>
              {st.label}
            </span>
            <span className="px-3 py-1 rounded-full border-2 border-border font-bold" style={{ backgroundColor: diff, fontSize: "0.7rem" }}>
              {airdrop.difficulty}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
              {airdrop.chain} · {airdrop.category}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {airdrop.description && (
        <p className="text-foreground/80 leading-relaxed" style={{ fontSize: "0.78rem" }}>
          {airdrop.description}
        </p>
      )}

      {/* Reward & Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neo-card p-5" style={{ backgroundColor: PASTEL.sky }}>
          <p className="text-muted-foreground mb-2" style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>Estimated Reward</p>
          <p className="text-primary font-bold" style={{ fontSize: "1.5rem" }}>{airdrop.rewardEstimate || "TBD"}</p>
        </div>
        <div className="neo-card p-5" style={{ backgroundColor: PASTEL.mint }}>
          <p className="text-muted-foreground mb-2" style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>Participants</p>
          <p className="font-bold" style={{ fontSize: "1.5rem" }}>{(airdrop.participantsCount / 1000).toFixed(0)}K+</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-3 flex-wrap">
        <a
          href={airdrop.referralUrl || airdrop.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
          style={{ fontSize: "0.85rem", boxShadow: "3px 3px 0 hsl(var(--border))" }}
        >
          <Zap size={16} /> Join Airdrop
        </a>
        {airdrop.websiteUrl && (
          <a href={airdrop.websiteUrl} target="_blank" rel="noopener noreferrer" className="neo-button px-4 py-2 rounded-xl flex items-center gap-2 bg-background border-2 border-border" style={{ boxShadow: "3px 3px 0 hsl(var(--border))", fontSize: "0.72rem" }}>
            <Globe size={14} /> Website
          </a>
        )}
        {airdrop.twitterUrl && (
          <a href={airdrop.twitterUrl} target="_blank" rel="noopener noreferrer" className="neo-button px-4 py-2 rounded-xl flex items-center gap-2 bg-background border-2 border-border" style={{ boxShadow: "3px 3px 0 hsl(var(--border))", fontSize: "0.72rem" }}>
            <Twitter size={14} /> Twitter
          </a>
        )}
        {airdrop.telegramUrl && (
          <a href={airdrop.telegramUrl} target="_blank" rel="noopener noreferrer" className="neo-button px-4 py-2 rounded-xl flex items-center gap-2 bg-background border-2 border-border" style={{ boxShadow: "3px 3px 0 hsl(var(--border))", fontSize: "0.72rem" }}>
            <Send size={14} /> Telegram
          </a>
        )}
      </div>

      {/* Tasks */}
      <div className="neo-card p-5">
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontSize: "0.95rem", fontWeight: 700 }}>Tasks Checklist</p>
          <span className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>
            {completedCount}/{tasks.length} completed
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full mb-4 overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

        {tasks.length > 0 ? (
          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border-2 border-border transition-all cursor-pointer hover:border-primary/50",
                  task.isCompleted && "bg-primary/10"
                )}
                onClick={() => toggleTask(task.id)}
                style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                  task.isCompleted ? "bg-primary border-primary" : "border-border"
                )}>
                  {task.isCompleted && <CheckCircle size={14} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium", task.isCompleted && "line-through text-muted-foreground")} style={{ fontSize: "0.78rem" }}>
                    {task.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>{task.type}</p>
                </div>
                {task.url && (
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Go →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8" style={{ fontSize: "0.75rem" }}>
            No tasks available for this airdrop yet.
          </p>
        )}
      </div>
    </div>
  );
}
