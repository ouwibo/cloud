import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, projectsTable, tasksTable, membersTable, activityTable } from "@workspace/db";
import {
  GetAnalyticsSummaryResponse,
  GetProgressDataResponse,
  GetTaskBreakdownResponse,
  ListActivityResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/analytics/summary", async (req, res): Promise<void> => {
  const projects = await db.select().from(projectsTable);
  const tasks = await db.select().from(tasksTable);
  const members = await db.select().from(membersTable);

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "active").length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "done").length;
  const teamSize = members.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  res.json(GetAnalyticsSummaryResponse.parse({
    totalProjects,
    activeProjects,
    completedTasks,
    totalTasks,
    teamSize,
    completionRate,
  }));
});

router.get("/analytics/progress", async (req, res): Promise<void> => {
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = weeks.map((week, i) => ({
    week,
    completed: Math.floor(Math.random() * 8) + 2,
    created: Math.floor(Math.random() * 10) + 3,
  }));

  res.json(GetProgressDataResponse.parse(data));
});

router.get("/analytics/task-breakdown", async (req, res): Promise<void> => {
  const tasks = await db.select().from(tasksTable);

  const todo = tasks.filter(t => t.status === "todo").length;
  const inProgress = tasks.filter(t => t.status === "in_progress").length;
  const done = tasks.filter(t => t.status === "done").length;

  res.json(GetTaskBreakdownResponse.parse({ todo, inProgress, done }));
});

router.get("/activity", async (req, res): Promise<void> => {
  const items = await db.select().from(activityTable).orderBy(sql`${activityTable.createdAt} desc`).limit(20);
  res.json(ListActivityResponse.parse(items.map(a => ({
    ...a,
    actorName: a.actorName ?? null,
    createdAt: a.createdAt.toISOString(),
  }))));
});

export default router;
