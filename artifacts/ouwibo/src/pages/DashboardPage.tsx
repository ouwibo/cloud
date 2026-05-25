import { useGetAnalyticsSummary, useGetProgressData, useGetTaskBreakdown, useListActivity } from "@workspace/api-client-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FolderKanban, CheckSquare, Users, TrendingUp, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  color,
}: {
  label: string;
  value: number | string;
  icon: typeof FolderKanban;
  sub?: string;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md" data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityBadge({ type }: { type: string }) {
  const map: Record<string, { color: string; label: string }> = {
    task_created: { color: "bg-blue-500/15 text-blue-600 dark:text-blue-400", label: "Created" },
    task_completed: { color: "bg-green-500/15 text-green-600 dark:text-green-400", label: "Completed" },
    project_created: { color: "bg-purple-500/15 text-purple-600 dark:text-purple-400", label: "New Project" },
    project_updated: { color: "bg-amber-500/15 text-amber-600 dark:text-amber-400", label: "Updated" },
    member_joined: { color: "bg-pink-500/15 text-pink-600 dark:text-pink-400", label: "Joined" },
  };
  const info = map[type] ?? { color: "bg-muted text-muted-foreground", label: type };
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", info.color)}>{info.label}</span>
  );
}

const PIE_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useGetAnalyticsSummary();
  const { data: progress, isLoading: progressLoading } = useGetProgressData();
  const { data: breakdown, isLoading: breakdownLoading } = useGetTaskBreakdown();
  const { data: activity, isLoading: activityLoading } = useListActivity();

  const pieData = breakdown
    ? [
        { name: "To Do", value: breakdown.todo },
        { name: "In Progress", value: breakdown.inProgress },
        { name: "Done", value: breakdown.done },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Welcome back. Here is what is happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><Skeleton className="h-20 w-full" /></CardContent></Card>
          ))
        ) : summary ? (
          <>
            <StatCard label="Total Projects" value={summary.totalProjects} icon={FolderKanban} sub={`${summary.activeProjects} active`} color="bg-primary/10 text-primary" />
            <StatCard label="Completed Tasks" value={summary.completedTasks} icon={CheckSquare} sub={`of ${summary.totalTasks} total`} color="bg-green-500/10 text-green-600" />
            <StatCard label="Team Members" value={summary.teamSize} icon={Users} sub="on this workspace" color="bg-blue-500/10 text-blue-600" />
            <StatCard label="Completion Rate" value={`${summary.completionRate}%`} icon={TrendingUp} sub="tasks completed" color="bg-amber-500/10 text-amber-600" />
          </>
        ) : null}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {progressLoading ? (
              <Skeleton className="h-56 w-full" />
            ) : progress ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={progress} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="completed" stroke="hsl(var(--chart-1))" fill="url(#colorCompleted)" strokeWidth={2} name="Completed" />
                  <Area type="monotone" dataKey="created" stroke="hsl(var(--chart-2))" fill="url(#colorCreated)" strokeWidth={2} name="Created" />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Task Status</CardTitle>
          </CardHeader>
          <CardContent>
            {breakdownLoading ? (
              <Skeleton className="h-56 w-full" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full space-y-1.5">
                  {pieData.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity size={16} />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : activity && activity.length > 0 ? (
            <div className="space-y-0">
              {activity.slice(0, 8).map((item, idx) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-start gap-3 py-3",
                    idx < (activity.length - 1) && "border-b border-border/50"
                  )}
                  data-testid={`activity-item-${item.id}`}
                >
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={13} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <ActivityBadge type={item.type} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground text-sm">No activity yet</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
