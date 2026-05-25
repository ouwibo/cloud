import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, projectsTable, activityTable } from "@workspace/db";
import {
  CreateProjectBody,
  GetProjectParams,
  GetProjectResponse,
  UpdateProjectParams,
  UpdateProjectBody,
  UpdateProjectResponse,
  DeleteProjectParams,
  ListProjectsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const projects = await db.select().from(projectsTable).orderBy(projectsTable.createdAt);
  res.json(ListProjectsResponse.parse(projects.map(p => ({
    ...p,
    dueDate: p.dueDate ?? null,
    description: p.description ?? null,
    createdAt: p.createdAt.toISOString(),
  }))));
});

router.post("/projects", async (req, res): Promise<void> => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid project body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [project] = await db.insert(projectsTable).values({
    name: parsed.data.name,
    description: parsed.data.description,
    status: parsed.data.status,
    progress: parsed.data.progress ?? 0,
    color: parsed.data.color,
    dueDate: parsed.data.dueDate,
  }).returning();

  await db.insert(activityTable).values({
    type: "project_created",
    message: `Project "${project.name}" was created`,
    actorName: null,
  });

  res.status(201).json(GetProjectResponse.parse({
    ...project,
    dueDate: project.dueDate ?? null,
    description: project.description ?? null,
    createdAt: project.createdAt.toISOString(),
  }));
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, params.data.id));
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(GetProjectResponse.parse({
    ...project,
    dueDate: project.dueDate ?? null,
    description: project.description ?? null,
    createdAt: project.createdAt.toISOString(),
  }));
});

router.patch("/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [project] = await db.update(projectsTable)
    .set(parsed.data)
    .where(eq(projectsTable.id, params.data.id))
    .returning();

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  await db.insert(activityTable).values({
    type: "project_updated",
    message: `Project "${project.name}" was updated`,
    actorName: null,
  });

  res.json(UpdateProjectResponse.parse({
    ...project,
    dueDate: project.dueDate ?? null,
    description: project.description ?? null,
    createdAt: project.createdAt.toISOString(),
  }));
});

router.delete("/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db.delete(projectsTable).where(eq(projectsTable.id, params.data.id)).returning();
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
