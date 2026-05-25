import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, membersTable, activityTable } from "@workspace/db";
import {
  CreateMemberBody,
  UpdateMemberParams,
  UpdateMemberBody,
  UpdateMemberResponse,
  DeleteMemberParams,
  ListMembersResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/members", async (req, res): Promise<void> => {
  const members = await db.select().from(membersTable).orderBy(membersTable.createdAt);
  res.json(ListMembersResponse.parse(members.map(m => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }))));
});

router.post("/members", async (req, res): Promise<void> => {
  const parsed = CreateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid member body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [member] = await db.insert(membersTable).values({
    name: parsed.data.name,
    role: parsed.data.role,
    email: parsed.data.email,
    avatarColor: parsed.data.avatarColor ?? "#6366f1",
  }).returning();

  await db.insert(activityTable).values({
    type: "member_joined",
    message: `${member.name} joined the team`,
    actorName: member.name,
  });

  res.status(201).json(UpdateMemberResponse.parse({
    ...member,
    createdAt: member.createdAt.toISOString(),
  }));
});

router.patch("/members/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateMemberParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [member] = await db.update(membersTable)
    .set(parsed.data)
    .where(eq(membersTable.id, params.data.id))
    .returning();

  if (!member) {
    res.status(404).json({ error: "Member not found" });
    return;
  }

  res.json(UpdateMemberResponse.parse({
    ...member,
    createdAt: member.createdAt.toISOString(),
  }));
});

router.delete("/members/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteMemberParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [member] = await db.delete(membersTable).where(eq(membersTable.id, params.data.id)).returning();
  if (!member) {
    res.status(404).json({ error: "Member not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
