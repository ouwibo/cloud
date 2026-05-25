import { useGetAnalyticsSummary, useGetProgressData, useGetTaskBreakdown, useListActivity } from "@workspace/api-client-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FolderKanban, CheckSquare, Users, TrendingUp, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* Pastel card backgrounds — neobrutalism style */
const PASTEL = {
  mint:     "#b8e8c8",
  peach:    "#f0c4a8",
  lavender: "#d4c0f0",
  sky:      "#b8d8f0",
  yellow:   "#f0e0a0",
  sage:     "#c8dcc0",
};

const STAT_CARDS = [
  { label: "Total Projects",  valueKey: "totalProjects",  subKey: "activeProjects",  subLabel: "active",        icon: FolderKanban, bg: PASTEL.sky },
  { label: "Tasks Completed", valueKey: "completedTasks", subKey: "totalTasks",      subLabel: "total",         icon: CheckSquare,  bg: PASTEL.mint },
  { label: "Team Members",    valueKey: "teamSize",       subKey: null,              subLabel: "on workspace",  icon: Users,        bg: PASTEL.peach },
  { label: "Completion Rate", valueKey: "completionRate", subKey: null,              subLabel: "tasks done",    icon: TrendingUp,   bg: PASTEL.lavender },
];

const PIE_COLORS = ["hsl(var(--chart-4))", "hsl(var(--chart-3))", "hsl(var(--chart-2))"];

const ACTIVITY_TYPE_BADGE: Record<string, { bg: string; label: string }> = {
  task_created:    { bg: PASTEL.sky,      label: "Created" },
  task_completed:  { bg: PASTEL.mint,     label: "Done" },
  project_created: { bg: PASTEL.lavender, label: "New Project" },
  project_updated: { bg: PASTEL.yellow,   label: "Updated" },
  member_joined:   { bg: PASTEL.peach,    label: "Joined" },
};

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1
        className="text-foreground mb-1"
        style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}
      >
        {title}
      </h1>
      <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem" }}>
        {subtitle}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useGetAnalyticsSummary();
  const { data: progress, isLoading: progressLoading } = useGetProgressData();
  const { data: breakdown, isLoading: breakdownLoading } = useGetTaskBreakdown();
  const { data: activity, isLoading: activityLoading } = useListActivity();

  const pieData = breakdown
    ? [
        { name: "To Do",       value: breakdown.todo },
        { name: "In Progress", value: breakdown.inProgress },
        { name: "Done",        value: breakdown.done },
      ]
    : [];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back — here is what is happening." />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((card, i) => {
          const value = summary ? (summary as Record<string, number | string>)[card.valueKey] : null;
          const sub   = summary && card.subKey ? (summary as Record<string, number>)[card.subKey] : null;
          return (
            <div
              key={card.label}
              className="neo-card p-5"
              style={{ backgroundColor: card.bg }}
              data-testid={`stat-card-${i}`}
            >
              {summaryLoading ? (
                <Skeleton className="h-20 w-full rounded-xl" />
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <p
                      className="text-foreground/70"
                      style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}
                    >
                      {card.label}
                    </p>
                    <div className="w-8 h-8 rounded-xl border-2 border-foreground/30 flex items-center justify-center bg-white/40">
                      <card.icon size={14} className="text-foreground/70" />
                    </div>
                  </div>
                  <p
                    className="text-foreground mb-1"
                    style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}
                  >
                    {card.valueKey === "completionRate" ? `${value}%` : value}
                  </p>
                  <p className="text-foreground/60" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}>
                    {sub != null ? `${sub} ${card.subLabel}` : card.subLabel}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Area chart */}
        <div className="neo-card p-5 lg:col-span-2">
          <p
            className="text-foreground mb-4"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}
          >
            Weekly Progress
          </p>
          {progressLoading ? (
            <Skeleton className="h-52 w-full rounded-xl" />
          ) : progress ? (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={progress} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="gCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "'Space Mono', monospace", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: "'Space Mono', monospace", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "2px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontFamily: "'Space Mono', monospace",
                    boxShadow: "3px 3px 0 hsl(var(--border))",
                  }}
                />
                <Area type="monotone" dataKey="completed" stroke="hsl(var(--primary))" fill="url(#gCompleted)" strokeWidth={2.5} name="Completed" />
                <Area type="monotone" dataKey="created"   stroke="hsl(var(--chart-3))"  fill="url(#gCreated)"   strokeWidth={2.5} name="Created"   />
              </AreaChart>
            </ResponsiveContainer>
          ) : null}
        </div>

        {/* Pie chart */}
        <div className="neo-card p-5">
          <p
            className="text-foreground mb-4"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}
          >
            Task Status
          </p>
          {breakdownLoading ? (
            <Skeleton className="h-52 w-full rounded-xl" />
          ) : (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={60} paddingAngle={4} dataKey="value" strokeWidth={0}>
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontFamily: "'Space Mono', monospace",
                      boxShadow: "3px 3px 0 hsl(var(--border))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-2 mt-2">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border border-foreground/20" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem" }}>
                        {item.name}
                      </span>
                    </div>
                    <span className="font-bold" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity feed */}
      <div className="neo-card p-5">
        <p
          className="text-foreground mb-4"
          style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}
        >
          Recent Activity
        </p>
        {activityLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full rounded-xl" />)}
          </div>
        ) : activity && activity.length > 0 ? (
          <div className="space-y-0">
            {activity.slice(0, 8).map((item, idx) => {
              const badge = ACTIVITY_TYPE_BADGE[item.type] ?? { bg: PASTEL.sage, label: item.type };
              return (
                <div
                  key={item.id}
                  className={cn("flex items-center gap-3 py-3", idx < 7 && "border-b border-border/40")}
                  data-testid={`activity-item-${item.id}`}
                >
                  <div
                    className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: badge.bg }}
                  >
                    <Clock size={11} className="text-foreground/60" />
                  </div>
                  <p className="flex-1 text-sm text-foreground/80">{item.message}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded-full border-2 border-foreground/20 text-foreground/70 shrink-0"
                      style={{ backgroundColor: badge.bg, fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", fontWeight: 700 }}
                    >
                      {badge.label}
                    </span>
                    <span className="text-muted-foreground shrink-0" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}>
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>
            No activity yet
          </div>
        )}
      </div>
    </div>
  );
}
