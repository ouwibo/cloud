import { useGetAnalyticsSummary, getGetAnalyticsSummaryQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: analytics, isLoading } = useGetAnalyticsSummary({
    query: {
      queryKey: getGetAnalyticsSummaryQueryKey()
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening across your projects today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Projects" value={analytics?.totalProjects} loading={isLoading} />
        <MetricCard title="Active Projects" value={analytics?.activeProjects} loading={isLoading} />
        <MetricCard title="Tasks Completed" value={analytics?.completedTasks} loading={isLoading} />
        <MetricCard title="Completion Rate" value={analytics?.completionRate ? `${analytics.completionRate}%` : undefined} loading={isLoading} />
      </div>
    </motion.div>
  );
}

function MetricCard({ title, value, loading }: { title: string; value?: number | string; loading: boolean }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-3xl font-bold">{value ?? "-"}</div>
        )}
      </CardContent>
    </Card>
  );
}
