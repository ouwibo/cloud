import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, tasksTable, activityTable } from "@workspace/db";
import {
  CreateTaskBody,
  UpdateTaskParams,
  UpdateTaskBody,
  UpdateTaskResponse,
  DeleteTaskParams,
  ListTasksResponse,
  ListTasksQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/tasks", async (req, res): Promise<void> => {
  const queryParsed = ListTasksQueryParams.safeParse(req.query);
  if (!queryParsed.success) {
    res.status(400).json({ error: queryParsed.error.message });
    return;
  }

  const { projectId, status } = queryParsed.data;

  const conditions = [];
  if (projectId != null) conditions.push(eq(tasksTable.projectId, projectId));
  if (status != null) conditions.push(eq(tasksTable.status, status));

  const tasks = conditions.length > 0
    ? await db.select().from(tasksTable).where(and(...conditions)).orderBy(tasksTable.createdAt)
    : await db.select().from(tasksTable).orderBy(tasksTable.createdAt);

  res.json(ListTasksResponse.parse(tasks.map(t => ({
    ...t,
    description: t.description ?? null,
    projectId: t.projectId ?? null,
    assigneeId: t.assigneeId ?? null,
    dueDate: t.dueDate ?? null,
    createdAt: t.createdAt.toISOString(),
  }))));
});

router.post("/tasks", async (req, res): Promise<void> => {
  const parsed = CreateTaskBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid task body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [task] = await db.insert(tasksTable).values({
    title: parsed.data.title,
    description: parsed.data.description,
    status: parsed.data.status,
    priority: parsed.data.priority,
    projectId: parsed.data.projectId,
    assigneeId: parsed.data.assigneeId,
    dueDate: parsed.data.dueDate,
  }).returning();

  await db.insert(activityTable).values({
    type: "task_created",
    message: `Task "${task.title}" was created`,
    actorName: null,
  });

  res.status(201).json(UpdateTaskResponse.parse({
    ...task,
    description: task.description ?? null,
    projectId: task.projectId ?? null,
    assigneeId: task.assigneeId ?? null,
    dueDate: task.dueDate ?? null,
    createdAt: task.createdAt.toISOString(),
  }));
});

router.patch("/tasks/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateTaskParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateTaskBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [task] = await db.update(tasksTable)
    .set(parsed.data)
    .where(eq(tasksTable.id, params.data.id))
    .returning();

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  if (parsed.data.status === "done") {
    await db.insert(activityTable).values({
      type: "task_completed",
      message: `Task "${task.title}" was completed`,
      actorName: null,
    });
  }

  res.json(UpdateTaskResponse.parse({
    ...task,
    description: task.description ?? null,
    projectId: task.projectId ?? null,
    assigneeId: task.assigneeId ?? null,
    dueDate: task.dueDate ?? null,
    createdAt: task.createdAt.toISOString(),
  }));
});

router.delete("/tasks/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteTaskParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [task] = await db.delete(tasksTable).where(eq(tasksTable.id, params.data.id)).returning();
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
